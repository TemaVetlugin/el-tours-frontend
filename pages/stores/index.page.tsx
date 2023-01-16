import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'
import { useCallback, useEffect, useMemo } from "react";

import { Layout, LayoutTitle } from "shared/layout";
import { ReturnType } from "shared/types";
import { getApplicationData } from "shared/server";
import {
    UiBoundary,
    UiBreadcrumbs,
    UiCard,
    UiGrid,
    UiLink,
    UiMap,
    UiScroll,
    UiSelect,
    UiSeo,
    UiStickerCard,
    UiStickerCircle,
    UiWrap
} from "shared/uikit";
import { useIsInitialized, useObservable } from "shared/hooks";
import { CityModel, StoreBrandModel, StoreModel } from "shared/models";
import { citiesRequest, storeBrandsRequest, storesRequest } from "shared/requests/api";
import { BootstrapModule, UserModule } from "shared/modules";
import { MEDIA_POINTS, MENU, ROUTES } from "shared/contants";

import './index.scss';

type PropsType = {
    application: ReturnType<typeof getApplicationData>
}

const StoresPage: NextPage<PropsType> = observer(({ application }) => {
    BootstrapModule.application(application);

    const isInitialized = useIsInitialized();

    const store = useObservable({
        isLoading: true,
        cities: [] as CityModel[],
        stores: [] as StoreModel[],
        storeBrands: [] as StoreBrandModel[],
        storeBrandId: null as number | null,
        cityId: null as null | number,
        location: [0, 0],
        zoom: 14,
    });

    const load = useCallback(async () => {
        store.set("isLoading", true);

        const citiesResponse = await citiesRequest();

        if (citiesResponse.isSuccess && citiesResponse.data) {
            store.set("cities", citiesResponse.data.items.map(item => new CityModel(item)))
        }

        const storeBrandsResponse = await storeBrandsRequest();
        if (storeBrandsResponse.isSuccess && storeBrandsResponse.data) {
            store.set("storeBrands", storeBrandsResponse.data.items.map(item => new StoreBrandModel(item)))
        }

        const storesResponse = await storesRequest();
        if (storesResponse.isSuccess && storesResponse.data) {
            store.set("stores", storesResponse.data.items.map(item => new StoreModel(item)))
        }

        store.set("isLoading", false);
    }, [store]);

    useEffect(() => {
        load();
    }, [load]);

    useEffect(() => {
        store.set("cityId", UserModule.user.city.id);
    }, [isInitialized, store]);

    const city = useMemo(() => {
        const city = store.cities.find(city => city.id === store.cityId);
        if (city) {
            return city;
        }
        return store.cities.length > 0 ? store.cities[0] : new CityModel({
            name: 'г. Томск',
            zoom: 7,
            latitude: 56.510233,
            longitude: 84.978771,
        });
    }, [store.cityId, store.cities]);

    useEffect(() => {
        store.update({
            location: [city.latitude, city.longitude],
            zoom: city.zoom,
        })
    }, [city, store]);

    const handleChangeCity = (cityId: number | null) => {
        store.update({
            storeBrandId: null,
            cityId
        });
    }

    let stores = store.stores.filter(item => {
        return store.cityId ? item.cityId === store.cityId : true
    });
    const brands = store.storeBrands.filter(storeBrand => !!stores.find(item => item.storeBrandId === storeBrand.id));
    stores = stores.filter(item => {
        return store.storeBrandId ? item.storeBrandId === store.storeBrandId : true
    });

    return (
        <Layout>
            <UiSeo title={'Аптеки'}/>
            <UiWrap>
                <UiBreadcrumbs items={[MENU.STORES()]}/>
                <LayoutTitle value='Аптеки'/>
                <UiCard>
                    <UiBoundary isLoading={store.isLoading && isInitialized}>
                        <div className="p-stores-map">
                            <UiMap
                                location={store.location}
                                zoom={store.zoom}
                                stores={{ items: stores }}
                            />
                        </div>
                        <div className="p-stores-panel">
                            <UiGrid
                                className="p-stores-panel__header"
                                media={{
                                    [MEDIA_POINTS.IS_360]: {columns: 1, gap: 16},
                                    [MEDIA_POINTS.IS_768]: {columns: 2, gap: 16},
                                    [MEDIA_POINTS.IS_1366]: {columns: 3, gap: 16},
                                }}
                            >
                                <UiSelect
                                    name='cityId'
                                    onChange={(data) => handleChangeCity(data.value as number | null)}
                                    items={store.cities}
                                    value={store.cityId}
                                />
                                <UiSelect
                                    name='storeBrandId'
                                    placeholder='Выберите бренд'
                                    onChange={store.handleChange}
                                    items={[
                                        { id: null, name: 'Все бренды' },
                                        ...brands
                                    ]}
                                    value={store.storeBrandId}
                                />
                            </UiGrid>
                            <UiScroll maxHeight={600}>
                                <div className="p-stores-panel__items">
                                    {stores.map(store => (
                                        <UiLink key={store.id} href={ROUTES.STORE(store.id)} className="p-stores-item">
                                            <div className="p-stores-item__name">{store.name}</div>
                                            <div className="p-stores-item__worktime">
                                                {store.worktime?.replace("\\n", "\n")}
                                            </div>
                                            {store.phone && (
                                                <div className="p-stores-item__phone">{store.phone}</div>
                                            )}
                                        </UiLink>
                                    ))}
                                </div>
                            </UiScroll>
                        </div>
                        <UiGrid
                            media={{
                                [MEDIA_POINTS.IS_360]: {columns: 1, gap: 16},
                                [MEDIA_POINTS.IS_768]: {columns: 2, gap: 16},
                                [MEDIA_POINTS.IS_1366]: {columns: 3, gap: 16},
                            }}
                        >
                            <UiStickerCard
                                withShadow
                                title='Стоимость самовывоза — бесплатно'
                                description='Мы уведомим вас, как только соберём заказ. Заказ хранится 2 суток с момента сборки в Аптеке'
                                sticker={
                                    <UiStickerCircle name={"pointRight"} size={60} stickerSize={32} color='#FFECBA'/>
                                }
                            />
                            <UiStickerCard
                                withShadow
                                description='Если Вы не успеваете забрать заказ в течение 5 дней с момента доставки, позвоните по номеру +7 495 790-77-11 и попросите оператора продлить время хранения заказа в выбранной аптеке'
                                sticker={
                                    <UiStickerCircle name={"pointUp"} size={60} stickerSize={32} color='#FFECBA'/>
                                }
                            />
                        </UiGrid>
                    </UiBoundary>
                </UiCard>
            </UiWrap>
        </Layout>
    )
});

export const getServerSideProps: GetServerSideProps<PropsType> = async (context) => {
    return {
        props: {
            application: await getApplicationData(),
        },
    }
}

export default StoresPage
