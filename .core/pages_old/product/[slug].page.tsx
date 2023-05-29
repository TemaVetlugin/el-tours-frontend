import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'
import { useEffect, useMemo } from "react";
import classnames from "classnames";

import { Layout, LayoutSection, LayoutTitle } from "shared/layout";
import { useCatalogBreadcrumbs, useCatalogProductOffers, useObservable } from "shared/hooks";
import { CatalogProductModel, ICatalogProductModel } from "shared/models";
import { catalogProductsGetRequest } from "shared/requests/api";
import { getApplicationData, Redis } from "shared/server";
import { ApplicationDataType } from "shared/types";
import { COLORS, MEDIA_POINTS, BREADCRUMBS, ROUTES } from "shared/contants";
import {
    UiBreadcrumbs,
    UiCard,
    UiGrid,
    UiHtml,
    UiIcon,
    UiSeo,
    UiSocialShare,
    UiTabs,
    UiTypography,
    UiWrap
} from "shared/uikit";
import { CAddToCart, CCatalogProductsSlider, CCatalogProductsViewed } from "shared/components";
import { BootstrapModule, CatalogModule } from "shared/modules";

import { PProductSlider } from "./components/PProductSlider";
import { PProductAvailability } from "./components/PProductAvailability";
import { PProductFeedbacks } from "./components/PProductFeedbacks";

import { getTabsItems } from "./utilities/getTabsItems";

import './index.scss';

type PropsType = {
    application: ApplicationDataType,
    catalogProduct: ICatalogProductModel,
    substitutes: ICatalogProductModel[],
    recommendations: ICatalogProductModel[],
}

const ProductPage: NextPage<PropsType> = observer((
    { application, catalogProduct, substitutes, recommendations }
) => {
    BootstrapModule.application(application);
    const store = useObservable({
        catalogProduct: new CatalogProductModel(catalogProduct),
        substitutes: substitutes.map(catalogProduct => new CatalogProductModel(catalogProduct)),
        recommendations: recommendations.map(catalogProduct => new CatalogProductModel(catalogProduct)),
        tab: 'availability' as string | number | null
    });

    useEffect(() => {
        store.update({
            catalogProduct: new CatalogProductModel(catalogProduct),
            substitutes: substitutes.map(catalogProduct => new CatalogProductModel(catalogProduct)),
            recommendations: recommendations.map(catalogProduct => new CatalogProductModel(catalogProduct)),
        });
    }, [catalogProduct, substitutes, recommendations, store])

    const tabs = useMemo(() => getTabsItems(store.catalogProduct), [store.catalogProduct]);

    const { isLoading: catalogProductOffersIsLoading } = useCatalogProductOffers({
        withStore: true,
        getCatalogProductId: () => [store.catalogProduct.id]
    }, (offers) => {
        if (offers[store.catalogProduct.id]) {
            store.catalogProduct.update({
                catalogProductOffers: offers[store.catalogProduct.id]
            })
        }
    }, [store.catalogProduct.id]);

    useEffect(() => {
        CatalogModule.addView(store.catalogProduct.id);
    }, [store.catalogProduct.id]);

    useEffect(() => {
        if (tabs.length > 0 && tabs[0]?.id) {
            store.set('tab', tabs[0].id);
        }
    }, [tabs, store]);

    const breadcrumbs = [
        ...useCatalogBreadcrumbs(store.catalogProduct.catalogCategoryId),
        BREADCRUMBS.PRODUCT(catalogProduct.name)
    ];

    return (
        <Layout>
            <UiSeo
                title={store.catalogProduct.name}
                description={store.catalogProduct.substances.map(substance => substance.name).join(', ')}
                keywords={store.catalogProduct.substances.map(substance => substance.name).join(', ')}
            />
            <UiWrap>
                <UiBreadcrumbs items={breadcrumbs}/>
                <UiCard className="p-product">
                    <UiGrid className='p-product__main' media={{
                        [MEDIA_POINTS.IS_360]: { columns: 1, gap: 32 },
                        [MEDIA_POINTS.IS_768]: { columns: '245px 1fr', gap: 40 },
                        [MEDIA_POINTS.IS_1024]: { columns: '339px 1fr', gap: 40 },
                        [MEDIA_POINTS.IS_1366]: { columns: '482px 1fr', gap: 40 },
                    }}>
                        <div className='p-product-slider'>
                            <PProductSlider
                                items={
                                    store.catalogProduct.detailImagesThumbnails.length > 0
                                        ? store.catalogProduct.detailImagesThumbnails
                                        : [store.catalogProduct.previewImageThumbnail]
                                }
                            />
                            <div className="p-product__badges">
                                {store.catalogProduct.badges.map(badge => (
                                    <div
                                        key={badge.id}
                                        className='p-product__badge'
                                        style={{ background: badge.color }}
                                    >
                                        {badge.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-product-info">
                            <LayoutTitle value={store.catalogProduct.name}/>
                            <div className="p-product-info__inner">
                                <div className="p-product-info__properties">
                                    {store.catalogProduct.barcodes?.length > 0 && (
                                        <>
                                            <div className="p-product-info-property__label">Штрих-код:</div>
                                            <div className="p-product-info-property__value">
                                                {store.catalogProduct.barcodes.join(', ')}
                                            </div>
                                        </>
                                    )}
                                    {store.catalogProduct.manufacturer && (
                                        <>
                                            <div className="p-product-info-property__label">Производитель:</div>
                                            <div className="p-product-info-property__value">
                                                {store.catalogProduct.manufacturer.name}
                                            </div>
                                        </>
                                    )}
                                    {store.catalogProduct.substances.length > 0 && (
                                        <>
                                            <div className="p-product-info-property__label">
                                                Действующее вещество:
                                            </div>
                                            <div className="p-product-info-property__value">
                                                {store.catalogProduct.substances.map(substance => substance.name).join(', ')}
                                            </div>
                                        </>
                                    )}
                                    {store.catalogProduct.expirationTime && (
                                        <>
                                            <div className="p-product-info-property__label">Срок годности:</div>
                                            <div className="p-product-info-property__value">
                                                {store.catalogProduct.expirationTime}
                                            </div>
                                        </>
                                    )}
                                    {store.catalogProduct.releaseForm && (
                                        <>
                                            <div className="p-product-info-property__label">Форма выпуска:</div>
                                            <div className="p-product-info-property__value">
                                                {store.catalogProduct.releaseForm}
                                            </div>
                                        </>
                                    )}
                                    {store.catalogProduct.prescriptionTypeId && (
                                        <>
                                            <div className="p-product-info-property__label">
                                                Условия отпуска из аптеки:
                                            </div>
                                            <div className="p-product-info-property__value">
                                                {store.catalogProduct.prescriptionType.name}
                                            </div>
                                        </>
                                    )}
                                    {store.catalogProduct.storageConditions && (
                                        <>
                                            <div className="p-product-info-property__label">Условия хранения:</div>
                                            <div className="p-product-info-property__value">
                                                {store.catalogProduct.storageConditions}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="p-product-info__footer">
                                    {!catalogProductOffersIsLoading && (
                                        <>
                                            {!!store.catalogProduct.catalogProductOffers.length && (
                                                <div className="p-product-price">
                                                    <div className="p-product-price__current">
                                                        от {store.catalogProduct.priceFrom} ₽
                                                    </div>
                                                </div>
                                            )}
                                            <div className="p-product__actions">
                                                <CAddToCart
                                                    withQuantity
                                                    isAvailable={!!store.catalogProduct.catalogProductOffers?.length}
                                                    catalogProductId={store.catalogProduct.id}
                                                />
                                                <div
                                                    className={classnames('p-product__favorite', {
                                                        'p-product__favorite--active': CatalogModule.isFavorite(store.catalogProduct.id)
                                                    })}
                                                    onClick={() => CatalogModule.toggleFavorite(store.catalogProduct.id)}
                                                >
                                                    <UiIcon
                                                        size={24}
                                                        name={'heart'}
                                                        color={[COLORS.PRIMARY, COLORS.WHITE]}
                                                    />
                                                </div>
                                                <div className="p-product__note">
                                                    Точная цена зависит от выбранной аптеки
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="p-product__share">
                                    <UiSocialShare/>
                                </div>
                            </div>
                        </div>
                    </UiGrid>
                    <div className="p-product-content">
                        <div className="p-product-content__header">
                            <UiTabs
                                items={getTabsItems(store.catalogProduct)}
                                value={store.tab}
                                name={'tab'}
                                onChange={store.handleChange}
                            />
                        </div>
                        <div className="p-product-content__main">
                            {store.tab === 'description' && (
                                <LayoutSection title='Описание'>
                                    <UiTypography><UiHtml value={store.catalogProduct.description}/></UiTypography>
                                </LayoutSection>
                            )}
                            {store.tab === 'instructionFull' && (
                                <LayoutSection title='Полная инструкция'>
                                    <UiTypography>
                                        <UiHtml value={store.catalogProduct.instructionFull}/>
                                    </UiTypography>
                                </LayoutSection>
                            )}
                            {store.tab === 'composition' && (
                                <LayoutSection title='Состав'>
                                    <UiTypography><UiHtml value={store.catalogProduct.composition}/></UiTypography>
                                </LayoutSection>
                            )}
                            {store.tab === 'indications' && (
                                <LayoutSection title='Показания'>
                                    <UiTypography><UiHtml value={store.catalogProduct.indications}/></UiTypography>
                                </LayoutSection>
                            )}
                            {store.tab === 'contraindications' && (
                                <LayoutSection title='Противопоказания'>
                                    <UiTypography>
                                        <UiHtml value={store.catalogProduct.contraindications}/>
                                    </UiTypography>
                                </LayoutSection>
                            )}
                            {store.tab === 'instructionSpecial' && (
                                <LayoutSection title='Специальные указания'>
                                    <UiTypography>
                                        <UiHtml value={store.catalogProduct.instructionSpecial}/>
                                    </UiTypography>
                                </LayoutSection>
                            )}
                            {store.tab === 'applicationMode' && (
                                <LayoutSection title='Способ применения'>
                                    <UiTypography>
                                        <UiHtml value={store.catalogProduct.applicationMode}/>
                                    </UiTypography>
                                </LayoutSection>
                            )}
                            {store.tab === 'dispensingConditions' && (
                                <LayoutSection title='Условия отпуска препарата'>
                                    <UiTypography>
                                        <UiHtml value={store.catalogProduct.dispensingConditions}/>
                                    </UiTypography>
                                </LayoutSection>
                            )}
                            {store.tab === 'sideEffects' && (
                                <LayoutSection title='Побочные действия'>
                                    <UiTypography>
                                        <UiHtml value={store.catalogProduct.sideEffects}/>
                                    </UiTypography>
                                </LayoutSection>
                            )}
                            {store.tab === 'availability' && (
                                <LayoutSection title='Наличие в аптеках'>
                                    <PProductAvailability
                                        catalogProductOffers={store.catalogProduct.catalogProductOffers}/>
                                </LayoutSection>
                            )}
                            {store.substitutes.length > 0 && (
                                <LayoutSection title='Аналоги препарата'>
                                    <CCatalogProductsSlider catalogProducts={store.substitutes}/>
                                </LayoutSection>
                            )}
                            {store.tab === 'feedbacks' && (
                                <LayoutSection title='Отзывы'>
                                    <PProductFeedbacks catalogProductId={store.catalogProduct.id}/>
                                </LayoutSection>
                            )}
                        </div>
                    </div>
                </UiCard>
                {store.recommendations.length > 0 && (
                    <LayoutSection title='Рекомендуем'>
                        <CCatalogProductsSlider catalogProducts={store.recommendations}/>
                    </LayoutSection>
                )}
                <CCatalogProductsViewed/>
            </UiWrap>
        </Layout>
    )
});

export const getServerSideProps: GetServerSideProps<PropsType> = async (context) => {
    const slug = context.query.slug as string;

    const { isSuccess, data } = await Redis.cache(
        `catalogProductsGetRequest:${slug}`,
        async () => await catalogProductsGetRequest({ slug }),
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
            application: await getApplicationData(),
            catalogProduct: data.item,
            substitutes: data.substitutes,
            recommendations: data.recommendations
        }
    }
}

export default ProductPage;
