import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'

import { COLORS, MEDIA_POINTS, MENU, ROUTES } from "shared/contants";
import { Layout, LayoutTitle } from "shared/layout";
import { UiBoundary, UiBreadcrumbs, UiGrid, UiIcon, UiLink, UiScroll, UiSeo, UiWrap } from "shared/uikit";
import { useObservable } from "shared/hooks";
import { PromoActionModel } from "shared/models";
import { promoActionsRequest } from "shared/requests/api";
import { formatDate } from "shared/utilities";
import { getApplicationData } from "shared/server";
import { ApplicationDataType } from "shared/types";
import { BootstrapModule } from "shared/modules";

import "./index.scss";

type PropsType = {
    application: ApplicationDataType
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

    return (
        <Layout>
            <UiSeo title={'Акции'}/>
            <UiWrap>
                <UiBreadcrumbs items={[MENU.PROMO()]}/>
                <LayoutTitle value='Акции'/>
                <div className="p-promo-actions__description">
                    Скидки не суммируются, покупателю предоставляется <br/>
                    максимальная из действующих скидок. В акциях не <br/>
                    участвуют товары со специальной ценой.
                </div>
                <UiBoundary isLoading={store.isLoading}>
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
                </UiBoundary>
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
