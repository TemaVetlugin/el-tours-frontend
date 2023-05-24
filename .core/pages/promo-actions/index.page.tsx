import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'

import { COLORS, MEDIA_POINTS, BREADCRUMBS, ROUTES } from "shared/contants";
import { Layout, LayoutSubtitle, LayoutTitle } from "shared/layout";
import {
    UiArticleTile,
    UiBoundary,
    UiBreadcrumbs,
    UiGrid,
    UiIcon,
    UiLink, UiPagination,
    UiScroll,
    UiSeo,
    UiWrap
} from "shared/uikit";
import { useObservable } from "shared/hooks";
import { PaginationModel, PromoActionModel } from "shared/models";
import { promoActionsRequest } from "shared/requests/api";
import { formatDate } from "shared/utilities";
import { getApplicationData } from "shared/server";
import { ApplicationDataType } from "shared/types";
import { BootstrapModule } from "shared/modules";

import "./index.scss";

type PropsType = {
    application: ApplicationDataType,
}

const PromoActionsPage: NextPage<PropsType> = observer(({ application }) => {
    BootstrapModule.application(application);

    const store = useObservable({
        isLoading: true,
        promoActions: [] as PromoActionModel[]
    });

    const load = useCallback(async () => {
        store.set("isLoading", true);
        const { isSuccess, data } = await promoActionsRequest();
        if (isSuccess && data) {
            store.set("promoActions", data.items.map(item => new PromoActionModel(item)));
        }
        store.set("isLoading", false);
    }, [store]);

    useEffect(() => {
        load();
    }, [load]);

    const promoActions = [
        {
            id: 0,
            name: 'Что принимать будущей маме?',
            previewImageThumbnail: 'https://via.placeholder.com/310x380',
            slug: 'promo-detail',
            badge: 'Осталось 8 дней',
            isLarge: true
        },
        {
            id: 1,
            name: 'Особый уход за кожей при сахарном диабете',
            previewImageThumbnail: 'https://via.placeholder.com/310x380',
            slug: 'promo-detail',
            badge: 'Осталось 8 дней'
        },
        {
            id: 2,
            name: 'Уход за пожилыми и ограниченно подвижными людьми',
            previewImageThumbnail: 'https://via.placeholder.com/310x380',
            slug: 'promo-detail',
            badge: 'Осталось 8 дней'
        },
        {
            id: 3,
            name: 'Особый уход за кожей при сахарном диабете',
            previewImageThumbnail: 'https://via.placeholder.com/310x380',
            slug: 'promo-detail',
            badge: 'Осталось 8 дней'
        },
        {
            id: 4,
            name: 'Уход за пожилыми и ограниченно подвижными людьми',
            previewImageThumbnail: 'https://via.placeholder.com/310x380',
            slug: 'promo-detail',
            badge: 'Осталось 8 дней'
        },
        {
            id: 5,
            name: 'Выгодное предложение',
            previewImageThumbnail: 'https://via.placeholder.com/310x380',
            slug: 'promo-detail',
            badge: 'Осталось 8 дней'
        },

        {
            id: 6,
            name: 'Особый уход за кожей при сахарном диабете',
            previewImageThumbnail: 'https://via.placeholder.com/310x380',
            slug: 'promo-detail',
            badge: 'Осталось 8 дней'
        },
    ];

    return (
        <Layout>
            <UiSeo title={'Акции'}/>
            <UiWrap>
                <UiBreadcrumbs items={[BREADCRUMBS.PROMO()]}/>
                <LayoutTitle value='Акции'/>

                <UiGrid media={{
                    [MEDIA_POINTS.IS_360]: { columns: 1, gap: 20 },
                    [MEDIA_POINTS.IS_768]: { columns: 1, gap: 30 },
                    [MEDIA_POINTS.IS_1024]: { columns: 1, gap: 50 },
                    [MEDIA_POINTS.IS_1366]: { columns: 1, gap: 40 }
                }}>
                    <UiGrid media={{
                        [MEDIA_POINTS.IS_360]: { columns: 1, gap: 16 },
                        [MEDIA_POINTS.IS_768]: { columns: '1fr 222px', gap: 16 },
                        [MEDIA_POINTS.IS_1024]: { columns: '1fr 310px', gap: 20 },
                        [MEDIA_POINTS.IS_1366]: { columns: '1fr 310px', gap: 20 }
                    }}>
                        <LayoutSubtitle>
                            Напоминаем пользователям нашего сайта и приложения, что акции, заявленные в этой рубрике
                            действуют только при оформлении заказа через сайт или приложение и при соблюдении
                            опубликованных условий. Индивидуальные аптечные скидки не суммируются и дисконтные
                            карты аптек к нашим заказам не применяются.
                        </LayoutSubtitle>
                    </UiGrid>
                    <UiBoundary isLoading={store.isLoading}>
                        <div>
                            <UiGrid
                                media={{
                                    [MEDIA_POINTS.IS_360]: { columns: 1, gap: 16 },
                                    [MEDIA_POINTS.IS_768]: { columns: 3, gap: 16 },
                                    [MEDIA_POINTS.IS_1024]: { columns: 4, gap: [16, 24] },
                                    [MEDIA_POINTS.IS_1366]: { columns: 4, gap: [20, 50] }
                                }}
                            >
                                {/*{store.promoActions.map(news => (*/}
                                {promoActions.map(promoAction => (
                                    <UiArticleTile
                                        key={promoAction.id}
                                        name={promoAction.name}
                                        href={ROUTES.PROMO_ACTION(promoAction.slug)}
                                        image={promoAction.previewImageThumbnail}
                                        badge={promoAction.badge}
                                        isLarge={promoAction.isLarge}
                                    />
                                ))}
                            </UiGrid>
                            {/*<UiPagination*/}
                            {/*    isMore*/}
                            {/*    isLoading={store.isLoadingNewPage}*/}
                            {/*    pagination={store.pagination}*/}
                            {/*/>*/}
                        </div>
                    </UiBoundary>
                </UiGrid>
            </UiWrap>
        </Layout>
    )
});

export const getServerSideProps: GetServerSideProps<PropsType> = async () => {
    return {
        props: {
            application: await getApplicationData(),
        }
    }
}

export default PromoActionsPage;
