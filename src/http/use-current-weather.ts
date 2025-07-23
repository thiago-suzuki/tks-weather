import { useQuery } from "@tanstack/react-query";

import { api, apiDefaultParams } from "./api-client";
import type { Coordinates, WeatherCondition, WeatherData } from "./types";

export function useCurrentWeather(coordinates: Coordinates | null, locale: string) {
    const lat = coordinates && coordinates.lat ? coordinates.lat : 0
    const lon = coordinates && coordinates.lon ? coordinates.lon : 0

    return useQuery({
        queryKey: ['get-current-weather', lat, lon],
        queryFn: async () => {
            const result: WeatherData = await api.weather
                .get(`weather`, {
                    searchParams: {
                        appid: apiDefaultParams.appId,
                        lat: lat.toString(),
                        lon: lon.toString(),
                        units: apiDefaultParams.units,
                        lang: locale === 'pt-br' ? 'pt_br' : locale
                    }
                })
                .json();

            return result;
        },
        enabled: !!coordinates
    })
}