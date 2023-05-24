import React from "react";
import { observer } from "mobx-react";

import { UiContentResource } from "shared/uikit";
import { LayoutSection } from "shared/layout";

import image from "./assets/image.svg";
import background from "./assets/background.svg";

import './index.scss';

export const PHomeDiscountCards = observer(() => {
    return (
        <UiContentResource
            name={'home.discount-cards'}
            render={(contentResource) => (
                <LayoutSection>
                    <div
                        className="p-home-discount-cards"
                        style={{ backgroundImage: `url("${contentResource.image1 || background.src}")` }}
                    >
                        <div
                            className="p-home-discount-cards__image"
                            style={{ backgroundImage: `url("${contentResource.image1 || image.src}")` }}
                        />
                        <div className="p-home-discount-cards__inner">
                            <div className="p-home-discount-cards__title">{contentResource.value1}</div>
                        </div>
                    </div>
                </LayoutSection>
            )}
        />
    )
});
