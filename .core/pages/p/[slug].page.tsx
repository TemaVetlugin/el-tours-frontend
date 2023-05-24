import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'
import React, { useEffect } from "react";

import { Layout, LayoutTitle } from "shared/layout";
import { ApplicationDataType } from "shared/types";
import { getApplicationData, Redis } from "shared/server";
import { UiBreadcrumbs, UiCard, UiHtml, UiSeo, UiTypography, UiWrap } from "shared/uikit";
import { BootstrapModule } from "shared/modules";
import { useObservable } from "shared/hooks";
import { ContentPageModel, IContentPageModel } from "shared/models";
import { contentPagesGetRequest } from "shared/requests/api";
import { ROUTES } from "shared/contants";

import { PCustomContentSlider } from "./components/PCustomContentSlider";

import './index.scss';

type PropsType = {
    application: ApplicationDataType,
    contentPage: IContentPageModel
}

const CustomContentPage: NextPage<PropsType> = observer(({ application, contentPage }) => {
    BootstrapModule.application(application);

    const store = useObservable({
        contentPage: new ContentPageModel(contentPage)
    });

    useEffect(() => {
        store.set('contentPage', new ContentPageModel(contentPage));
    }, [store, contentPage]);

    return (
        <Layout>
            <UiSeo title={store.contentPage.name} image={store.contentPage.imageThumbnail}/>
            <UiWrap>
                <UiBreadcrumbs items={[{ name: store.contentPage.name, href: '#' }]}/>
                <LayoutTitle value={store.contentPage.name}/>
                <UiCard>
                    <UiTypography>
                        {store.contentPage.imageThumbnail && (
                            <div
                                className='p-custom-content__image'
                                style={{ backgroundImage: `url(${store.contentPage.imageThumbnail})` }}
                            />
                        )}
                        <UiHtml value={store.contentPage.content}/>
                        <PCustomContentSlider items={store.contentPage.imagesThumbnails}/>
                    </UiTypography>
                </UiCard>
            </UiWrap>
        </Layout>
    )
});

export const getServerSideProps: GetServerSideProps<PropsType> = async (context) => {
    const application = await getApplicationData();
    const slug = context.query.slug as string;
    const { isSuccess, data } = await Redis.cache(
        `contentPagesGetRequest:${slug}`,
        async () => await contentPagesGetRequest({ slug }),
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
            application,
            contentPage: data?.item || {},
        }
    }
}

export default CustomContentPage;
