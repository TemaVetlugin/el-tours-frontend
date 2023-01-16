import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

import { Layout } from "shared/layout";
import { ReturnType } from "shared/types";
import { getApplicationData } from "shared/server";
import { UiBoundary, UiCard, UiCheckbox, UiIcon, UiRange, UiWrap } from "shared/uikit";
import { useObservable } from "shared/hooks";
import { BootstrapModule } from "shared/modules";
import { CCatalogProductsGrid } from "shared/components";

type PropsType = {
    application: ReturnType<typeof getApplicationData>
}

const TestPage: NextPage<PropsType> = observer(({ application }) => {
    BootstrapModule.application(application);

    const store = useObservable({
        value: [20, 40]
    });

    return (
        <Layout>
            <Head>
                <title>Test</title>
            </Head>
            <UiWrap>
                <CCatalogProductsGrid catalogProducts={[]} isLoading/>
                <UiCard>
                    <UiCheckbox value={0} label='asdasd'/>
                    <UiCheckbox value={1} label='asdasd 21231'/>
                </UiCard>
                <UiIcon color='#000' size={20} name={'arrowTop'}/>
                <UiRange min={0} max={100} value={store.value} onChange={({ value }) => {
                    store.set("value", value as number[]);
                }}/>
                <UiBoundary isError onAction={() => {
                }}/>
            </UiWrap>
        </Layout>
    )
});

export const getServerSideProps: GetServerSideProps<PropsType> = async (context) => {
    return {
        props: {
            application: await getApplicationData(),
        },
    }
}

export default TestPage;
