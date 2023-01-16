import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from "next/router";

import { Layout, LayoutTitle } from "shared/layout";
import { UiBreadcrumbs, UiPagination, UiSeo, UiWrap } from "shared/uikit";
import { MENU } from "shared/contants";
import { useObservable } from "shared/hooks";
import { PaginationModel, FeedbackModel } from "shared/models";
import { feedbackRequest } from "shared/requests/api";
import { CFeedback } from "shared/components";
import { ApplicationDataType } from "shared/types";
import { getApplicationData } from "shared/server";
import { BootstrapModule } from "shared/modules";

import "./index.scss";

type PropsType = {
    application: ApplicationDataType
}

const FeedbackPage: NextPage<PropsType> = observer(({ application }) => {
    BootstrapModule.application(application);

    const router = useRouter();
    const store = useObservable({
        isLoading: true,
        count: null as number | null,
        feedback: [] as FeedbackModel[],
        pagination: new PaginationModel()
    });

    const load = useCallback(async () => {
        store.set("isLoading", true);
        const { isSuccess, data } = await feedbackRequest({
            ...router.query
        });

        if (isSuccess && data) {
            store.set("feedback", data.items.map(item => new FeedbackModel(item)));
            store.set("pagination", new PaginationModel(data.pagination));
            store.set("count", data.count)
        }
        store.set("isLoading", false);
    }, [store, router]);

    useEffect(() => {
        load();
    }, [load])

    return (
        <Layout>
            <UiSeo title={'Отзывы'}/>
            <UiWrap>
                <UiBreadcrumbs items={[MENU.FEEDBACK()]}/>
                <LayoutTitle value='Отзывы' badge={store.count}/>
                <div className="p-feedback">
                    <div className="p-feedback__inner">
                        <div className="p-feedback__items">
                            {store.feedback.map(feedback => (
                                <div key={feedback.id} className="p-feedback__item">
                                    <CFeedback feedback={feedback}/>
                                </div>
                            ))}
                        </div>
                        <UiPagination pagination={store.pagination}/>
                    </div>
                </div>
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

export default FeedbackPage;
