import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

import { Layout } from "shared/layout";
import { UiEmpty, UiLink, UiSeo, UiWrap } from "shared/uikit";
import { ApplicationDataType } from "shared/types";
import { getApplicationData } from "shared/server";
import { ROUTES } from "shared/contants";
import { BootstrapModule } from "shared/modules";

import "./index.scss";

type PropsType = {
    application: ApplicationDataType
}

const Error404Page: NextPage<PropsType> = observer(({ application }) => {
    BootstrapModule.application(application);

    return (
        <Layout>
            <UiSeo title='Ничего не найдено'/>
            <UiWrap>
                <UiEmpty/>
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

export default Error404Page;
