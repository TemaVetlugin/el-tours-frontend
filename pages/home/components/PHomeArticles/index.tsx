import { observer } from "mobx-react";
import React from "react";

import { ArticleModel } from "shared/models";
import { UiArticleTile, UiGrid, UiLink } from "shared/uikit";
import { MEDIA_POINTS, ROUTES } from "shared/contants";
import { LayoutSection } from "shared/layout";

type PropsType = {
    articles: ArticleModel[]
}

export const PHomeArticles = observer(({ articles }: PropsType) => {
    return (
        <LayoutSection
            className={'p-home-articles'}
            title={'Полезные статьи'}
            headerAside={
                <UiLink href={ROUTES.ARTICLES()}>
                    Смотреть все ⟶
                </UiLink>
            }
        >
            <UiGrid media={{
                [MEDIA_POINTS.IS_360]: { columns: 1, gap: 20 },
                [MEDIA_POINTS.IS_768]: { columns: 3, gap: 22 },
                [MEDIA_POINTS.IS_1024]: { columns: 3, gap: 22 },
                [MEDIA_POINTS.IS_1366]: { columns: 4, gap: 22 }
            }}>
                {articles.map(article => (
                    <UiArticleTile
                        isMedium
                        key={article.id}
                        href={ROUTES.ARTICLE(article.slug)}
                        name={article.name}
                        image={article.previewImageThumbnail}
                    />
                ))}
            </UiGrid>
        </LayoutSection>
    )
});
