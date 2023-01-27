import { observer } from "mobx-react";
import React from "react";

import { NewsModel } from "shared/models";
import { UiNewsTile, UiGrid, UiIcon, UiLink, UiSlider } from "shared/uikit";
import { COLORS, MEDIA_POINTS, ROUTES } from "shared/contants";
import { LayoutSection } from "shared/layout";
import { useMedia } from "shared/hooks";

import './index.scss';

type PropsType = {
    news: NewsModel[]
}

export const PHomeNews = observer(({ news }: PropsType) => {
    const { is360 } = useMedia();

    return (
        <LayoutSection
            className={'p-home-news'}
            title={'Новости'}
            headerAside={
                <UiLink
                    href={ROUTES.NEWS()}
                    className={'underline-wave underline-wave--large'}
                >
                    <span>Смотреть все</span>
                    <UiIcon size={15} name={'chevronRightBold'} color={COLORS.RED}/>
                </UiLink>
            }
        >
            {is360 && (
                <div className="p-home-news-slider">
                    <UiSlider
                        effect='slide'
                        // autoPlay={5000}
                        items={news}
                        perPage={'auto'}
                        loop={true}
                        renderItem={(newsItem: NewsModel) => (
                            <div
                                key={newsItem.id}
                                className='p-home-news-slider-slide'
                            >
                                <UiNewsTile
                                    key={newsItem.id}
                                    name={newsItem.name}
                                    href={ROUTES.NEWS_DETAIL(newsItem.slug)}
                                    image={newsItem.previewImageThumbnail}
                                    description={newsItem.description}
                                    isButton={true}
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
                    [MEDIA_POINTS.IS_1366]: { columns: 4, gap: 20 }
                }}>
                    {news.map(newsItem => (
                        <UiNewsTile
                            key={newsItem.id}
                            name={newsItem.name}
                            href={ROUTES.NEWS_DETAIL(newsItem.slug)}
                            image={newsItem.previewImageThumbnail}
                            description={newsItem.description}
                            isButton={true}
                        />
                    ))}
                </UiGrid>
            )}
        </LayoutSection>
    )
});
