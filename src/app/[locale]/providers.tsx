"use client"

import { I18nProviderClient } from "@/locales/client"
import { PropsWithChildren } from "react"

export const Providers = (props: PropsWithChildren<{ locale: string }>) => {
    return (
        <I18nProviderClient
            locale={props.locale}
            fallback={<div className="min-h-screen bg-black" />}
        >
            {props.children}
        </I18nProviderClient>
    )
}