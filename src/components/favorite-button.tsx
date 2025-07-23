"use client";

import { Star } from "lucide-react";
import { useLocale } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui";
import type { WeatherData } from "@/http/types";
import { useFavorites } from "@/hooks/use-favorites";

interface FavoriteButtonProps {
  data: WeatherData;
}

export function FavoriteButton({ data }: FavoriteButtonProps) {
  const locale = useLocale();

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

  function getMessageRemovedLocale(cityName: string) {
    switch (locale) {
        case "pt-br":
            return `Removido ${cityName} da lista de favoritos`;
        case "en":
            return `Removed ${cityName} from Favorites`;
        case "es":
            return `Eliminado ${cityName} de Favoritos`;
    }
  }

  function getMessageAddedLocale(cityName: string) {
      switch (locale) {   
          case "pt-br":
              return `Adicionado ${cityName} à lista de favoritos`;
          case "en":
              return `Added ${cityName} to Favorites`;
          case "es":
              return `Agregado ${cityName} a Favoritos`;
      }
  }

  const handleToggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(getMessageRemovedLocale(data.name));
    } else {
      addFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(getMessageAddedLocale(data.name));
    }
  };

  return (
    <Button
      variant={isCurrentlyFavorite ? "default" : "outline"}
      size="icon"
      onClick={handleToggleFavorite}
      className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
    >
      <Star
        className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`}
      />
    </Button>
  );
}