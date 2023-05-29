import React from "react";
import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'

import { Layout, LayoutSection, LayoutTitle } from "shared/layout";
import { UiBreadcrumbs, UiCard, UiHtml, UiSeo, UiSocialShare, UiTypography, UiWrap } from "shared/uikit";
import { BREADCRUMBS, ROUTES } from "shared/contants";
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
    // BootstrapModule.application(application);
    //
    // const store = useObservable({
    //     promoAction: new PromoActionModel(promoAction)
    // });

    const store = {
        promoAction: {
            name: 'Исследования уровня ферритина в подарок за покупку средств Ducray',
            detailImageThumbnail: 'https://via.placeholder.com/600x373',
            dateTo: '',
            detailText: '<p>Акция проходит с 10.10.2022 по 10.12.2022 года. Купи 2 любых продукта Ducray из гаммы против выпадения волос, загрузи чек и получи бесплатный сертификат на анализ ферритина. Организаторы Акции ООО «Пьер Фабр» и ООО «Гемотест». Полные условия и порядок участия опубликованы на сайте <a href="">https://vypadeniyu.net/</a></p>'
        }
    }

    return (
        <Layout>
            <UiSeo title={store.promoAction.name}/>
            <UiWrap>
                <UiBreadcrumbs items={[BREADCRUMBS.PROMO(), BREADCRUMBS.PROMO_DETAIL()]}/>
                <LayoutTitle value='Акции'/>
                <UiCard className="p-promo-action">
                    <div className="p-promo-action__inner">
                        {store.promoAction.detailImageThumbnail && (
                            <div className="p-promo-action__image">
                                <img src={store.promoAction.detailImageThumbnail} alt=""/>
                            </div>
                        )}
                        <div className="p-promo-action__body">
                            <div className="p-promo-action__row">
                                <CLinkButton href={ROUTES.PROMO_ACTIONS()} label={'Все акции'}/>
                                <UiSocialShare/>
                            </div>
                            <h1 className="p-promo-action__title">{store.promoAction.name}</h1>
                            <div className="p-promo-action__date">
                                {/*Акция действует до {formatDate(store.promoAction.dateTo)}*/}
                                Акция действует до 04.12.2022
                            </div>
                            <UiTypography>
                                <UiHtml value={store.promoAction.detailText}/>
                            </UiTypography>
                        </div>
                    </div>
                </UiCard>
                <LayoutSection title={'Акционные товары'}>
                    {/*<CCatalogProductsSlider catalogProducts={store.promoAction.catalogProducts}/>*/}
                </LayoutSection>
            </UiWrap>
        </Layout>
    )
});

// export const getServerSideProps: GetServerSideProps<PropsType> = async (context) => {
//     const application = await getApplicationData();
//     const slug = context.query.slug as string;
//
//     const { isSuccess, data } = await Redis.cache(
//         `promoActionsGetRequest:${slug}`,
//         async () => await promoActionsGetRequest({ slug }),
//         3600
//     );
//
//     if (!isSuccess || !data?.item) {
//         return {
//             redirect: {
//                 permanent: false,
//                 destination: ROUTES.ERROR_404()
//             }
//         }
//     }
//
//     return {
//         props: {
//             application,
//             promoAction: data.item,
//         }
//     }
// }


export default PromoActionPage;
