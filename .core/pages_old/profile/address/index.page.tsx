import React from "react";
import { observer } from "mobx-react";
import { NextPage } from 'next'
import Head from 'next/head'

import { COLORS, MEDIA_POINTS, BREADCRUMBS, ROUTES } from "shared/contants";
import { Layout, LayoutTitle } from "shared/layout";
import {
    UiBreadcrumbs,
    UiButton,
    UiCard,
    UiForm,
    UiFormControl,
    UiGrid, UiIcon,
    UiInput,
    UiWrap,
} from "shared/uikit";
import {useObservable} from "shared/hooks";
import {UserModule} from "shared/modules";
import {ChangeHandlerType} from "shared/types";
import {CProfileMenu} from "shared/components";

import ProfileAddress from "../components/ProfileAddress";

import './index.scss';

const ProfileAddressPage: NextPage = observer(() => {
    const store = useObservable({
        isValidated: false,
        house: UserModule.user.house,
        flat: UserModule.user.flat,
        intercom: UserModule.user.intercom,
    });

    const handleChange: ChangeHandlerType<any> = ({value, name}) => {
        UserModule.user.update({[name]: value});
    }

    return (
        <Layout>
            <Head>
                <title>Личные данные</title>
            </Head>
            <UiWrap>
                <UiBreadcrumbs items={[{ href: ROUTES.PROFILE(), name: 'Профиль' }, BREADCRUMBS.PROFILE_ADDRESS()]}/>
                <LayoutTitle value='Адреса доставки'/>
                <UiGrid columns='235px 1fr' gap={30}>
                    <div><CProfileMenu/></div>
                    <UiCard>
                        <UiGrid media={{
                            [MEDIA_POINTS.IS_360]: { columns: 1, gap: 16 },
                            [MEDIA_POINTS.IS_768]: { columns: 'auto auto auto', gap: 16 },
                            [MEDIA_POINTS.IS_1024]: { columns: 'auto auto auto', gap: 16 }
                        }}>
                            <ProfileAddress
                                name={'Томск, Учебная 45'}
                                text={'634034, Томск, Учебная 45, квартира 31'}
                            />
                            <ProfileAddress
                                name={'Томск, Береговая 9'}
                                text={'634034, Томск, Береговая 9, квартира 163'}
                            />
                            <ProfileAddress
                                name={'Новосибирск, Красноармейская, 112'}
                                text={'634034, Томск, Красноармейская 112, квартира 120'}
                            />
                        </UiGrid>
                        <div className='p-profile-address-button'>
                            <UiButton
                                label='ДОБАВИТЬ АДРЕС'
                                type='button'
                                style={{ padding: '0 24px' }}
                            />
                        </div>
                        <div className='p-profile-address-form'>
                            <div className='p-profile-address-form__title'>Добавить адрес</div>
                            <div className='p-profile-address-form__close'>
                                <UiIcon size={30} name={'closeCircle'} color={COLORS.GRAY_MEDIUM} />
                            </div>
                            <UiForm>
                                <UiGrid gap={14}>
                                    <UiFormControl>
                                        <UiInput value='Город' />
                                    </UiFormControl>
                                    <UiFormControl>
                                        <UiInput value='Улица' />
                                    </UiFormControl>
                                    <UiGrid media={{
                                        [MEDIA_POINTS.IS_360]: { columns: 2, gap: [8, 14] },
                                        [MEDIA_POINTS.IS_768]: { columns: 2, gap: [10, 14] },
                                        [MEDIA_POINTS.IS_1024]: { columns: 2, gap: [10, 14] }
                                    }}>
                                        <UiFormControl>
                                            <UiInput
                                                onChange={handleChange}
                                                name='house'
                                                placeholder='Номер дома'
                                                value={store.house}
                                            />
                                        </UiFormControl>
                                        <UiFormControl>
                                            <UiInput
                                                onChange={handleChange}
                                                name='flat'
                                                placeholder='Квартира'
                                                value={store.flat}
                                            />
                                        </UiFormControl>
                                        <UiFormControl>
                                            <UiInput
                                                onChange={handleChange}
                                                name='intercom'
                                                placeholder='Домофон'
                                                value={store.intercom}
                                            />
                                        </UiFormControl>
                                    </UiGrid>
                                    <div className='p-profile-address-form__button'>
                                        <UiButton
                                            label='СОХРАНИТЬ АДРЕС'
                                            type='button'
                                            style={{ padding: '0 22px' }}
                                        />
                                    </div>
                                </UiGrid>
                            </UiForm>
                        </div>
                    </UiCard>
                </UiGrid>
            </UiWrap>
        </Layout>
    )
});

export default ProfileAddressPage;
