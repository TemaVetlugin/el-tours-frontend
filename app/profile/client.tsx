'use client';

import { observer } from "mobx-react-lite";
import React from "react";

import { CProfileMenu } from "shared/components/profile";
import { COLORS, MASKS, ROUTES } from "shared/contants";
import { useAsyncEffect, usePrivatePage, useStore, useUser, useValidation } from "shared/hooks";
import { UserAddressModel } from "shared/models";
import { userAddressesQuery, userAddressesSaveQuery } from "shared/queries/main";
import { UiButton, UiCheckbox, UiDataBoundary, UiForm, UiGrid, UiIcon, UiInput, UiPage, UiPanel, UiTextarea, UiWrap } from "shared/ui";
import { UiAddressInput } from "shared/ui/UiAddressInput";
import { mask } from "shared/utilities";
import { isRequired } from "shared/validations";

import './page.scss';

export const Client = observer(() => {
    const isGranted = usePrivatePage();
    const user = useUser();
    const store = useStore({
        isLoading: false,
        isSubmitting: false,
        userAddresses: [] as UserAddressModel[],
        userAddress: new UserAddressModel(),
        setAsDefault: 0,
        isVisibleSaveForm: false
    });

    useAsyncEffect(async () => {
        if (!user.isAuthorized) {
            return;
        }
        const { isSuccess, data } = await userAddressesQuery();
        if (isSuccess && data) {
            store.set("userAddresses", data.items.map(item => new UserAddressModel(item)));
        }
        store.set("isLoading", false);
    }, [user.isAuthorized]);

    const validation = useValidation(store.userAddress, {
        address: isRequired(),
        apartment: isRequired(),
    })

    const handleSubmit = async () => {
        validation.submit();
        if (!validation.isValid) {
            return;
        }
        store.set("isSubmitting", true);
        const { isSuccess, data } = await userAddressesSaveQuery(store.userAddress);

        if (isSuccess && data) {
            store.set("userAddresses", data.items.map(item => new UserAddressModel(item)));
        }
        store.set("isSubmitting", false);
        store.set("userAddress", new UserAddressModel());
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
                                    <UiPanel.Title>Мой профиль</UiPanel.Title>
                                </UiPanel.Header>
                                <UiPanel.Section title={'Адреса доставки'}>
                                    <UiDataBoundary isLoading={store.isLoading}>
                                        {store.userAddresses.map(userAddress => (
                                            <div key={userAddress.id}>
                                                {userAddress.address}
                                                <button
                                                    onClick={() => {
                                                        store.userAddress.update(userAddress);
                                                        store.set("isVisibleSaveForm", true);
                                                    }}
                                                >
                                                    edit
                                                </button>
                                            </div>
                                        ))}
                                        <button onClick={() => {
                                            store.set("userAddress", new UserAddressModel());
                                            store.set("isVisibleSaveForm", true);
                                        }}>
                                            add new
                                        </button>
                                    </UiDataBoundary>
                                </UiPanel.Section>
                                {store.isVisibleSaveForm && (
                                    <UiPanel.Section
                                        title={store.userAddress.id
                                            ? (<><UiIcon size={24} name={"pencil"} color={COLORS.GREEN_PRIMARY}/><span>Редактирование адреса</span></>)
                                            : (<><img src={require('./assets/location.svg').default.src} height={24} width={24} alt=""/><span>Новый адрес доставки</span></>)
                                        }
                                    >
                                        <UiForm onSubmit={handleSubmit}>
                                            <UiForm.Control label={'Введите адрес'} errorMessage={validation.address.errorMessage}>
                                                <UiAddressInput
                                                    placeholder={(<>Укажите адрес для доставки <span>*</span></>)}
                                                    name={'address'}
                                                    value={store.userAddress.address}
                                                    onChange={store.userAddress.handleChange}
                                                />
                                            </UiForm.Control>
                                            <UiGrid columns={4} gap={16}>
                                                <UiForm.Control errorMessage={validation.apartment.errorMessage}>
                                                    <UiInput
                                                        placeholder={(<>Квартира/офис <span>*</span></>)}
                                                        name={'apartment'}
                                                        value={store.userAddress.apartment}
                                                        onChange={store.userAddress.handleChange}
                                                    />
                                                </UiForm.Control>
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
                                                    isLoading={store.isSubmitting}
                                                    type={'submit'}
                                                    label={'Сохранить адрес'}
                                                />
                                                <button onClick={() => store.set("isVisibleSaveForm", false)}>
                                                    hide
                                                </button>
                                            </UiForm.Control>
                                        </UiForm>
                                    </UiPanel.Section>
                                )}
                            </UiPanel>
                        </div>
                    </UiGrid>
                </UiDataBoundary>
            </UiWrap>
        </UiPage>
    )
});
