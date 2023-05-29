import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'
import { useCallback, useEffect } from "react";

import { Layout, LayoutTitle } from "shared/layout";
import { ReturnType } from "shared/types";
import { getApplicationData } from "shared/server";
import { UiBoundary, UiBreadcrumbs, UiCardTile, UiGrid, UiSeo, UiWrap } from "shared/uikit";
import { useObservable } from "shared/hooks";
import { compilationsRequest } from "shared/requests/api";
import { CompilationModel } from "shared/models";
import { BREADCRUMBS, ROUTES } from "shared/contants";
import { BootstrapModule } from "shared/modules";

import './index.scss';

type PropsType = {
    application: ReturnType<typeof getApplicationData>
}

const CompilationsPage: NextPage<PropsType> = observer(({ application }) => {
    BootstrapModule.application(application);

    const store = useObservable({
        isLoading: true,
        compilations: [] as CompilationModel[]
    })
    const load = useCallback(async () => {
        store.set("isLoading", true);
        const { isSuccess, data } = await compilationsRequest();
        if (isSuccess && data) {
            store.set("compilations", data.items.map(item => new CompilationModel(item)));
        }
        store.set("isLoading", false);
    }, [store]);

    useEffect(() => {
        load();
    }, [load]);

    return (
        <Layout>
            <UiSeo title={'Подборки'}/>
            <UiWrap>
                <UiBreadcrumbs items={[BREADCRUMBS.COMPILATIONS()]}/>
                <LayoutTitle value={'Подборки'}/>
                <UiBoundary isLoading={store.isLoading}>
                    <UiGrid columns={4} gap={16}>
                        {store.compilations.map(compilation => (
                            <UiCardTile
                                key={compilation.id}
                                href={ROUTES.COMPILATION(compilation.slug)}
                                name={compilation.name}
                                image={compilation.imageThumbnail}
                            />
                        ))}
                    </UiGrid>
                </UiBoundary>
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

export default CompilationsPage;
