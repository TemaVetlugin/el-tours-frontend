import { observer } from "mobx-react";
import React from "react";

import { FeedbackModel } from "shared/models";
import { UiGrid, UiLink } from "shared/uikit";
import { MEDIA_POINTS, ROUTES } from "shared/contants";
import { LayoutSection } from "shared/layout";
import { CFeedback } from "shared/components";

type PropsType = {
    reviews: FeedbackModel[]
}

export const PHomeFeedbacks = observer(({ reviews }: PropsType) => {
    return (
        <LayoutSection
            title={'Отзывы'}
            headerAside={
                <UiLink href={ROUTES.FEEDBACK()}>
                    Смотреть все ⟶
                </UiLink>
            }
        >
            <UiGrid media={{
                [MEDIA_POINTS.IS_360]: { columns: 1, gap: 20 },
                [MEDIA_POINTS.IS_768]: { columns: 2, gap: 21 },
                [MEDIA_POINTS.IS_1024]: { columns: 3, gap: 21 },
                [MEDIA_POINTS.IS_1440]: { columns: 3, gap: 10 }
            }}>
                {reviews.map(review => (
                    <CFeedback key={review.id} feedback={review}/>
                ))}
            </UiGrid>
        </LayoutSection>
    )
});
