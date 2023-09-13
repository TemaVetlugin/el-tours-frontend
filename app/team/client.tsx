'use client';

import React from "react";
import {observer} from "mobx-react-lite";
import {useAsyncEffect, useCity, useRouter, useSearchParams, useStore} from "shared/hooks";
import {PaginationModel, WorkerModel} from "shared/models";
import {workerQuery} from "shared/queries/main";
import {VmWorker} from "shared/viewmodels";
import {UiDataBoundary, UiGrid, UiIcon, UiPage, UiSlider} from "shared/ui";

import './page.scss';
import {LayoutHeader} from "shared/layout";
import {ROUTES} from "shared/contants";
import classnames from "classnames";
import {toJS} from "mobx";
import {auto} from "@popperjs/core";
import {LayoutHeaderSearch} from "shared/layout/LayoutHeaderSearch";


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
    const duplicatedWorkers1 = [...store.renderWorkers1, ...store.renderWorkers1, ...store.renderWorkers1];
    const duplicatedWorkers2 = [...store.renderWorkers2, ...store.renderWorkers2, ...store.renderWorkers2];
    const duplicatedWorkers3 = [...store.renderWorkers3, ...store.renderWorkers3, ...store.renderWorkers3];
    const duplicatedWorkers4 = [...store.renderWorkers4, ...store.renderWorkers4, ...store.renderWorkers4];

    return (
        <UiPage className="p-team">
            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header
                items={[ROUTES.ARTICLES()]}
                title={'Наша команда'}
                subtitle={'Мы создаем лучший в мире сервис для путешествий!'}

            />

            {store.renderWorkers1.length>0&&
                <UiPage.Wrap className="p-team-group">
                    <h2 className="p-team__title">Руководство</h2>
                    <span className="p-team__subtitle">Основатели проекта el-tours.ru, которые верят в него и вкладывают душу</span>

                    <UiDataBoundary isLoading={store.isLoading} withShallow>
                        {store.renderWorkers1.length<=4 &&
                            <UiGrid columns={4} gap={5}>
                                {store.renderWorkers1.map((group1) => <VmWorker key={group1.id} item={group1}/>)}
                            </UiGrid>
                        }
                        {store.renderWorkers1.length>4&&
                            <div className="p-team-media">
                                {
                                }

                                    <UiSlider
                                        className={'p-team-media-slider'}
                                        slideClassName={'p-team-media-slide'}
                                        perGroup={1}
                                        perPage={'auto'}
                                        loop={true}
                                        gap={6}
                                        items={duplicatedWorkers1}
                                        slide={(item, index) => (
                                            <UiSlider.Slide
                                                render={() => (
                                                    <div
                                                        className={classnames('p-team-media-slide__inner', {
                                                            'p-team-media-slide__inner--active': index === store.activeSlide
                                                        })}
                                                    >
                                                        <div><VmWorker item={item}/></div>

                                                    </div>
                                                )}
                                            />
                                        )}
                                        navigation={(navigation) => {
                                            if (navigation.pages() < 6) {
                                                return null;
                                            }
                                            return (
                                                <>
                                                    <div className='p-team-media-slider__control'>
                                                        <div className="p-team-media-slider__arrow" onClick={navigation.prev}>
                                                            <UiIcon size={16} name={'chevronLeft'}/>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className='p-team-media-slider__control p-team-media-slider__control--next'>
                                                        <div className="p-team-media-slider__arrow" onClick={navigation.next}>
                                                            <UiIcon size={16} name={'chevronRight'}/>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        }}
                                    />
                            </div>
                        }
                    </UiDataBoundary>
                    <UiPage.Pagination pagination={store.pagination}/>
                </UiPage.Wrap>
            }

            {store.renderWorkers2.length>0&&
                <UiPage.Wrap className="p-team-group">
                    <h2 className="p-team__title">Руководители офисов</h2>
                    <span className="p-team__subtitle">Основатели проекта el-tours.ru, которые верят в него и вкладывают душу</span>

                    <UiDataBoundary isLoading={store.isLoading} withShallow>
                        {store.renderWorkers2.length<=4 &&
                            <UiGrid columns={4} gap={5}>
                                {store.renderWorkers2.map((group1) => <VmWorker key={group1.id} item={group1}/>)}
                            </UiGrid>
                        }
                        {store.renderWorkers2.length>4&&
                            <div className="p-team-media">
                                {store.renderWorkers2.length > 0 && (
                                    <UiSlider
                                        className={'p-team-media-slider'}
                                        slideClassName={'p-team-media-slide'}
                                        perGroup={1}
                                        perPage={'auto'}
                                        loop={true}
                                        gap={5}
                                        items={duplicatedWorkers2}
                                        slide={(item, index) => (
                                            <UiSlider.Slide
                                                render={() => (
                                                    <div
                                                        className={classnames('p-team-media-slide__inner', {
                                                            'p-team-media-slide__inner--active': index === store.activeSlide
                                                        })}
                                                    >
                                                        <div><VmWorker item={item}/></div>

                                                    </div>
                                                )}
                                            />
                                        )}



                                    />
                                )}
                            </div>
                        }


                    </UiDataBoundary>
                    <UiPage.Pagination pagination={store.pagination}/>
                </UiPage.Wrap>
            }

            {store.renderWorkers3.length>0&&
                <UiPage.Wrap className="p-team-group">
                    <h2 className="p-team__title">Руководители офисов</h2>
                    <span className="p-team__subtitle">Основатели проекта el-tours.ru, которые верят в него и вкладывают душу</span>

                    <UiDataBoundary isLoading={store.isLoading} withShallow>
                        {store.renderWorkers3.length<=4 &&
                            <UiGrid columns={4} gap={5}>
                                {store.renderWorkers3.map((group1) => <VmWorker key={group1.id} item={group1}/>)}
                            </UiGrid>
                        }
                        {store.renderWorkers3.length>4&&
                            <div className="p-team-media">
                                {store.renderWorkers3.length > 0 && (
                                    <UiSlider
                                        className={'p-team-media-slider'}
                                        slideClassName={'p-team-media-slide'}
                                        perGroup={1}
                                        perPage={'auto'}
                                        loop={true}
                                        gap={6}
                                        items={duplicatedWorkers3}
                                        slide={(item, index) => (
                                            <UiSlider.Slide
                                                render={() => (
                                                    <div
                                                        className={classnames('p-team-media-slide__inner', {
                                                            'p-team-media-slide__inner--active': index === store.activeSlide
                                                        })}
                                                    >
                                                        <div><VmWorker item={item}/></div>

                                                    </div>
                                                )}
                                            />
                                        )}
                                        navigation={(navigation) => {
                                            if (navigation.pages() < 6) {
                                                return null;
                                            }
                                            return (
                                                <>
                                                    <div className='p-team-media-slider__control'>
                                                        <div className="p-team-media-slider__arrow" onClick={navigation.prev}>
                                                            <UiIcon size={16} name={'chevronLeft'}/>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className='p-team-media-slider__control p-team-media-slider__control--next'>
                                                        <div className="p-team-media-slider__arrow" onClick={navigation.next}>
                                                            <UiIcon size={16} name={'chevronRight'}/>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        }}
                                    />
                                )}
                            </div>
                        }
                    </UiDataBoundary>
                    <UiPage.Pagination pagination={store.pagination}/>
                </UiPage.Wrap>
            }

            {store.renderWorkers4.length>0&&
                <UiPage.Wrap className="p-team-group">
                    <h2 className="p-team__title">Руководители офисов</h2>
                    <span className="p-team__subtitle">Основатели проекта el-tours.ru, которые верят в него и вкладывают душу</span>

                    <UiDataBoundary isLoading={store.isLoading} withShallow>
                        {store.renderWorkers4.length<=4 &&
                            <UiGrid columns={4} gap={5}>
                                {store.renderWorkers4.map((group1) => <VmWorker key={group1.id} item={group1}/>)}
                            </UiGrid>
                        }
                        {store.renderWorkers4.length>4&&
                            <div className="p-team-media">
                                {store.renderWorkers4.length > 0 && (
                                    <UiSlider
                                        className={'p-team-media-slider'}
                                        slideClassName={'p-team-media-slide'}
                                        perGroup={1}
                                        perPage={'auto'}
                                        loop={true}
                                        gap={6}
                                        items={duplicatedWorkers4}
                                        slide={(item, index) => (
                                            <UiSlider.Slide
                                                render={() => (
                                                    <div
                                                        className={classnames('p-team-media-slide__inner', {
                                                            'p-team-media-slide__inner--active': index === store.activeSlide
                                                        })}
                                                    >
                                                        <div><VmWorker item={item}/></div>

                                                    </div>
                                                )}
                                            />
                                        )}
                                        navigation={(navigation) => {
                                            if (navigation.pages() < 6) {
                                                return null;
                                            }
                                            return (
                                                <>
                                                    <div className='p-team-media-slider__control'>
                                                        <div className="p-team-media-slider__arrow" onClick={navigation.prev}>
                                                            <UiIcon size={16} name={'chevronLeft'}/>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className='p-team-media-slider__control p-team-media-slider__control--next'>
                                                        <div className="p-team-media-slider__arrow" onClick={navigation.next}>
                                                            <UiIcon size={16} name={'chevronRight'}/>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        }}
                                    />
                                )}
                            </div>
                        }
                    </UiDataBoundary>
                    <UiPage.Pagination pagination={store.pagination}/>
                </UiPage.Wrap>
            }
        </UiPage>
    )
});
