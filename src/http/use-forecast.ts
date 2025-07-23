import { useQuery } from "@tanstack/react-query";

import { api, apiDefaultParams } from "./api-client";
import type { Coordinates, ForecastData } from "./types";

export function useForecast(coordinates: Coordinates | null, locale: string) {
    const lat = coordinates && coordinates.lat ? coordinates.lat : 0
    const lon = coordinates && coordinates.lon ? coordinates.lon : 0

    return useQuery({
        queryKey: ['get-forecast', lat, lon],
        queryFn: async () => {
            const result: ForecastData = await api.weather
                .get(`forecast`, {
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