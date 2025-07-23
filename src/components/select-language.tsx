"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui";
import { useRouter, usePathname, locales as localesData } from "@/i18n/routing";

export function SelectLanguage() {
  const t = useTranslations("Components.Header.languages");

  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const locales = [
    { code: "en", label: t("en"), flag: "/usa.svg" },
    { code: "es", label: t("es"), flag: "/spain.svg" },
    { code: "pt-br", label: t("pt-br"), flag: "/brazil.svg" },
  ];

  const handleChange = (newLocale: string) => {
    const localePattern = localesData.map(l => l.replace('-', '\\-')).join('|');
    const regex = new RegExp(`^/(${localePattern})(?=/|$)`, 'i');
    const pathnameWithoutLocale = pathname.replace(regex, '') || '/';

    const search = typeof window !== 'undefined' ? window.location.search : '';

    router.replace(pathnameWithoutLocale + search, { locale: newLocale });
  };

  const selected = locales.find(l => l.code === locale);

  return (
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger className="bg-transparent text-foreground pl-10 min-w-[200px] relative">
        <span className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <Image src={selected?.flag || ''} alt="flag" width={20} height={14} className="rounded-sm" />
        </span>
        <SelectValue>{selected?.label}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-background text-foreground border border-border">
        {locales.map((l) => (
          <SelectItem key={l.code} value={l.code} className="flex items-center gap-2">
            <Image src={l.flag} alt={l.label} width={20} height={14} className="rounded-sm mr-2" />
            {l.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 