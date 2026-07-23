"use client";

import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { parsePhoneNumber, isValidPhoneNumber, CountryCode } from "libphonenumber-js";

interface PhoneInputProps {
    id?: string;
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

export function PhoneInput({ id, value, onChange, placeholder, error, disabled }: PhoneInputProps) {
    const [selectedCountry, setSelectedCountry] = useState<CountryCode>("FR");
    const [showDropdown, setShowDropdown] = useState(false);

    const currentCountry = POPULAR_COUNTRIES.find(c => c.code === selectedCountry) || POPULAR_COUNTRIES[0];

    const handlePhoneChange = (rawValue: string) => {
        if (rawValue.startsWith("+")) {
            onChange(rawValue);
            try {
                const parsed = parsePhoneNumber(rawValue);
                if (parsed && parsed.country) {
                    setSelectedCountry(parsed.country);
                }
            } catch { }
            return;
        }

        const cleaned = rawValue.replace(/\D/g, "");
        onChange(cleaned.length > 0 ? `${currentCountry.dial}${cleaned}` : "");
    };

    const handleCountrySelect = (country: typeof POPULAR_COUNTRIES[0]) => {
        setSelectedCountry(country.code);
        setShowDropdown(false);
        if (value) {
            try {
                const parsed = parsePhoneNumber(value);
                if (parsed) {
                    onChange(`${country.dial}${parsed.nationalNumber}`);
                }
            } catch {
                // Si parsing échoue, garder la valeur
            }
        }
    };

    const displayValue = (() => {
        if (!value) return "";
        try {
            const parsed = parsePhoneNumber(value);
            if (parsed) return parsed.nationalNumber.toString();
        } catch { }
        if (value.startsWith(currentCountry.dial)) {
            return value.substring(currentCountry.dial.length);
        }
        return value;
    })();

    const isValid = value ? isValidPhoneNumber(value) : null;

    return (
        <div className="relative">
            <div className="flex items-end gap-4">
                {/* Country selector */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setShowDropdown(!showDropdown)}
                        disabled={disabled}
                        aria-expanded={showDropdown}
                        aria-haspopup="listbox"
                        className="flex items-center gap-2 border-b border-white/20 bg-transparent py-3 text-sm text-white/60 transition-colors hover:text-white focus:border-white/60 focus:outline-none"
                    >
                        <span aria-hidden>{currentCountry.flag}</span>
                        <span className="font-mono text-xs">{currentCountry.dial}</span>
                        <ChevronDown
                            className={`h-3.5 w-3.5 text-white/40 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}
                        />
                    </button>

                    {showDropdown && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setShowDropdown(false)}
                            />
                            <ul
                                role="listbox"
                                className="absolute left-0 top-full z-20 mt-2 max-h-64 w-64 overflow-y-auto border border-white/10 bg-black py-1"
                            >
                                {POPULAR_COUNTRIES.map((country) => (
                                    <li key={country.code} role="option" aria-selected={selectedCountry === country.code}>
                                        <button
                                            type="button"
                                            onClick={() => handleCountrySelect(country)}
                                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-white/5"
                                        >
                                            <span aria-hidden>{country.flag}</span>
                                            <span className="flex-1 text-sm text-white/70">{country.name}</span>
                                            <span className="font-mono text-xs text-white/30">{country.dial}</span>
                                            {selectedCountry === country.code && (
                                                <Check className="h-4 w-4 text-white/70" />
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>

                {/* Phone input */}
                <div className="relative flex-1">
                    <input
                        id={id}
                        type="tel"
                        autoComplete="tel-national"
                        value={displayValue}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder={placeholder || "6 12 34 56 78"}
                        disabled={disabled}
                        aria-invalid={isValid === false || Boolean(error)}
                        className="w-full border-0 border-b border-white/20 bg-transparent py-3 pr-7 text-sm text-white transition-colors placeholder:text-white/20 focus:border-white/60 focus:outline-none"
                    />
                    {value && (
                        <span
                            aria-hidden
                            className="absolute right-0 top-1/2 -translate-y-1/2"
                        >
                            {isValid ? (
                                <Check className="h-4 w-4 text-white/60" />
                            ) : (
                                <X className="h-4 w-4 text-red-400" />
                            )}
                        </span>
                    )}
                </div>
            </div>

            {error && (
                <p role="alert" className="mt-1 text-xs text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}
