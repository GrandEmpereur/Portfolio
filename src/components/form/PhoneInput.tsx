"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { parsePhoneNumber, isValidPhoneNumber, CountryCode } from "libphonenumber-js";

interface PhoneInputProps {
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
}

const POPULAR_COUNTRIES: { code: CountryCode; name: string; dial: string; flag: string }[] = [
    { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
    { code: "US", name: "États-Unis", dial: "+1", flag: "🇺🇸" },
    { code: "GB", name: "Royaume-Uni", dial: "+44", flag: "🇬🇧" },
    { code: "DE", name: "Allemagne", dial: "+49", flag: "🇩🇪" },
    { code: "ES", name: "Espagne", dial: "+34", flag: "🇪🇸" },
    { code: "IT", name: "Italie", dial: "+39", flag: "🇮🇹" },
    { code: "BE", name: "Belgique", dial: "+32", flag: "🇧🇪" },
    { code: "CH", name: "Suisse", dial: "+41", flag: "🇨🇭" },
    { code: "PL", name: "Pologne", dial: "+48", flag: "🇵🇱" },
    { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
];

export function PhoneInput({ value, onChange, placeholder, error, disabled }: PhoneInputProps) {
    const [selectedCountry, setSelectedCountry] = useState<CountryCode>("FR");
    const [showDropdown, setShowDropdown] = useState(false);

    const currentCountry = POPULAR_COUNTRIES.find(c => c.code === selectedCountry) || POPULAR_COUNTRIES[0];

    const handlePhoneChange = (rawValue: string) => {
        // Si l'utilisateur tape un +, on laisse faire
        if (rawValue.startsWith("+")) {
            onChange(rawValue);

            // Essayer de détecter le pays
            try {
                const parsed = parsePhoneNumber(rawValue);
                if (parsed && parsed.country) {
                    setSelectedCountry(parsed.country);
                }
            } catch { }

            return;
        }

        // Sinon, on préfixe avec l'indicatif du pays sélectionné
        const dialCode = currentCountry.dial;

        // Retirer tous les caractères non numériques
        const cleaned = rawValue.replace(/\D/g, "");

        if (cleaned.length > 0) {
            onChange(`${dialCode}${cleaned}`);
        } else {
            onChange("");
        }
    };

    const handleCountrySelect = (country: typeof POPULAR_COUNTRIES[0]) => {
        setSelectedCountry(country.code);
        setShowDropdown(false);

        // Si on a déjà un numéro, le reformater avec le nouveau code pays
        if (value) {
            try {
                const parsed = parsePhoneNumber(value);
                if (parsed) {
                    const nationalNumber = parsed.nationalNumber;
                    onChange(`${country.dial}${nationalNumber}`);
                }
            } catch {
                // Si parsing échoue, garder la valeur
            }
        }
    };

    // Formater l'affichage
    const displayValue = (() => {
        if (!value) return "";

        try {
            const parsed = parsePhoneNumber(value);
            if (parsed) {
                // Retirer l'indicatif pour l'affichage
                return parsed.nationalNumber.toString();
            }
        } catch { }

        // Fallback: retirer juste l'indicatif du pays sélectionné
        if (value.startsWith(currentCountry.dial)) {
            return value.substring(currentCountry.dial.length);
        }

        return value;
    })();

    // Validation visuelle
    const isValid = value ? isValidPhoneNumber(value) : null;

    return (
        <div className="relative">
            <div className="flex gap-2">
                {/* Country Selector */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setShowDropdown(!showDropdown)}
                        disabled={disabled}
                        className="h-14 px-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-colors"
                    >
                        <span className="text-2xl">{currentCountry.flag}</span>
                        <span className="text-white/60 text-sm">{currentCountry.dial}</span>
                        <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Dropdown */}
                    {showDropdown && (
                        <>
                            {/* Overlay pour fermer */}
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setShowDropdown(false)}
                            />

                            <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 border border-white/10 rounded-xl shadow-2xl z-20 max-h-64 overflow-y-auto">
                                {POPULAR_COUNTRIES.map((country) => (
                                    <button
                                        key={country.code}
                                        type="button"
                                        onClick={() => handleCountrySelect(country)}
                                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-left"
                                    >
                                        <span className="text-xl">{country.flag}</span>
                                        <div className="flex-1">
                                            <div className="text-white text-sm">{country.name}</div>
                                            <div className="text-white/40 text-xs">{country.dial}</div>
                                        </div>
                                        {selectedCountry === country.code && (
                                            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Phone Input */}
                <div className="flex-1 relative">
                    <Input
                        type="tel"
                        value={displayValue}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder={placeholder || "6 12 34 56 78"}
                        disabled={disabled}
                        className={`h-14 bg-white/5 border-white/10 text-white text-lg placeholder:text-white/30 focus:border-orange-500 focus:ring-orange-500/20 ${isValid === true ? "border-green-500/50" :
                            isValid === false ? "border-red-500/50" : ""
                            }`}
                    />

                    {/* Validation indicator */}
                    {value && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {isValid ? (
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Error message */}
            {error && (
                <p className="mt-2 text-sm text-red-400">{error}</p>
            )}

            {/* Helper text */}
            {!error && value && isValid && (
                <p className="mt-2 text-sm text-green-400">
                    ✓ Numéro valide : {value}
                </p>
            )}
        </div>
    );
}

