"use client";

import { AlertTriangle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { Alert, AlertDescription } from "@/components/ui";
import { CurrentWeather, HourlyTemperature, WeatherDetails, WeatherForecast, WeatherSkeleton, FavoriteButton } from "@/components";

import { useCurrentWeather } from "@/http/use-current-weather";
import { useForecast } from "@/http/use-forecast";

export function CityPage() {
    const t = useTranslations("Pages.CityPage");
    const locale = useLocale();

    const searchParams = useSearchParams();
    const lat = parseFloat(searchParams?.get("lat") || "0");
    const lon = parseFloat(searchParams?.get("lon") || "0");
    const cityName = searchParams?.get("cityName") || "";

    const coordinates = { lat, lon };

    const weatherQuery = useCurrentWeather(coordinates, locale);
    const forecastQuery = useForecast(coordinates, locale);

    if (weatherQuery.error || forecastQuery.error) {
        return (
        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
                {t("error-fetch")}
            </AlertDescription>
        </Alert>
        );
    }

    if (!weatherQuery.data || !forecastQuery.data || !cityName) {
        return <WeatherSkeleton />;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">
                {cityName}, {weatherQuery.data.sys.country}
                </h1>
                <div className="flex gap-2">
                    <FavoriteButton
                        data={{ ...weatherQuery.data, name: cityName }}
                    />
                </div>
            </div>

            <div className="grid gap-6">
                <CurrentWeather data={weatherQuery.data} />
                <HourlyTemperature data={forecastQuery.data} />
                <div className="grid gap-6 md:grid-cols-2 items-start">
                    <WeatherDetails data={weatherQuery.data} />
                    <WeatherForecast data={forecastQuery.data} />
                </div>
            </div>
        </div>
    );
}