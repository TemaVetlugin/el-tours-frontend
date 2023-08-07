'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { UiDataBoundary, UiGrid, UiIcon, UiPage, UiPanel, UiWrap } from "shared/ui";
import { COLORS, MASKS, ROUTES } from "shared/contants";
import { useAsyncEffect, useCity, useStore, usePrivatePage, useUser } from "shared/hooks";
import { date, mask, Notifier } from "shared/utilities";
import { CProfileMenu } from "shared/components/profile";
import { userRemindersDeleteQuery, userRemindersQuery } from "shared/queries/main";
import { UserReminderModel } from "shared/models";
import './page.scss';
import { CCatalogProduct } from "shared/components/catalog";

export const Client = observer(() => {
    const isGranted = usePrivatePage();
    const user = useUser();
    const city = useCity();
    const store = useStore({
        userReminders: [] as UserReminderModel[]
    });

    useAsyncEffect(async () => {
        if (!isGranted) {
            return;
        }
        const { data, isSuccess } = await userRemindersQuery({
            cityId: city.id
        });
        if (isSuccess && data) {
            store.set("userReminders", data.items.map(item => new UserReminderModel(item)));
        }
    }, [isGranted, city, store]);

    const handleDelete = async (id: number) => {
        if (!await Notifier.prompt('Подтвердите удаление напоминания')) {
            return;
        }
        store.set('userReminders', store.userReminders.filter(userReminder => userReminder.id !== id));
        userRemindersDeleteQuery({ id });
    }

    return (
        <UiPage>
            <UiWrap>
                <UiDataBoundary isLoading={!isGranted}>
                    <UiPage.Breadcrumbs items={[ROUTES.PROFILE()]}/>
                    <UiPage.Header title={mask(MASKS.MOBILE_PHONE, user.phone)}/>
                    <UiGrid columns={'280px 1fr'} gap={50}>
                        <div>
                            <CProfileMenu/>
                        </div>
                        <div>
                            <UiPanel>
                                <UiPanel.Header>
                                    <UiPanel.Title>Напомнить</UiPanel.Title>
                                </UiPanel.Header>
                                <UiPanel.Description>
                                    Etiam eu vehicula lectus, eget rutrum lectus. Nunc vehicula sem at pulvinar varius. Mauris rutrum mauris et nisl porttitor, in facilisis diam
                                    faucibus. Vivamus tellus purus, vehicula eu blandit sed, tempus ac dolor. Nulla facilisi. Vestibulum quis vehicula odio. Cras et quam egestas,
                                    iaculis neque nec, venenatis libero. Praesent metus mi, porttitor eu euismod nec, feugiat vitae ligula. Fusce ac auctor diam, sit amet cursus
                                    elit. Aliquam eget ante id mi rutrum efficitur et hendrerit est. Donec sollicitudin sem eu nisl congue, et pellentesque ligula elementum.
                                    Curabitur a lectus augue. In enim nisl, dictum sed suscipit id, imperdiet eu mauris.
                                </UiPanel.Description>
                                <UiGrid className={'p-profile-reminders__items'} columns={3} gap={20}>
                                    {store.userReminders.map(userReminder => (
                                        <div key={userReminder.id} className="p-profile-reminders-item">
                                            <CCatalogProduct catalogProduct={userReminder.catalogProduct} withRemind={false}/>
                                            <div className="p-profile-reminders-item__close" onClick={() => handleDelete(userReminder.id)}>
                                                <UiIcon size={16} name={"close"} color={COLORS.GREEN_SECONDARY}/>
                                            </div>
                                            <div className="p-profile-reminders-item__date">
                                                <UiIcon size={24} name={"calendar"} color={COLORS.GRAY_PRIMARY}/>
                                                <span>{date(userReminder.remindAt).toFormat('dd.MM.yyyy')}</span>
                                            </div>
                                        </div>
                                    ))}
                                </UiGrid>
                            </UiPanel>
                        </div>
                    </UiGrid>
                </UiDataBoundary>
            </UiWrap>
        </UiPage>
    )
});
