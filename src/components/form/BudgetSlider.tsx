"use client";

import { useState } from "react";

interface BudgetSliderLabels {
    estimated: string;
    min: string;
    max: string;
    presets: string;
}

interface BudgetSliderProps {
    minValue?: number;
    maxValue?: number;
    onMinChange: (value: number | undefined) => void;
    onMaxChange: (value: number | undefined) => void;
    labels: BudgetSliderLabels;
    currency?: string;
    maxLimit?: number;
}

const inputClassName =
    "w-full border-0 border-b border-white/20 bg-transparent py-3 pr-8 text-sm text-white transition-colors placeholder:text-white/20 focus:border-white/60 focus:outline-none";

const PRESETS = [
    { label: "5k – 15k", min: 5000, max: 15000 },
    { label: "15k – 30k", min: 15000, max: 30000 },
    { label: "30k – 50k", min: 30000, max: 50000 },
    { label: "50k+", min: 50000, max: 100000 },
];

export function BudgetSlider({
    minValue,
    maxValue,
    onMinChange,
    onMaxChange,
    labels,
    currency = "€",
    maxLimit = 100000,
}: BudgetSliderProps) {
    const [localMin, setLocalMin] = useState(minValue?.toString() || "");
    const [localMax, setLocalMax] = useState(maxValue?.toString() || "");

    const parseAmount = (value: string) => {
        const num = parseFloat(value.replace(/[^\d]/g, ""));
        return isNaN(num) ? undefined : num;
    };

    const formatCurrency = (value: number | undefined) => {
        if (!value) return "";
        return new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="space-y-8">
            {/* Range summary + bar */}
            <div>
                <div className="flex items-baseline justify-between gap-4">
                    <span className="text-xs font-light uppercase tracking-[0.2em] text-white/40">
                        {labels.estimated}
                    </span>
                    {minValue && maxValue ? (
                        <span className="font-mono text-sm text-white">
                            {formatCurrency(minValue)} – {formatCurrency(maxValue)}
                        </span>
                    ) : null}
                </div>
                <div
                    aria-hidden
                    className="relative mt-4 h-px w-full bg-white/10"
                >
                    {minValue && maxValue && maxValue >= minValue ? (
                        <div
                            className="absolute -top-px h-[3px] bg-white transition-all duration-300"
                            style={{
                                left: `${Math.min((minValue / maxLimit) * 100, 100)}%`,
                                width: `${Math.min(((maxValue - minValue) / maxLimit) * 100, 100)}%`,
                            }}
                        />
                    ) : null}
                </div>
            </div>

            {/* Min / Max inputs */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                    <label
                        htmlFor="budget-min"
                        className="mb-2 block text-xs uppercase tracking-wider text-white/40"
                    >
                        {labels.min}
                    </label>
                    <div className="relative">
                        <input
                            id="budget-min"
                            type="text"
                            inputMode="numeric"
                            value={localMin}
                            onChange={(e) => {
                                setLocalMin(e.target.value);
                                onMinChange(parseAmount(e.target.value));
                            }}
                            placeholder="5 000"
                            className={inputClassName}
                        />
                        <span
                            aria-hidden
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-sm text-white/30"
                        >
                            {currency}
                        </span>
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="budget-max"
                        className="mb-2 block text-xs uppercase tracking-wider text-white/40"
                    >
                        {labels.max}
                    </label>
                    <div className="relative">
                        <input
                            id="budget-max"
                            type="text"
                            inputMode="numeric"
                            value={localMax}
                            onChange={(e) => {
                                setLocalMax(e.target.value);
                                onMaxChange(parseAmount(e.target.value));
                            }}
                            placeholder="15 000"
                            className={inputClassName}
                        />
                        <span
                            aria-hidden
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-sm text-white/30"
                        >
                            {currency}
                        </span>
                    </div>
                </div>
            </div>

            {/* Quick presets */}
            <div>
                <span className="mb-3 block text-xs font-light uppercase tracking-[0.2em] text-white/40">
                    {labels.presets}
                </span>
                <div className="flex flex-wrap gap-2">
                    {PRESETS.map((preset) => {
                        const isActive =
                            minValue === preset.min && maxValue === preset.max;
                        return (
                            <button
                                key={preset.label}
                                type="button"
                                aria-pressed={isActive}
                                onClick={() => {
                                    onMinChange(preset.min);
                                    onMaxChange(preset.max);
                                    setLocalMin(preset.min.toString());
                                    setLocalMax(preset.max.toString());
                                }}
                                className={`rounded-full border px-4 py-2 font-mono text-xs transition-colors duration-300 ${
                                    isActive
                                        ? "border-white bg-white text-black"
                                        : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                                }`}
                            >
                                {preset.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
