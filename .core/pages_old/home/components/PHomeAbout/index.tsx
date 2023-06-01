import { observer } from "mobx-react";
import React from "react";

import { UiContentResource, UiGrid } from "shared/uikit";
import { LayoutSection } from "shared/layout";
import { MEDIA_POINTS } from "shared/contants";

import image from './assets/image.svg';

import './index.scss';

export const PHomeAbout = observer(() => {
    return (
        <UiContentResource
            name={'home.about'}
            render={(contentResource) => (
                <LayoutSection>
                    <div className="p-home-about">
                        <UiGrid media={{
                            [MEDIA_POINTS.IS_360]: {columns: 1, gap: 0},
                            [MEDIA_POINTS.IS_768]: {columns: 1, gap: 0},
                            [MEDIA_POINTS.IS_1024]: {columns: '1fr 420px', gap: 40},
                            [MEDIA_POINTS.IS_1440]: {columns: '1fr 520px', gap: 80},
                        }}>
                            <div
                                className="p-home-about__image"
                                style={{ backgroundImage: `url("${contentResource.image1 || image.src}")` }}
                            />
                            <div className="p-home-about__content">
                                <div className="p-home-about__title">
                                    {contentResource.value1}
                                </div>
                                <div className="p-home-about__text">
                                    {contentResource.value2}
                                </div>
                            </div>
                        </UiGrid>
                    </div>
                </LayoutSection>
            )}
        />
    )
});
