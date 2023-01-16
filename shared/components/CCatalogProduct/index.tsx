import React from "react";
import { observer } from "mobx-react";

import { CatalogProductModel } from "shared/models";
import { COLORS, ROUTES } from "shared/contants";
import { UiIcon, UiLink, UiLoading } from "shared/uikit";
import { CAddToCart } from "shared/components";
import { toCurrency } from "shared/utilities";
import { CatalogModule } from "shared/modules";
import { useIsAuthorized } from "shared/hooks";

import './index.scss';

type PropsType = {
    catalogProduct: CatalogProductModel,
    isLoading?: boolean
}

export const CCatalogProduct = observer(({ catalogProduct, isLoading = false }: PropsType) => {
    const isAuthorized = useIsAuthorized();

    const handleFavorite = () => {
        if (!isAuthorized) {
            window.location.hash = '#login';
            return;
        }
        CatalogModule.toggleFavorite(catalogProduct.id)
    }

    return (
        <div className="c-catalog-product">
            {!!catalogProduct.badges.length && (
                <div className="c-catalog-product__badges">
                    {catalogProduct.badges.map(badge => (
                        <div
                            key={badge.id}
                            className="c-catalog-product__badge"
                            style={{
                                backgroundColor: badge.color
                            }}
                        >
                            {badge.name}
                        </div>
                    ))}
                </div>
            )}
            <UiLink href={ROUTES.PRODUCT(catalogProduct.slug)} className="c-catalog-product__preview">
                <div
                    className="c-catalog-product__image"
                    style={{ backgroundImage: `url(${catalogProduct.previewImageThumbnail})` }}
                />
            </UiLink>
            <div className="c-catalog-product-price">
                <div className="c-catalog-product-price__current">
                    { catalogProduct.priceFrom
                        ? toCurrency(catalogProduct.priceFrom, 'от ')
                        :(<>&nbsp;</>)
                    }
                </div>
            </div>
            <UiLink href={ROUTES.PRODUCT(catalogProduct.slug)} className="c-catalog-product__name">
                {catalogProduct.name}
            </UiLink>
            <div className="c-catalog-product__description">
                {catalogProduct.releaseForm}
            </div>
            <div className="c-catalog-product__footer">
                <UiLoading isLoading={isLoading}>
                    <CAddToCart
                        catalogProductId={catalogProduct.id}
                        isAvailable={!!catalogProduct.catalogProductOffers.length}
                        colors={{
                            button: [COLORS.TRANSPARENT, COLORS.PRIMARY],
                            label: [COLORS.PRIMARY, COLORS.WHITE],
                            border: [COLORS.PRIMARY, COLORS.PRIMARY]
                        }}
                    />
                    <div className="c-catalog-product__favorite" onClick={handleFavorite}>
                        <UiIcon
                            size={32}
                            name={'heart'}
                            color={CatalogModule.isFavorite(catalogProduct.id) ? [COLORS.SECONDARY, COLORS.SECONDARY] : COLORS.GRAY_DARK}
                        />
                    </div>
                </UiLoading>
            </div>
        </div>
    )
})
