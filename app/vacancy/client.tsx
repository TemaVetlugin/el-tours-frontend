'use client';

import React from "react";
import {observer} from "mobx-react-lite";
import {useAsyncEffect, useCity, useRouter, useSearchParams, useStore} from "shared/hooks";
import {PaginationModel, VacancyModel} from "shared/models";
import {vacancyQuery} from "shared/queries/main";
import {UiDataBoundary, UiGrid, UiPage} from "shared/ui";

import './page.scss';
import {LayoutHeader} from "shared/layout";
import {LayoutHeaderSearch} from "./components/PVacancyHeaderSearch";
import {PVacancyFormAside} from "./components/PVacancyFormAside";
import {PVacancyForm} from "./components/PVacancyForm";
import {PVacancyDescription} from "./components/PVacancyDescription";
import {VmVacancy} from "shared/viewmodels";
import {ROUTES} from "shared/contants";

export const Client = observer(() => {
    const city = useCity();
    const router = useRouter()
    const store = useStore({
        vacancy: [] as VacancyModel[],
        pagination: new PaginationModel(),
        isLoading: true,
        isShallowLoading: true,
    });
    const searchParams = useSearchParams({page: 1, tagId: null as null | number})


    useAsyncEffect(async () => {
        store.set("isShallowLoading", true);
        const {isSuccess, data} = await vacancyQuery({
            page: searchParams.page,
        });
        if (isSuccess && data) {
            store.pagination.update(data.pagination);
            store.set("vacancy", data.items.map(item => new VacancyModel(item)));
        }
        store.set("isLoading", false);
        store.set("isShallowLoading", false);
    }, [searchParams.page, city, searchParams.tagId]);

    return (
        <UiPage>
            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header
                items={[ROUTES.VACANCY()]}
                title={'Вакансии'}
                subtitle={'Возможно, нам не хватает именно тебя!'}
            />

            <div className="vacancy-page">
                <UiPage.Wrap className="vacancy-page--flex">
                    <div className="vacancy-page-body">
                        <p className="vacancy-page-body__text">Каждый день с нашей помощью более 10 000 человек планируют свои поездки: находят дешевые отели, билеты на самолет и бронируют круизы. В нашу дружную
                            команду
                            мы
                            ищем профессионалов, готовых участвовать в создании и поддержке продуктов для миллионов пользователей.</p>
                        <p className="vacancy-page-body__text">Мы ценим инициативу, не вставляем палки в колеса и даем возможность влиять на сервис. И каждое успешное решение мы отмечаем веселыми вечеринками!</p>
                        <PVacancyDescription/>

                        <div className="vacancy-page-body-list">
                            <UiDataBoundary isLoading={store.isLoading} withShallow>
                                {store.vacancy.map(vacancy => <VmVacancy key={vacancy.id} template={'light'} item={vacancy}/>)}

                            </UiDataBoundary>

                        </div>
                    </div>
                    <PVacancyFormAside/>
                </UiPage.Wrap>
                <PVacancyForm/>
            </div>

        </UiPage>
    )
});
