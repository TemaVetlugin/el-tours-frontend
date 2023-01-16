import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";

import { useIsAuthorized, useIsInitialized } from "shared/hooks";
import { UiLoading } from "shared/uikit";
import { ROUTES } from "shared/contants";
import { Layout } from "shared/layout";

import './index.scss';
import { ApplicationDataType } from "shared/types";
import { BootstrapModule } from "shared/modules";

type PropsType = {
    Page?: any,
    application?: ApplicationDataType
}

export const HocRequireAuthorize = observer(({ Page, application, ...props }: PropsType) => {
    if (application) {
        BootstrapModule.application(application)
    }
    const router = useRouter();
    const isAuthorized = useIsAuthorized();
    const isInitialized = useIsInitialized();

    useEffect(() => {
        if (isInitialized && !isAuthorized) {
            router.push(ROUTES.HOME() + '#login');
        }
    }, [isAuthorized, isInitialized, router]);

    if (!isInitialized || !isAuthorized) {
        return (
            <Layout>
                <div className="hoc-required-authorize">
                    <div className="hoc-required-authorize__loading">
                        <UiLoading style={{ height: 20 }}/>
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <Page {...props}/>
    );
})


export const withRequireAuthorize = (Page: (props: any) => JSX.Element) => {
    return (props: any) => (
        <HocRequireAuthorize Page={Page} {...props}/>
    )
}
