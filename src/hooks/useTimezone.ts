"use client";

import { useEffect, useState } from "react";

export function useTimezone() {
    const [timezone, setTimezone] = useState<string>("");
    const [offset, setOffset] = useState<string>("");

    useEffect(() => {
        try {
            // Détecter le timezone
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            setTimezone(tz);

            // Calculer l'offset (ex: +01:00)
            const now = new Date();
            const offsetMinutes = -now.getTimezoneOffset();
            const hours = Math.floor(Math.abs(offsetMinutes) / 60);
            const minutes = Math.abs(offsetMinutes) % 60;
            const sign = offsetMinutes >= 0 ? "+" : "-";
            const formatted = `${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
            setOffset(formatted);
        } catch (error) {
            console.error("Failed to detect timezone:", error);
            setTimezone("UTC");
            setOffset("+00:00");
        }
    }, []);

    return { timezone, offset };
}

// Fonction helper pour formater le timezone de manière lisible
export function formatTimezone(tz: string, offset: string): string {
    // Remplacer les underscores par des espaces
    const readable = tz.replace(/_/g, " ");
    return `${readable} (UTC${offset})`;
}

