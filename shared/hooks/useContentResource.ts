import { useEffect, useState } from "react";
import { ContentResourceService } from "shared/services";

import { useReaction } from "./useReaction";
import { useCity } from "./useCity";

export function useContentResource(code: string) {
    const city = useCity();

    const [contentResource, setContentResource] = useState(() => {
        return ContentResourceService.get(code, city.id);
    });

    useEffect(() => {
        setContentResource(ContentResourceService.get(code, city.id));
    }, [city, code]);

    useReaction(() => {
        setContentResource(ContentResourceService.get(code, city.id))
    }, () => ContentResourceService.contentResources);

    return contentResource;
}
