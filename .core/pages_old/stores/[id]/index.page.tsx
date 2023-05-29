import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";

import { Layout, LayoutTitle } from "shared/layout";
import { ReturnType } from "shared/types";
import { getApplicationData } from "shared/server";
import {
    UiBoundary,
    UiBreadcrumbs,
    UiCard,
    UiHtml,
    UiLink,
    UiMap,
    UiSeo,
    UiStickerCircle,
    UiTypography,
    UiWrap
} from "shared/uikit";
import { useObservable } from "shared/hooks";
import { StoreModel } from "shared/models";
import { storesGetRequest } from "shared/requests/api";
import { BREADCRUMBS, ROUTES } from "shared/contants";
import { CLinkButton } from "shared/components";
import { BootstrapModule } from "shared/modules";

import { PStoreSlider } from "./components/PStoreSlider";

import './index.scss';

type PropsType = {
    application: ReturnType<typeof getApplicationData>
}

const StorePage: NextPage<PropsType> = observer(({ application }) => {
    BootstrapModule.application(application);

    const router = useRouter();
    const { id } = router.query;

    const store = useObservable({
        isLoading: true,
        isSuccess: false,
        store: null as StoreModel | null,
    });

    const load = useCallback(async () => {
        store.set("isLoading", true);
        if (id) {
            const { isSuccess, data } = await storesGetRequest({ id: +id });
            if (isSuccess && data) {
                store.set("store", new StoreModel(data.item))
            }
            store.set("isSuccess", isSuccess && !!data);
        }
        store.set("isLoading", false);
    }, [store, id]);

    useEffect(() => {
        load()
    }, [load]);

    return (
        <Layout>
            <UiSeo title={'Аптеки'}/>
            <UiWrap>
                <UiBreadcrumbs items={[BREADCRUMBS.STORES()]}/>
                <LayoutTitle value='Аптеки'/>
                <UiCard className='p-store'>
                    <UiBoundary isLoading={store.isLoading} isError={!store.isSuccess} onAction={load}>
                        <div className="p-store__map">
                            {store.store && (
                                <UiMap
                                    location={[store.store.latitude, store.store.longitude]}
                                    zoom={13}
                                    stores={{ items: [store.store] }}
                                />
                            )}
                        </div>
                        <div className="p-store__title">{store.store?.name}</div>
                        <div className="p-store__contacts">
                            {store.store?.worktime && (
                                <div className='p-store__contact'>
                                    <UiStickerCircle name='clock' size={60} stickerSize={24}/>
                                    <span>{store.store.worktime}</span>
                                </div>
                            )}
                            {store.store?.phone && (
                                <div className='p-store__contact'>
                                    <UiStickerCircle name='phone' size={60} stickerSize={24}/>
                                    <UiLink href={`tel:${store.store.phone}`}>{store.store.phone}</UiLink>
                                </div>
                            )}
                            {store.store?.email && (
                                <div className='p-store__contact'>
                                    <UiStickerCircle name='mail' size={60} stickerSize={24}/>
                                    <UiLink href={`mailto:${store.store.email}`}>{store.store.email}</UiLink>
                                </div>
                            )}
                        </div>
                        <div className="p-store__body">
                            {(store.store?.imagesThumbnails && store.store.imagesThumbnails.length > 0) && (
                                <PStoreSlider items={store.store.imagesThumbnails}/>
                            )}
                            <UiTypography className='p-store__description'>
                                <UiHtml value={store.store?.description}/>
                            </UiTypography>
                        </div>
                        <CLinkButton href={ROUTES.STORES()} label='К списку аптек'/>
                    </UiBoundary>
                </UiCard>
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

export default StorePage;
