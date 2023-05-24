import { observer } from "mobx-react";

import { UiMap, UiRadio, UiScroll } from "shared/uikit";

import { UserModule } from "shared/modules";
import { CatalogProductOfferModel } from "shared/models";
import { useObservable } from "shared/hooks";

import './index.scss';
import { off } from "dom7";

type PropsType = {
    catalogProductOffers: CatalogProductOfferModel[]
}

export const PProductAvailability = observer(({ catalogProductOffers }: PropsType) => {
    const store = useObservable({
        availability: 'list'
    });

    return (
        <div
            className={`p-product-availability p-product-availability--${store.availability}`}>
            <div className="p-product-availability__header">
                <UiRadio
                    isFlat
                    name='availability'
                    onChange={store.handleChange}
                    value={store.availability}
                    items={[
                        { id: 'list', name: 'Cписок' },
                        { id: 'map', name: 'Карта' },
                    ]}
                />
            </div>
            {store.availability === 'list' && (
                <div className="p-product-availability__items">
                    <UiScroll maxHeight={650}>
                        {catalogProductOffers.map(offer => (
                            <div
                                key={offer.storeId}
                                className='p-product-availability-item'
                            >
                                <div className="p-product-availability-item__inner">
                                    <div className='p-product-availability-item__address'>
                                        {offer.store.address}
                                    </div>
                                    <div className='p-product-availability-item__worktime'>
                                        {offer.store.worktime.replace("\\n", "\n")}
                                    </div>
                                </div>
                                <div
                                    className='p-product-availability-item__badge'
                                    style={{ background: offer.quantityLabel.color }}
                                >
                                    {offer.quantityLabel.name}
                                </div>
                            </div>
                        ))}
                    </UiScroll>
                </div>
            )}
            {store.availability === 'map' && (
                <UiMap
                    location={UserModule.user.city.location}
                    zoom={UserModule.user.city.zoom}
                    stores={{
                        items: catalogProductOffers.map(offer => offer.store)
                    }}
                />
            )}
        </div>
    )
});
