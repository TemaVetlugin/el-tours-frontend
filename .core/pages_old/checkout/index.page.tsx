import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from "next/router";

import { Layout, LayoutTitle } from "shared/layout";
import {
    UiBoundary,
    UiBreadcrumbs,
    UiButton,
    UiCard,
    UiCardSection,
    UiCheckbox, UiForm,
    UiFormControl,
    UiGrid,
    UiInput,
    UiLink,
    UiSeo,
    UiStickerCard,
    UiStickerCircle,
    UiTextarea,
    UiWrap
} from "shared/uikit";
import { COLORS, MASKS, MEDIA_POINTS, BREADCRUMBS, ROUTES } from "shared/contants";
import { useCatalogProductOffers, useIsAuthorized, useIsInitialized, useObservable, useValidation } from "shared/hooks";
import { BootstrapModule, NotifierModule, OrderModule, UserModule } from "shared/modules";
import { toCurrency } from "shared/utilities";
import { StoreModel } from "shared/models";
import { CCheckoutSummary, COrderItem } from "shared/components";
import { isEmail, isMobilePhone, isRequired } from "shared/validations";
import { ordersCreateRequest, storesCatalogProductOffersRequest } from "shared/requests/api";
import { getApplicationData } from "shared/server";
import { ApplicationDataType } from "shared/types";

import { PCheckoutStoresAndMap } from "./components/PCheckoutStoresAndMap";

import "./index.scss";

type PropsType = {
    application: ApplicationDataType,
}

const CheckoutPage: NextPage<PropsType> = observer(({ application }) => {
    BootstrapModule.application(application);

    const isInitialized = useIsInitialized();
    const isAuthorized = useIsAuthorized();
    const router = useRouter();
    const store = useObservable({
        isSubmitting: false,
        isLoading: true,
        isError: false,
        stores: [] as StoreModel[],
    });

    const form = useObservable({
        userLastname: '',
        userFirstname: '',
        userMiddlename: '',
        userEmail: '',
        userPhone: '',
        userComment: '',
        acceptPrivacy: 0,
        acceptData: 0,
        storeId: null as number | null
    });

    const validation = useValidation(form, {
        userFirstname: [isRequired()],
        userMiddlename: [isRequired()],
        userEmail: [isEmail()],
        userPhone: [isRequired(), isMobilePhone()],
        userLastname: [isRequired()]
    });

    const fetchData = useCallback(async () => {
        store.update({ isError: false, isLoading: true });
        const { isSuccess, data } = await storesCatalogProductOffersRequest({
            catalogProductId: OrderModule.cartItems.map(cartItem => cartItem.catalogProductId)
        });
        if (isSuccess && data) {
            store.set("stores", data.items
                .sort((a, b) => (b.catalogProductOffers?.length || 0) - (a.catalogProductOffers?.length || 0))
                .map(item => new StoreModel(item))
            );
        } else {
            store.set('isError', true);
        }
        store.set("isLoading", false);
    }, [store]);

    useEffect(() => {
        if (!isInitialized) {
            return;
        }
        form.update({
            userLastname: UserModule.user.lastname || '',
            userFirstname: UserModule.user.firstname || '',
            userMiddlename: UserModule.user.middlename || '',
            userEmail: UserModule.user.email || '',
            userPhone: UserModule.user.phone || '',
        });
    }, [isInitialized, form]);

    useEffect(() => {
        if (!isInitialized) {
            return;
        }
        if (OrderModule.cartItems.filter(cartItem => cartItem.isActive).length === 0) {
            router.push(ROUTES.CART());
        }
        fetchData();
    }, [isInitialized, fetchData, router]);

    useCatalogProductOffers({
        getCatalogProductId: () => OrderModule.cartItems.map(item => item.catalogProductId)
    }, (offers) => {
        OrderModule.cartItems.forEach(cartItem => {
            cartItem.catalogProduct.update({
                catalogProductOffers: offers[cartItem.catalogProductId] ?? []
            });
        });
        store.set("isLoading", false);
    }, [OrderModule.cartItems]);

    const handleSubmit = async () => {
        validation.enableErrors();
        if (store.isSubmitting || !validation.isValid) {
            window.scrollTo({ top: 0 });
            return;
        }
        if (!isAuthorized) {
            window.location.hash = 'login';
            return;
        }
        store.set("isSubmitting", true);
        const { isSuccess, data, description } = await ordersCreateRequest(form.toObject());
        if (isSuccess && data) {
            UserModule.user.update(data.user);
            OrderModule.mount(data.cartItems)
            await NotifierModule.alert('Оформление заказа', {
                description: 'Ваш заказ успешно создан.',
                successLabel: 'Перейти к заказу'
            });
            if (data?.order?.id) {
                await router.push(ROUTES.PROFILE_ORDER(data.order.id));
            }
        } else {
            await NotifierModule.alert('Ошибка', {
                description: description,
                successLabel: 'Принять'
            });
            store.set("isSubmitting", false);
        }
        store.set("isSubmitting", false);
    }

    return (
        <Layout>
            <UiSeo title={'Оформление заказа'}/>
            <UiWrap>
                <UiBreadcrumbs items={[BREADCRUMBS.CART(), BREADCRUMBS.CHECKOUT()]}/>
                <LayoutTitle value='Оформление заказа'/>
                <UiBoundary isLoading={store.isLoading} isError={store.isError} onAction={fetchData}>
                    <UiForm onSubmit={handleSubmit}>
                        <UiGrid media={{
                            [MEDIA_POINTS.IS_360]: { columns: 1, gap: 24 },
                            [MEDIA_POINTS.IS_768]: { columns: 1, gap: 30 },
                            [MEDIA_POINTS.IS_1024]: { columns: '1fr 310px', gap: 30 },
                            [MEDIA_POINTS.IS_1440]: { columns: '1fr 310px', gap: 30 }
                        }}>
                            <UiCard>
                                <UiCardSection title='Контактные данные'>
                                    <UiGrid media={{
                                        [MEDIA_POINTS.IS_360]: { columns: 1, gap: 16, style: { marginBottom: 24 } },
                                        [MEDIA_POINTS.IS_768]: { columns: 2, gap: 16, style: { marginBottom: 24 } },
                                        [MEDIA_POINTS.IS_1024]: { columns: 2, gap: 24, style: { marginBottom: 24 } },
                                        [MEDIA_POINTS.IS_1440]: { columns: 3, gap: 24, style: { marginBottom: 24 } }
                                    }}>
                                        <UiFormControl
                                            isRequired
                                            label={'Фамилия'}
                                            errorMessage={validation.userLastname.errorMessage}
                                        >
                                            <UiInput
                                                onChange={form.handleChange}
                                                name='userLastname'
                                                value={form.userLastname}
                                                placeholder={'Введите фамилию'}
                                            />
                                        </UiFormControl>
                                        <UiFormControl
                                            isRequired
                                            label={'Имя'}
                                            errorMessage={validation.userFirstname.errorMessage}
                                        >
                                            <UiInput
                                                onChange={form.handleChange}
                                                name='userFirstname'
                                                value={form.userFirstname}
                                                placeholder={'Введите имя'}
                                            />
                                        </UiFormControl>
                                        <UiFormControl
                                            isRequired
                                            label={'Отчество'}
                                            errorMessage={validation.userMiddlename.errorMessage}
                                        >
                                            <UiInput
                                                onChange={form.handleChange}
                                                name='userMiddlename'
                                                value={form.userMiddlename}
                                                placeholder={'Введите отчество'}
                                            />
                                        </UiFormControl>
                                        <UiFormControl
                                            isRequired
                                            label={'Ваш телефон'}
                                            errorMessage={validation.userPhone.errorMessage}
                                        >
                                            <UiInput
                                                onChange={form.handleChange}
                                                name='userPhone'
                                                value={form.userPhone}
                                                mask={MASKS.MOBILE_PHONE}
                                            />
                                        </UiFormControl>
                                        <UiFormControl
                                            label={'Ваша эл.почта'}
                                            errorMessage={validation.userEmail.errorMessage}
                                        >
                                            <UiInput
                                                onChange={form.handleChange}
                                                name='userEmail'
                                                value={form.userEmail}
                                                placeholder={'ivanov@gmail.com'}
                                            />
                                        </UiFormControl>
                                    </UiGrid>
                                </UiCardSection>

                                <UiCardSection title='Выбор аптеки'>
                                    <PCheckoutStoresAndMap
                                        stores={store.stores}
                                        onChange={form.handleChange}
                                        value={form.storeId}
                                    />
                                </UiCardSection>
                                {form.storeId && (
                                    <UiCardSection title='Cостав заказа'>
                                        <div className="p-checkout__total">
                                            Общая сумма
                                            заказа: <span>{toCurrency(OrderModule.getCatalogProductOffersPrice(form.storeId))}</span>
                                        </div>
                                        <UiGrid columns={1} gap={16} style={{ marginBottom: 32 }}>
                                            {OrderModule.cartItems.map((cartItem) => {
                                                const offer = cartItem.catalogProduct.catalogProductOffers.find(offer => offer.storeId === form.storeId);
                                                if (!offer) {
                                                    return null;
                                                }
                                                return (
                                                    <COrderItem
                                                        key={cartItem.id}
                                                        image={cartItem.catalogProduct.previewImageThumbnail}
                                                        name={cartItem.catalogProduct.name}
                                                        price={cartItem.quantity * offer.price}
                                                        description={(
                                                            <>{cartItem.quantity} X {toCurrency(offer.price)}</>
                                                        )}
                                                    />
                                                );
                                            })}
                                        </UiGrid>
                                    </UiCardSection>
                                )}
                                <UiCardSection title={'Комментарий к заказу'}>
                                    <UiGrid media={{
                                        [MEDIA_POINTS.IS_360]: { columns: 1, gap: 16 },
                                        [MEDIA_POINTS.IS_1024]: { columns: 1, gap: 24 },
                                    }}>
                                        <UiTextarea
                                            rows={7}
                                            value={form.userComment}
                                            name={'userComment'}
                                            onChange={form.handleChange}
                                            placeholder={'Ваши пожелания к заказу'}
                                        />
                                        <UiCheckbox
                                            isRequired
                                            value={form.acceptData}
                                            name={'acceptData'}
                                            onChange={form.handleChange}
                                            label={(
                                                <>
                                                    <span>Я согласен на обработку </span>
                                                    <UiLink href={ROUTES.P_PERSONAL_DATA()}>персональных данных</UiLink>
                                                </>
                                            )}
                                        />
                                        <UiCheckbox
                                            isRequired
                                            value={form.acceptPrivacy}
                                            name={'acceptPrivacy'}
                                            onChange={form.handleChange}
                                            label={(
                                                <>
                                                    <span>Я согласен с условиями </span>
                                                    <UiLink href={ROUTES.P_PRIVACY()}>пользователького соглашения</UiLink>
                                                </>
                                            )}
                                        />
                                    </UiGrid>

                                </UiCardSection>
                            </UiCard>
                            <div className="p-checkout-aside">
                                <UiGrid gap={16} columns={1} className="p-checkout-aside__inner">
                                    <UiStickerCard
                                        sticker={<UiStickerCircle
                                            name={'star'}
                                            size={60}
                                            stickerSize={30}
                                            color={COLORS.ORANGE2}/>
                                        }
                                        title={`Обратите внимание!`}
                                        description={`Окончательная цена зависит от выбранной аптеки`}
                                    />
                                    <CCheckoutSummary storeId={form.storeId}>
                                        <UiButton
                                            hasBorder={false}
                                            label='ОФОРМИТЬ ЗАКАЗ'
                                            type={'submit'}
                                            isDisabled={!form.storeId}
                                            colors={{
                                                button: [COLORS.PRIMARY_GRADIENT, COLORS.PRIMARY],
                                                label: [COLORS.WHITE, COLORS.WHITE]
                                            }}
                                            isLoading={store.isSubmitting}
                                        />
                                    </CCheckoutSummary>
                                </UiGrid>
                            </div>
                        </UiGrid>
                    </UiForm>
                </UiBoundary>
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

export default CheckoutPage;
