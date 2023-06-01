import { observer } from "mobx-react";
import React from "react";

import { ArticleModel } from "shared/models";
import { UiArticleTile, UiGrid, UiIcon, UiLink, UiSlider } from "shared/uikit";
import { COLORS, MEDIA_POINTS, ROUTES } from "shared/contants";
import { LayoutSection } from "shared/layout";
import { useMedia } from "shared/hooks";

import './index.scss';

type PropsType = {
    articles: ArticleModel[]
}

export const PHomeArticles = observer(({ articles }: PropsType) => {
    const { is360 } = useMedia();

    return (
        <LayoutSection
            className={'p-home-articles'}
            title={'Интересно'}
            headerAside={
                <UiLink
                    href={ROUTES.ARTICLES()}
                    className={'underline-wave underline-wave--large'}
                >
                    <span>Смотреть все</span>
                    <UiIcon size={15} name={'chevronRightBold'} color={COLORS.RED}/>
                </UiLink>
            }
        >
            {is360 && (
                <div className="p-home-articles-slider">
                    <UiSlider
                        effect='slide'
                        autoPlay={5000}
                        items={articles}
                        perPage={'auto'}
                        loop={true}
                        renderItem={(article: ArticleModel) => (
                            <div
                                key={article.id}
                                className='p-home-articles-slider-slide'
                            >
                                <UiArticleTile
                                    key={article.id}
                                    name={article.name}
                                    href={ROUTES.ARTICLE(article.slug)}
                                    image={article.previewImageThumbnail}
                                />
                            </div>
                        )}
                    />
                </div>
            )}

            {!is360 && (
                <UiGrid media={{
                    [MEDIA_POINTS.IS_360]: { columns: 1, gap: 16 },
                    [MEDIA_POINTS.IS_768]: { columns: 3, gap: 16 },
                    [MEDIA_POINTS.IS_1024]: { columns: 3, gap: 16 },
                    [MEDIA_POINTS.IS_1440]: { columns: 3, gap: 20 }
                }}>
                    {articles.map(article => (
                        <UiArticleTile
                            key={article.id}
                            name={article.name}
                            href={ROUTES.ARTICLE(article.slug)}
                            image={article.previewImageThumbnail}
                        />
                    ))}
                </UiGrid>
            )}
        </LayoutSection>
    )
});
