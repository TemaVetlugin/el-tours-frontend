'use client';

import React from "react";
import {observer} from "mobx-react-lite";
import {useAsyncEffect, useCity, useRouter, useSearchParams, useStore} from "shared/hooks";
import {PaginationModel, WorkerModel} from "shared/models";
import {workerQuery} from "shared/queries/main";
import {VmWorker} from "shared/viewmodels";
import {UiDataBoundary, UiGrid, UiPage, UiSlider} from "shared/ui";

import './page.scss';
import {LayoutHeader} from "shared/layout";
import {LayoutHeaderSearch} from "./components/PBlogHeaderSearch";
import {ROUTES} from "shared/contants";
import classnames from "classnames";
import {toJS} from "mobx";


export const Client = observer(() => {
    const city = useCity();
    const router = useRouter()
    const store = useStore({
        workers: [] as WorkerModel[],
        renderWorkers1: [] as WorkerModel[],
        renderWorkers2: [] as WorkerModel[],
        renderWorkers3: [] as WorkerModel[],
        renderWorkers4: [] as WorkerModel[],
        pagination: new PaginationModel(),
        isLoading: true,
        isShallowLoading: true,
        isLightbox: false,
        lightboxIndex: 0,
        activeSlide: 0,
    });
    const searchParams = useSearchParams({page: 1, tagId: null as null | number})

    const media = [
        {name: 'FIRST'},
        {name: 'worker'},
        {name: 'worker'},
        {name: 'worker'},
        {name: 'Наталья'},
        {name: 'worker'},
        {name: 'worker'},
        {name: 'worker'},
        {name: 'LAST'},
        // и т.д.
    ];

    useAsyncEffect(async () => {
        store.set("isShallowLoading", true);
        const {isSuccess, data} = await workerQuery({
            page: searchParams.page,
        });
        if (isSuccess && data) {
            store.pagination.update(data.pagination);
            store.set("workers", data.items.map(item => new WorkerModel(item)));
            store.workers.forEach(worker => {
                worker.category === 1 && store.renderWorkers1.push(worker);
                worker.category === 2 && store.renderWorkers2.push(worker);
                worker.category === 3 && store.renderWorkers3.push(worker);
                worker.category === 4 && store.renderWorkers4.push(worker);
            });
        }

        store.set("isLoading", false);
        store.set("isShallowLoading", false);
    }, [searchParams.page, city, searchParams.tagId]);

    return (
        <UiPage className="team">
            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header
                items={[ROUTES.ARTICLES()]}
                title={'Наша команда'}
                subtitle={'Мы создаем лучший в мире сервис для путешествий!'}

            />

            {store.renderWorkers1&&
                <UiPage.Wrap className="team-group">
                    <h2 className="team__title">Руководители офисов</h2>
                    <span className="team__subtitle">Основатели проекта el-tours.ru, которые верят в него и вкладывают душу</span>

                    <UiDataBoundary isLoading={store.isLoading} withShallow>
                        {store.renderWorkers1.length<=4 &&
                            <UiGrid columns={4} gap={5}>
                                {store.renderWorkers1.map((group1) => <VmWorker key={group1.id} item={group1}/>)}
                            </UiGrid>
                        }
                        {store.renderWorkers1.length>4&&
                            <div className="team-media">
                                <UiSlider
                                    className={'team-media-slider'}
                                    slideClassName={'team-media-slide'}
                                    perGroup={1}
                                    perPage={"auto"}
                                    gap={5}
                                    loop={true}
                                    items={store.renderWorkers1}
                                    renderItem={(item, _, index) => (
                                        <div
                                            className={classnames('team-media-slide__inner', {
                                                'team-media-slide__inner--active': index === store.activeSlide
                                            })}
                                        >
                                            <div><VmWorker item={item}/></div>

                                        </div>
                                    )}

                                />
                            </div>
                        }
                    </UiDataBoundary>
                    <UiPage.Pagination pagination={store.pagination}/>
                </UiPage.Wrap>
            }

            {store.renderWorkers2&&
                <UiPage.Wrap className="team-group">
                    <h2 className="team__title">Руководители офисов</h2>
                    <span className="team__subtitle">Основатели проекта el-tours.ru, которые верят в него и вкладывают душу</span>

                    <UiDataBoundary isLoading={store.isLoading} withShallow>
                        {store.renderWorkers1.length<=4 &&
                            <UiGrid columns={4} gap={5}>
                                {store.renderWorkers1.map((group1) => <VmWorker key={group1.id} item={group1}/>)}
                            </UiGrid>
                        }
                        {store.renderWorkers1.length>4&&
                            <div className="team-media">
                                <UiSlider
                                    className={'team-media-slider'}
                                    slideClassName={'team-media-slide'}
                                    perGroup={1}
                                    perPage={"auto"}
                                    gap={5}
                                    loop={true}
                                    items={store.renderWorkers1}
                                    renderItem={(item, _, index) => (
                                        <div
                                            className={classnames('team-media-slide__inner', {
                                                'team-media-slide__inner--active': index === store.activeSlide
                                            })}
                                        >
                                            <div><VmWorker item={item}/></div>

                                        </div>
                                    )}

                                />
                            </div>
                        }
                    </UiDataBoundary>
                    <UiPage.Pagination pagination={store.pagination}/>
                </UiPage.Wrap>
            }

            {store.renderWorkers3&&
                <UiPage.Wrap className="team-group">
                    <h2 className="team__title">Руководители офисов</h2>
                    <span className="team__subtitle">Основатели проекта el-tours.ru, которые верят в него и вкладывают душу</span>

                    <UiDataBoundary isLoading={store.isLoading} withShallow>
                        {store.renderWorkers1.length<=4 &&
                            <UiGrid columns={4} gap={5}>
                                {store.renderWorkers1.map((group1) => <VmWorker key={group1.id} item={group1}/>)}
                            </UiGrid>
                        }
                        {store.renderWorkers1.length>4&&
                            <div className="team-media">
                                <UiSlider
                                    className={'team-media-slider'}
                                    slideClassName={'team-media-slide'}
                                    perGroup={1}
                                    perPage={"auto"}
                                    gap={5}
                                    loop={true}
                                    items={store.renderWorkers1}
                                    renderItem={(item, _, index) => (
                                        <div
                                            className={classnames('team-media-slide__inner', {
                                                'team-media-slide__inner--active': index === store.activeSlide
                                            })}
                                        >
                                            <div><VmWorker item={item}/></div>

                                        </div>
                                    )}

                                />
                            </div>
                        }
                    </UiDataBoundary>
                    <UiPage.Pagination pagination={store.pagination}/>
                </UiPage.Wrap>
            }

            {store.renderWorkers4&&
                <UiPage.Wrap className="team-group">
                    <h2 className="team__title">Руководители офисов</h2>
                    <span className="team__subtitle">Основатели проекта el-tours.ru, которые верят в него и вкладывают душу</span>

                    <UiDataBoundary isLoading={store.isLoading} withShallow>
                        {store.renderWorkers1.length<=4 &&
                            <UiGrid columns={4} gap={5}>
                                {store.renderWorkers1.map((group1) => <VmWorker key={group1.id} item={group1}/>)}
                            </UiGrid>
                        }
                        {store.renderWorkers1.length>4&&
                            <div className="team-media">
                                <UiSlider
                                    className={'team-media-slider'}
                                    slideClassName={'team-media-slide'}
                                    perGroup={1}
                                    perPage={"auto"}
                                    gap={5}
                                    loop={true}
                                    items={store.renderWorkers1}
                                    renderItem={(item, _, index) => (
                                        <div
                                            className={classnames('team-media-slide__inner', {
                                                'team-media-slide__inner--active': index === store.activeSlide
                                            })}
                                        >
                                            <div><VmWorker item={item}/></div>

                                        </div>
                                    )}

                                />
                            </div>
                        }
                    </UiDataBoundary>
                    <UiPage.Pagination pagination={store.pagination}/>
                </UiPage.Wrap>
            }
        </UiPage>
    )
});
