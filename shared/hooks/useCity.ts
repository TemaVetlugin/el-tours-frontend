import { useState } from "react";
import { CityService } from "shared/services";
import { useReaction } from "./useReaction";

export function useCity() {
    const [city, setCity] = useState(CityService.city)

    useReaction((value) => setCity(value), () => CityService.city);

    return city;
};
