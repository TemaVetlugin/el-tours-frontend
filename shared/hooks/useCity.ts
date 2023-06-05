import { useState } from "react";
import { LocationService } from "shared/services";
import { useReaction } from "./useReaction";

export function useCity() {
    const [city, setCity] = useState(LocationService.city)

    useReaction((value) => setCity(value), () => LocationService.city);

    return city;
};
