import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'

import { Layout, LayoutTitle } from "shared/layout";
import { UiAccordion, UiBoundary, UiBreadcrumbs, UiGrid, UiSeo, UiWrap } from "shared/uikit";
import { MEDIA_POINTS, MENU } from "shared/contants";
import { ApplicationDataType } from "shared/types";
import { BootstrapModule } from "shared/modules";
import { getApplicationData } from "shared/server";
import { useObservable } from "shared/hooks";
import { FaqModel } from "shared/models";
import { faqRequest } from "shared/requests/api";

import "./index.scss";

type PropsType = {
    application: ApplicationDataType
}

const FaqPage: NextPage<PropsType> = observer(({ application }) => {
    BootstrapModule.application(application)

    const store = useObservable({
        isLoading: true,
        isSuccess: true,
        faq: [] as FaqModel[]
    });

    const load = useCallback(async () => {
        store.set("isLoading", true);
        const { isSuccess, data } = await faqRequest()
        if (isSuccess && data) {
            store.set("faq", data.items.map(faq => new FaqModel(faq)));
        }

        store.set("isSuccess", isSuccess);
        store.set("isLoading", false);
    }, [store]);

    useEffect(() => {
        load()
    }, [load]);

    return (
        <Layout>
            <UiSeo title={'Вопрос-ответ'}/>
            <UiWrap>
                <UiBreadcrumbs items={[MENU.FAQ()]}/>
                <LayoutTitle value='Вопрос-ответ'/>
                <UiBoundary isLoading={store.isLoading} isError={!store.isSuccess} onAction={load}>
                    <div className="p-faq">
                        <UiGrid
                            columns={1}
                            media={{
                                [MEDIA_POINTS.IS_360]: { gap: 8 },
                                [MEDIA_POINTS.IS_768]: { gap: 20 },
                            }}
                        >
                            {store.faq.map(item => (
                                <UiAccordion key={item.id} title={item.name} description={item.description}/>
                            ))}
                        </UiGrid>
                    </div>
                </UiBoundary>
            </UiWrap>
        </Layout>
    )
});

export const getServerSideProps: GetServerSideProps<PropsType> = async () => {
    return {
        props: {
            application: await getApplicationData(),
        }
    }
}
export default FaqPage;
