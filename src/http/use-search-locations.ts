import { useQuery } from "@tanstack/react-query";

import { api, apiDefaultParams } from "./api-client";
import type { GeocodingResponse } from "./types";

export function useSearchLocations(query: string) {
    return useQuery({
        queryKey: ['search-locations', query],
        queryFn: async () => {
            const result: GeocodingResponse[] = await api.geo
                .get(`direct`, {
                    searchParams: {
                        appid: apiDefaultParams.appId,
                        q: query,
                        limit: "5"
                    }
                })
                .json();

            return result;
        },
        enabled: query.length >= 3
    })
}