"use client";

/**
 * Honeypot - Champ anti-spam invisible
 * Les bots le rempliront automatiquement, les humains ne le verront jamais
 */
export function Honeypot({ register }: { register: any }) {
    return (
        <input
            type="text"
            {...register("honeypot")}
            name="website"
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            className="sr-only absolute -left-[9999px] w-0 h-0 opacity-0"
            style={{
                position: "absolute",
                left: "-9999px",
                width: "0",
                height: "0",
                opacity: 0,
                pointerEvents: "none",
            }}
        />
    );
}

