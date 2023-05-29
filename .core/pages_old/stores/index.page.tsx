import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'
import React, { useCallback, useEffect, useMemo } from "react";

import { Layout, LayoutTitle } from "shared/layout";
import { ReturnType } from "shared/types";
import { getApplicationData } from "shared/server";
import {
    UiBoundary,
    UiBreadcrumbs, UiButton,
    UiChecklist,
    UiGrid, UiIcon,
    UiMap,
    UiScroll,
    UiSeo,
    UiTabs,
    UiWrap
} from "shared/uikit";
import { useIsInitialized, useMedia, useObservable } from "shared/hooks";
import { CityModel, StoreBrandModel, StoreModel } from "shared/models";
import { citiesRequest, storeBrandsRequest, storesRequest } from "shared/requests/api";
import { BootstrapModule, UserModule } from "shared/modules";
import { COLORS, MEDIA_POINTS, BREADCRUMBS, ROUTES } from "shared/contants";

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
        tab: 'list'
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
            zoom: 12,
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

    const { is360, is768 } = useMedia();

    return (
        <Layout>
            <UiSeo title={'Аптеки'}/>
            <UiWrap>
                <UiBreadcrumbs items={[BREADCRUMBS.STORES()]}/>
                <LayoutTitle value='Аптеки'/>
                {(is360 || is768) && (
                    <div className="p-stores-tabs">
                        <UiTabs
                            items={[
                                {
                                    id: 'list',
                                    name: 'Список',
                                },
                                {
                                    id: 'map',
                                    name: 'На карте',
                                },
                            ]}
                            value={store.tab}
                            name={'tab'}
                            onChange={store.handleChange}
                        />
                    </div>
                )}
                <div className="p-stores__header">
                    <div className="p-stores__filter">
                        <UiChecklist
                            isFlat={true}
                            items={[
                                {id: 0, name: 'Работает сейчас'},
                                {id: 1, name: 'Круглосуточная'},
                                {id: 2, name: 'С доставкой на дом'},
                            ]}
                        />
                    </div>
                    {!store.isLoading && (
                        <div className="p-stores__results">Найдено 12 аптек</div>
                    )}
                </div>
                <UiBoundary isLoading={store.isLoading && isInitialized}>
                    {(is360 || is768) && store.tab === 'list' && (
                        <div className="p-stores-panel">
                            <div className="p-stores-panel__items">
                                <div className="p-stores-item">
                                    <UiGrid
                                        className="p-stores-item__top"
                                        media={{
                                            [MEDIA_POINTS.IS_360]: { columns: 1 },
                                            [MEDIA_POINTS.IS_768]: { columns: '202px auto', gap: 24 },
                                        }}
                                    >
                                        <div>
                                            <div className="p-stores-item__badge">
                                                <UiIcon size={16} name={'delivery'} color={'#FEFEFE'}/>
                                                <span>Доставим на дом</span>
                                            </div>
                                            <div className="p-stores-item__name">Аптека №12</div>
                                        </div>
                                        <div>
                                            <div className="p-stores-item__text">«Центр лекарств и красоты»</div>
                                            <div className="p-stores-item__address">г. Томск, ул. Учебная, 20</div>
                                        </div>
                                    </UiGrid>
                                    <UiGrid
                                        className="p-stores-item__bottom"
                                        media={{
                                            [MEDIA_POINTS.IS_360]: { columns: 1 },
                                            [MEDIA_POINTS.IS_768]: { columns: '202px auto', gap: 24 },
                                        }}
                                    >
                                        <div>
                                            <a href={"tel:+73822427388"} className="p-stores-item__phone">+7 (3822) 42–73–88</a>
                                            {is360 && (
                                                <div className="p-stores-item__worktime">
                                                    <span>Пн-пт: 8:00 - 22:00</span>
                                                    <span>Сб: 10:00 - 18:00</span>
                                                    <span>Вс: 10:00 - 18:00</span>
                                                </div>
                                            )}
                                            <div className="p-stores-item__buttons">
                                                <UiButton
                                                    label="Выбрать"
                                                    size={'small'}
                                                    colors={{
                                                        button: [COLORS.PRIMARY, COLORS.GREEN],
                                                        label: [COLORS.WHITE, COLORS.WHITE]
                                                    }}
                                                />
                                                <UiButton
                                                    label="Маршрут"
                                                    size={'small'}
                                                    colors={{
                                                        button: [COLORS.WHITE, COLORS.BLUE_LIGHT],
                                                        label: [COLORS.PRIMARY, COLORS.PRIMARY]
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {is768 && (
                                            <div>
                                                <div className="p-stores-item__worktime">
                                                    <span>Пн-пт: 8:00 - 22:00</span>
                                                    <span>Сб: 10:00 - 18:00</span>
                                                    <span>Вс: 10:00 - 18:00</span>
                                                </div>
                                            </div>
                                        )}
                                    </UiGrid>
                                </div>
                                <div className="p-stores-item">
                                    <UiGrid
                                        className="p-stores-item__top"
                                        media={{
                                            [MEDIA_POINTS.IS_360]: { columns: 1 },
                                            [MEDIA_POINTS.IS_768]: { columns: '202px auto', gap: 24 },
                                        }}
                                    >
                                        <div>
                                            <div className="p-stores-item__badge">
                                                <UiIcon size={16} name={'delivery'} color={'#FEFEFE'}/>
                                                <span>Доставим на дом</span>
                                            </div>
                                            <div className="p-stores-item__name">Аптечный пункт №5564</div>
                                        </div>
                                        <div>
                                            <div className="p-stores-item__text">«Центр лекарств и красоты»</div>
                                            <div className="p-stores-item__address">г. Томск, ул. Розы Люксембург 1369а</div>
                                        </div>
                                    </UiGrid>
                                    <UiGrid
                                        className="p-stores-item__bottom"
                                        media={{
                                            [MEDIA_POINTS.IS_360]: { columns: 1 },
                                            [MEDIA_POINTS.IS_768]: { columns: '202px auto', gap: 24 },
                                        }}
                                    >
                                        <div>
                                            <a href={"tel:+73822427388"} className="p-stores-item__phone">+7 (3822) 42–73–88</a>
                                            {is360 && (
                                                <div className="p-stores-item__worktime">
                                                    <span>Пн-пт: 8:00 - 22:00</span>
                                                    <span>Сб: 10:00 - 18:00</span>
                                                    <span>Вс: 10:00 - 18:00</span>
                                                </div>
                                            )}
                                            <div className="p-stores-item__buttons">
                                                <UiButton
                                                    label="Выбрать"
                                                    size={'small'}
                                                    colors={{
                                                        button: [COLORS.PRIMARY, COLORS.GREEN],
                                                        label: [COLORS.WHITE, COLORS.WHITE]
                                                    }}
                                                />
                                                <UiButton
                                                    label="Маршрут"
                                                    size={'small'}
                                                    colors={{
                                                        button: [COLORS.WHITE, COLORS.BLUE_LIGHT],
                                                        label: [COLORS.PRIMARY, COLORS.PRIMARY]
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {is768 && (
                                            <div>
                                                <div className="p-stores-item__worktime">
                                                    <span>Пн-пт: 8:00 - 22:00</span>
                                                    <span>Сб: 10:00 - 18:00</span>
                                                    <span>Вс: 10:00 - 18:00</span>
                                                </div>
                                            </div>
                                        )}
                                    </UiGrid>
                                </div>
                            </div>
                        </div>
                    )}
                    {(is360 || is768) && store.tab === 'map' && (
                        <div className="p-stores-map">
                            <UiMap
                                location={store.location}
                                zoom={store.zoom}
                                stores={{ items: stores }}
                            />
                        </div>
                    )}
                    {!is768 && !is360 && (
                        <UiGrid media={{
                            [MEDIA_POINTS.IS_1024]: { columns: '323px auto', gap: 7 },
                        }}>
                            <div className="p-stores-panel">
                                <UiScroll maxHeight={1332}>
                                    <div className="p-stores-panel__items">
                                        <div className="p-stores-item">
                                            <div className="p-stores-item__top">
                                                <div className="p-stores-item__badge">
                                                    <UiIcon size={16} name={'delivery'} color={'#FEFEFE'}/>
                                                    <span>Доставим на дом</span>
                                                </div>
                                                <div className="p-stores-item__name">Аптека №12</div>
                                                <div className="p-stores-item__text">«Центр лекарств и красоты»</div>
                                                <div className="p-stores-item__address">г. Томск, ул. Учебная, 20</div>
                                            </div>
                                            <a href={"tel:+73822427388"} className="p-stores-item__phone">+7 (3822) 42–73–88</a>
                                            <div className="p-stores-item__worktime">
                                                <span>Пн-пт: 8:00 - 22:00</span>
                                                <span>Сб: 10:00 - 18:00</span>
                                                <span>Вс: 10:00 - 18:00</span>
                                            </div>
                                            <UiButton
                                                label="Выбрать эту аптеку"
                                                size={'small'}
                                                colors={{
                                                    button: [COLORS.PRIMARY, COLORS.GREEN],
                                                    label: [COLORS.WHITE, COLORS.WHITE]
                                                }}
                                            />
                                        </div>
                                        <div className="p-stores-item">
                                            <div className="p-stores-item__top">
                                                <div className="p-stores-item__name">Аптечный пункт №5564</div>
                                                <div className="p-stores-item__text">«Центр лекарств и красоты»</div>
                                                <div className="p-stores-item__address">г. Томск, ул. Розы Люксембург 1369а</div>
                                            </div>
                                            <a href={"tel:+73822427388"} className="p-stores-item__phone">+7 (3822) 42–73–88</a>
                                            <div className="p-stores-item__worktime">
                                                <span>Пн-пт: 8:00 - 22:00</span>
                                                <span>Сб: 10:00 - 18:00</span>
                                                <span>Вс: 10:00 - 18:00</span>
                                            </div>
                                            <UiButton
                                                label="Выбрать эту аптеку"
                                                size={'small'}
                                                colors={{
                                                    button: [COLORS.PRIMARY, COLORS.GREEN],
                                                    label: [COLORS.WHITE, COLORS.WHITE]
                                                }}
                                            />
                                        </div>
                                    </div>
                                </UiScroll>
                            </div>
                            <div className="p-stores-map">
                                <UiMap
                                    location={store.location}
                                    zoom={store.zoom}
                                    stores={{ items: stores }}
                                />
                            </div>
                        </UiGrid>
                    )}
                </UiBoundary>
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
