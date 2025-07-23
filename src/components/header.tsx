"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link"
import { useState } from "react";

import { CitySearch, SelectLanguage, ThemeToggleIcon, ThemeToggleSwitch } from "@/components";

export function Header() {
    const [open, setOpen] = useState(false);

    function handleCloseMenu() {
        setOpen(false);
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 py-2 supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/">
                    <h1 className=" font-bold">
                        <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#55D78E] to-[#1EA6BD]">TKS</span>
                        <span className="ml-3">Weather</span>
                    </h1>
                </Link>

                <div className="md:hidden flex items-center gap-2">
                    <button
                        className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-ring"
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Abrir menu"
                    >
                        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                    {open && (
                        <div className="absolute right-4 top-16 bg-background border border-border rounded shadow-lg flex flex-col gap-4 p-4 z-50 min-w-[180px]">
                            <ThemeToggleSwitch />
                            <CitySearch onOpenChange={handleCloseMenu} />
                            <SelectLanguage />
                        </div>
                    )}
                </div>

                <div className="hidden md:flex flex-row gap-4 items-center">
                    <ThemeToggleIcon />
                    <CitySearch />
                    <SelectLanguage />
                </div>
            </div>
        </header>
    )
}