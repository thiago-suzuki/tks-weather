"use client";

import { 
    AlertTriangle, 
    MapPin, 
    RefreshCw 
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { 
    CurrentWeather,
    FavoriteCities,
    HourlyTemperature, 
    WeatherDetails,
    WeatherForecast,
    WeatherSkeleton 
} from "@/components";
import { 
    Alert, 
    AlertDescription, 
    AlertTitle, 
    Button 
} from "@/components/ui";
import { 
    useGeolocation 
} from "@/hooks";

import { useReverseGeocode } from "@/http/use-reverse-geocode";
import { useCurrentWeather } from "@/http/use-current-weather";
import { useForecast } from "@/http/use-forecast";

export function WeatherDashboard() {
    const t = useTranslations('Pages.WeatherDashboard')
    const locale = useLocale();

    const { 
        coordinates, 
        error: locationError, 
        getLocation, 
        isLoading: locationLoading 
    } = useGeolocation()

    const weatherQuery = useCurrentWeather(coordinates, locale)
    const forecastQuery = useForecast(coordinates, locale)
    const locationQuery = useReverseGeocode(coordinates)

    const handleRefresh = () => {
        getLocation();

        if(coordinates) {
            weatherQuery.refetch()
            forecastQuery.refetch()
            locationQuery.refetch()
        }
    }

    if(locationLoading) {
        return <WeatherSkeleton />
    }

    if (locationError) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{t('error-location.title')}</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>{locationError}</p>
                    <Button onClick={getLocation} variant="outline" className="w-fit">
                        <MapPin className="mr-2 h-4 w-4" />
                        {t('error-location.button-enable')}
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    if (!coordinates) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{t('error-required-location.title')}</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>{t('error-required-location.message')}</p>
                    <Button onClick={getLocation} variant="outline" className="w-fit">
                        <MapPin className="mr-2 h-4 w-4" />
                        {t('error-location.button-enable')}
                    </Button>
                </AlertDescription>
            </Alert>
        )
    }

    const locationName = locationQuery.data?.[0];

    if (weatherQuery.error || forecastQuery.error) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{t('error-fetch.title')}</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>{t('error-fetch.message')}</p>
                    <Button variant="outline" onClick={handleRefresh} className="w-fit">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        {t('error-fetch.button-retry')}
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (!weatherQuery.data || !forecastQuery.data) {
        return <WeatherSkeleton />;
    }


    return (
        <div className="space-y-4">
            <FavoriteCities />
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">{t('title-my-location')}</h1>
                <Button 
                    variant={"outline"} 
                    onClick={handleRefresh}
                    disabled={weatherQuery.isFetching || forecastQuery.isFetching}
                    size={"icon"}
                >
                    <RefreshCw 
                        className={`h-4 w-4 ${
                            weatherQuery.isFetching ? "animate-spin" : ""
                        }`}
                    />
                </Button>
            </div>

            <div className="grid gap-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    <CurrentWeather
                        data={weatherQuery.data}
                        locationName={locationName}
                    />
                    <HourlyTemperature data={forecastQuery.data} />
                </div>

                <div className="grid gap-6 md:grid-cols-2 items-start">
                    <WeatherDetails data={weatherQuery.data} />
                    <WeatherForecast data={forecastQuery.data} />
                </div>
            </div>
        </div>
    )
}