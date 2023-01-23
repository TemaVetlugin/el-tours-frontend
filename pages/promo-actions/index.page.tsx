import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'

import { COLORS, MEDIA_POINTS, MENU, ROUTES } from "shared/contants";
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
            badge: 'Осталось 8 дней'
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
            name: 'Выгодное предложение',
            previewImageThumbnail: 'https://via.placeholder.com/310x380',
            slug: 'promo-detail',
            badge: 'Осталось 8 дней'
        },
    ];

    return (
        <Layout>
            <UiSeo title={'Акции'}/>
            <UiWrap>
                <UiBreadcrumbs items={[MENU.PROMO()]}/>
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
                        <UiGrid>
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
                                        />
                                    ))}
                                </UiGrid>
                                {/*<UiPagination*/}
                                {/*    isMore*/}
                                {/*    isLoading={store.isLoadingNewPage}*/}
                                {/*    pagination={store.pagination}*/}
                                {/*/>*/}
                            </div>
                        </UiGrid>
                    </UiBoundary>
                </UiGrid>

                <UiGrid
                    media={{
                        [MEDIA_POINTS.IS_360]: { columns: 1, gap: 30 },
                        [MEDIA_POINTS.IS_768]: { columns: 2, gap: 30 },
                        [MEDIA_POINTS.IS_1024]: { columns: 3, gap: [15, 24] },
                        [MEDIA_POINTS.IS_1366]: { columns: 3, gap: [23, 30] }
                    }}
                >
                    {store.promoActions.map(promoAction => (
                        <UiLink
                            key={promoAction.id}
                            href={ROUTES.PROMO_ACTION(promoAction.slug)}
                            className="p-promo-actions-item"
                        >
                            <div
                                className="p-promo-actions-item__preview"
                                style={{ backgroundImage: `url(${promoAction.previewImageThumbnail})` }}
                            >
                                <div className="p-promo-actions-item__inner">
                                    <div className="p-promo-actions-item__text">
                                        <UiScroll height={'100%'}>
                                            {promoAction.previewText}
                                        </UiScroll>
                                    </div>
                                    <div className="p-promo-actions-item__icon">
                                        <UiIcon size={14} name={'arrowTopRight'} color={COLORS.BLACK_MEDIUM}/>
                                    </div>
                                </div>
                            </div>
                            <div className="p-promo-actions-item__date">
                                {formatDate(promoAction.dateFrom)} – {formatDate(promoAction.dateTo)}
                            </div>
                            <div className="p-promo-actions-item__title">
                                {promoAction.name}
                            </div>
                        </UiLink>
                    ))}
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
