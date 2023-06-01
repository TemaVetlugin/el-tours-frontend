import { observer } from "mobx-react";
import React from "react";

import { HomeWhyTrustModel } from "shared/models";
import { UiGrid } from "shared/uikit";
import { MEDIA_POINTS } from "shared/contants";
import { LayoutSection } from "shared/layout";

import './index.scss';

type PropsType = {
    homeWhyTrusts: HomeWhyTrustModel[]
}

export const PHomeWhyTrusts = observer(({ homeWhyTrusts }: PropsType) => {
    return (
        <LayoutSection
            title={'Почему покупатели доверяют нам?'}
            style={{title: {textAlign: "center", display: "block"}}}
        >
            <UiGrid media={{
                [MEDIA_POINTS.IS_360]: { columns: 1, gap: 8 },
                [MEDIA_POINTS.IS_768]: { columns: 2, gap: 24 },
                [MEDIA_POINTS.IS_1024]: { columns: 4, gap: 24 },
                [MEDIA_POINTS.IS_1440]: { columns: 4, gap: 24 }
            }}>
                {homeWhyTrusts.map(homeWhyTrust => (
                    <div
                        key={homeWhyTrust.id}
                        className={'p-home-why-trust-item'}
                    >
                        <div className="p-home-why-trust-item__icon">
                            <div
                                className="p-home-why-trust-item__image"
                                style={{backgroundImage: `url(${homeWhyTrust.imageThumbnail})`}}
                            />
                        </div>
                        <div className="p-home-why-trust-item__inner">
                            <div className="p-home-why-trust-item__title">{homeWhyTrust.name}</div>
                            <div className="p-home-why-trust-item__description">{homeWhyTrust.description}</div>
                        </div>
                    </div>
                ))}
            </UiGrid>
        </LayoutSection>
    )
});
