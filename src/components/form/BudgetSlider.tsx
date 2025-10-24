"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface BudgetSliderProps {
    minValue?: number;
    maxValue?: number;
    onMinChange: (value: number | undefined) => void;
    onMaxChange: (value: number | undefined) => void;
    currency?: string;
    minLimit?: number;
    maxLimit?: number;
    step?: number;
}

export function BudgetSlider({
    minValue,
    maxValue,
    onMinChange,
    onMaxChange,
    currency = "€",
    minLimit = 0,
    maxLimit = 100000,
    step = 1000,
}: BudgetSliderProps) {
    const [localMin, setLocalMin] = useState(minValue?.toString() || "");
    const [localMax, setLocalMax] = useState(maxValue?.toString() || "");

    const handleMinChange = (value: string) => {
        setLocalMin(value);
        const num = parseFloat(value.replace(/[^\d]/g, ""));
        if (!isNaN(num)) {
            onMinChange(num);
        } else {
            onMinChange(undefined);
        }
    };

    const handleMaxChange = (value: string) => {
        setLocalMax(value);
        const num = parseFloat(value.replace(/[^\d]/g, ""));
        if (!isNaN(num)) {
            onMaxChange(num);
        } else {
            onMaxChange(undefined);
        }
    };

    const formatCurrency = (value: number | undefined) => {
        if (!value) return "";
        return new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0,
        }).format(value);
    };

    const hasError = minValue && maxValue && minValue > maxValue;

    return (
        <div className="space-y-6">
            {/* Visual Range Display */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/60">Budget estimé</span>
                    {minValue && maxValue && (
                        <span className="text-lg font-semibold text-white">
                            {formatCurrency(minValue)} - {formatCurrency(maxValue)}
                        </span>
                    )}
                </div>

                {/* Visual bar */}
                {minValue && maxValue && (
                    <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="absolute h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-300"
                            style={{
                                left: `${(minValue / maxLimit) * 100}%`,
                                width: `${((maxValue - minValue) / maxLimit) * 100}%`,
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Min Budget */}
                <div>
                    <label className="block text-white/80 text-sm font-medium mb-3">
                        Budget minimum
                    </label>
                    <div className="relative">
                        <Input
                            type="text"
                            value={localMin}
                            onChange={(e) => handleMinChange(e.target.value)}
                            placeholder="5 000"
                            className="h-14 bg-white/5 border-white/10 text-white text-lg placeholder:text-white/30 focus:border-orange-500 focus:ring-orange-500/20 pr-12"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
                            {currency}
                        </span>
                    </div>
                </div>

                {/* Max Budget */}
                <div>
                    <label className="block text-white/80 text-sm font-medium mb-3">
                        Budget maximum
                    </label>
                    <div className="relative">
                        <Input
                            type="text"
                            value={localMax}
                            onChange={(e) => handleMaxChange(e.target.value)}
                            placeholder="15 000"
                            className="h-14 bg-white/5 border-white/10 text-white text-lg placeholder:text-white/30 focus:border-orange-500 focus:ring-orange-500/20 pr-12"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
                            {currency}
                        </span>
                    </div>
                </div>
            </div>

            {/* Error */}
            {hasError && (
                <p className="text-sm text-red-400">
                    Le budget maximum doit être supérieur au budget minimum
                </p>
            )}

            {/* Quick presets */}
            <div className="flex flex-wrap gap-2">
                <span className="text-sm text-white/60">Presets rapides :</span>
                {[
                    { label: "5k-15k", min: 5000, max: 15000 },
                    { label: "15k-30k", min: 15000, max: 30000 },
                    { label: "30k-50k", min: 30000, max: 50000 },
                    { label: "50k+", min: 50000, max: 100000 },
                ].map((preset) => (
                    <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                            onMinChange(preset.min);
                            onMaxChange(preset.max);
                            setLocalMin(preset.min.toString());
                            setLocalMax(preset.max.toString());
                        }}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/50 rounded-lg text-sm text-white transition-all duration-200"
                    >
                        {preset.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

