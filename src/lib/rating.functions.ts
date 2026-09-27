import { createServerFn } from "@tanstack/react-start";

const PLACE_ID = "ChIJvdAfLwCnbUcRYc92ACy-jDY";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";

export type PlaceRating = {
  rating: number | null;
  count: number | null;
};

export const getGoogleRating = createServerFn({ method: "GET" }).handler(async (): Promise<PlaceRating> => {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
  if (!lovableKey || !mapsKey) return { rating: null, count: null };

  const response = await fetch(`${GATEWAY_URL}/places/v1/places/${PLACE_ID}?languageCode=de`, {
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": mapsKey,
      "X-Goog-FieldMask": "rating,userRatingCount",
    },
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`Google Places request failed [${response.status}]: ${body}`);
    return { rating: null, count: null };
  }

  const data = (await response.json()) as { rating?: number; userRatingCount?: number };
  return {
    rating: typeof data.rating === "number" ? data.rating : null,
    count: typeof data.userRatingCount === "number" ? data.userRatingCount : null,
  };
});
