import { useQuery } from "@tanstack/react-query";

import { api, apiDefaultParams } from "./api-client";
import type { Coordinates, GeocodingResponse } from "./types";

export function useReverseGeocode(coordinates: Coordinates | null) {
    const lat = coordinates && coordinates.lat ? coordinates.lat : 0
    const lon = coordinates && coordinates.lon ? coordinates.lon : 0

    return useQuery({
        queryKey: ['get-reverse-geocode', lat, lon],
        queryFn: async () => {
            const result: GeocodingResponse[] = await api.geo
                .get(`reverse`, {
                    searchParams: {
                        appid: apiDefaultParams.appId,
                        lat: lat.toString(),
                        lon: lon.toString(),
                        limit: 1
                    }
                })
                .json();

            return result;
        },
        enabled: !!coordinates
    })
}