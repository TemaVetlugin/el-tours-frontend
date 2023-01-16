import React from "react";
import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'

import { Layout, LayoutSection, LayoutTitle } from "shared/layout";
import { UiBreadcrumbs, UiCard, UiHtml, UiSeo, UiSocialShare, UiTypography, UiWrap } from "shared/uikit";
import { MENU, ROUTES } from "shared/contants";
import { getApplicationData, Redis } from "shared/server";
import { promoActionsGetRequest } from "shared/requests/api";
import { ApplicationDataType } from "shared/types";
import { IPromoActionModel, PromoActionModel } from "shared/models";
import { useObservable } from "shared/hooks";
import { formatDate } from "shared/utilities";
import { CLinkButton, CCatalogProductsSlider } from "shared/components";
import { BootstrapModule } from "shared/modules";

import "./index.scss";


type PropsType = {
    application: ApplicationDataType,
    promoAction: IPromoActionModel
}

const PromoActionPage: NextPage<PropsType> = observer(({ application, promoAction }: PropsType) => {
    BootstrapModule.application(application);

    const store = useObservable({
        promoAction: new PromoActionModel(promoAction)
    });

    return (
        <Layout>
            <UiSeo title={store.promoAction.name}/>
            <UiWrap>
                <UiBreadcrumbs items={[MENU.PROMO(), MENU.PROMO_DETAIL()]}/>
                <LayoutTitle value='Акции'/>
                <UiCard className="p-promo-action">
                    <div className="p-promo-action__inner">
                        {store.promoAction.detailImageThumbnail && (
                            <div className="p-promo-action__image">
                                <img src={store.promoAction.detailImageThumbnail} alt=""/>
                            </div>
                        )}
                        <div className="p-promo-action__body">
                            <div className="p-promo-action__date">
                                {formatDate(store.promoAction.dateFrom)} - {formatDate(store.promoAction.dateTo)}
                            </div>
                            <h2 className="p-promo-action__title">{store.promoAction.name}</h2>
                            <UiTypography>
                                <UiHtml value={store.promoAction.detailText}/>
                            </UiTypography>
                        </div>
                    </div>
                    <div className="p-promo-action-footer">
                        <CLinkButton href={ROUTES.PROMO_ACTIONS()} label={'Ко всем акциям'}/>
                        <UiSocialShare/>
                    </div>
                </UiCard>
                <LayoutSection title={'Товары в акции'}>
                    <CCatalogProductsSlider catalogProducts={store.promoAction.catalogProducts}/>
                </LayoutSection>
            </UiWrap>
        </Layout>
    )
});

export const getServerSideProps: GetServerSideProps<PropsType> = async (context) => {
    const application = await getApplicationData();
    const slug = context.query.slug as string;

    const { isSuccess, data } = await Redis.cache(
        `promoActionsGetRequest:${slug}`,
        async () => await promoActionsGetRequest({ slug }),
        3600
    );

    if (!isSuccess || !data?.item) {
        return {
            redirect: {
                permanent: false,
                destination: ROUTES.ERROR_404()
            }
        }
    }

    return {
        props: {
            application,
            promoAction: data.item,
        }
    }
}


export default PromoActionPage;
