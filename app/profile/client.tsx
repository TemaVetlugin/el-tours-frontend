'use client';

import { observer } from "mobx-react-lite";
import React from "react";
import { CProfileMenu } from "shared/components/profile";
import { MASKS, ROUTES } from "shared/contants";
import { usePrivatePage, useStore, useUser } from "shared/hooks";
import { UserAddressModel } from "shared/models";

import { UiButton, UiCheckbox, UiDataBoundary, UiForm, UiGrid, UiInput, UiPage, UiPanel, UiTextarea, UiWrap } from "shared/ui";
import { UiAddressInput } from "shared/ui/UiAddressInput";
import { mask } from "shared/utilities";

import './page.scss';

export const Client = observer(() => {
    const isGranted = usePrivatePage();
    const user = useUser();
    const store = useStore({
        userAddress: new UserAddressModel(),
        setAsDefault: 0
    });
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
                                    <UiPanel.Title>Мой профиль</UiPanel.Title>
                                </UiPanel.Header>
                                <UiPanel.Section title={'Адреса доставки'}>

                                </UiPanel.Section>
                                <UiPanel.Section
                                    title={
                                        (<><img src={require('./assets/location.svg').default.src} height={24} width={24} alt=""/><span>Новый адрес доставки</span></>)
                                    }
                                >
                                    <UiForm>
                                        <UiForm.Control label={'Введите адрес'}>
                                            <UiAddressInput
                                                placeholder={(<>Укажите адрес для доставки <span>*</span></>)}
                                                name={'address'}
                                                value={store.userAddress.address}
                                                onChange={store.userAddress.handleChange}
                                            />
                                        </UiForm.Control>
                                        <UiForm.Control>
                                            <UiGrid columns={4} gap={16}>
                                                <UiInput
                                                    placeholder={(<>Квартира/офис <span>*</span></>)}
                                                    name={'apartment'}
                                                    value={store.userAddress.apartment}
                                                    onChange={store.userAddress.handleChange}
                                                />
                                                <UiInput
                                                    placeholder={'Этаж'}
                                                    name={'floor'}
                                                    value={store.userAddress.floor}
                                                    onChange={store.userAddress.handleChange}
                                                />
                                                <UiInput
                                                    placeholder={'Подъезд'}
                                                    name={'entrance'}
                                                    value={store.userAddress.entrance}
                                                    onChange={store.userAddress.handleChange}
                                                />
                                                <UiInput
                                                    placeholder={'Домофон'}
                                                    name={'intercom'}
                                                    value={store.userAddress.intercom}
                                                    onChange={store.userAddress.handleChange}
                                                />
                                            </UiGrid>
                                        </UiForm.Control>
                                        <UiForm.Control>
                                            <UiTextarea
                                                placeholder={'Комментарий для курьера'}
                                                name={'comment'}
                                                value={store.userAddress.comment}
                                                onChange={store.userAddress.handleChange}
                                            />
                                        </UiForm.Control>
                                        <UiForm.Control>
                                            <UiCheckbox
                                                label={'Сделать этот адрес основным'}
                                                value={store.setAsDefault}
                                                name={'setAsDefault'}
                                                onChange={store.handleChange}
                                            />
                                        </UiForm.Control>
                                        <UiForm.Control>
                                            <UiButton
                                                type={'submit'}
                                                label={'Добавить адрес'}
                                            />
                                        </UiForm.Control>
                                    </UiForm>
                                </UiPanel.Section>
                            </UiPanel>
                        </div>
                    </UiGrid>
                </UiDataBoundary>
            </UiWrap>
        </UiPage>
    )
});
