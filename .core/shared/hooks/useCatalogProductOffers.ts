import { DependencyList, useCallback, useEffect, useState } from 'react';

import { catalogProductOffersRequest } from "shared/requests/api";
import { UserModule } from "shared/modules";
import { lodash } from "shared/utilities";
import { ICatalogProductOfferModel } from "shared/models";

import { useReaction } from "./useReaction";

type OptionsType = {
    withStore?: boolean,
    getCatalogProductId: () => (number | undefined | null)[]
}

export function useCatalogProductOffers(
    { withStore, getCatalogProductId }: OptionsType,
    callback: (catalogProductOffersByCatalogProductId: Record<number, ICatalogProductOfferModel[]>) => void,
    deps: DependencyList = []
) {
    const [isLoading, setIsLoading] = useState(true);
    const [cityId, setCityId] = useState(UserModule.user.city.id);

    const $getCatalogProductId = useCallback(getCatalogProductId, deps);
    const $callback = useCallback(callback, [$getCatalogProductId]);

    // trigger render on city id change
    useReaction((cityId) => setCityId(cityId), () => UserModule.user.city.id);

    useEffect(() => {
        (async () => {
            if (!cityId) {
                return;
            }
            const catalogProductId = $getCatalogProductId().filter(item => typeof item === 'number') as number[];
            if (catalogProductId.length === 0) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            const { isSuccess, data } = await catalogProductOffersRequest({
                catalogProductId,
                withStore: withStore ? 1 : 0
            });

            if (isSuccess && data) {
                $callback(lodash.groupBy(data.items, 'catalogProductId'))
            }

            setIsLoading(false);
        })();
    }, [cityId, $getCatalogProductId, $callback]);

    return { isLoading };
}
