"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { Switch } from "@/components/ui";

export function ThemeToggleSwitch() {
    const t = useTranslations("Components.ThemeToggleSwitch");
    
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="flex items-center justify-between gap-4 py-2 px-1">
            <span className="text-sm">{isDark ? t("label-dark") : t("label-light")}</span>
            <Switch
                checked={isDark}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                aria-label="Alternar tema escuro"
            />
        </div>
    );
}