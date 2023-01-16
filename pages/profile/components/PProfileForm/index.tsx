import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { MEDIA_POINTS } from "shared/contants";
import { UserModule } from "shared/modules";
import { UiButton, UiForm, UiFormControl, UiFormFooter, UiGrid, UiInput, UiTextValue } from "shared/uikit";
import { useIsInitialized, useObservable, useValidation } from "shared/hooks";
import { formatDate, getMaskedValue } from "shared/utilities";
import { isDate, isEmail } from "shared/validations";
import { usersUpdateRequest } from "shared/requests/api";

export const PProfileForm = observer(() => {
    const isInitialized = useIsInitialized();

    const store = useObservable({
        errorMessage: '',
        isLoading: false,
        lastname: '',
        firstname: '',
        middlename: '',
        email: '',
        birthdate: '',
    });

    useEffect(() => {
        if (!isInitialized) {
            return;
        }
        store.update({
            lastname: UserModule.user.lastname,
            firstname: UserModule.user.firstname,
            middlename: UserModule.user.middlename,
            email: UserModule.user.email,
            birthdate: formatDate(UserModule.user.birthdate,'dd.MM.yyyy', 'yyyy-MM-dd')
        });
    }, [isInitialized, store]);

    const validation = useValidation(store, {
        birthdate: [isDate('DD.MM.YYYY')],
        email: [isEmail()],
    }, {
        birthdate: value => value?.toString().replace('_', ''),
        email: value => value?.toString().replace('_', ''),
    });

    const handleSubmit = async () => {
        validation.enableErrors();
        if (!validation.isValid) {
            return;
        }
        store.set("isLoading", true);
        store.set('errorMessage', '');
        const { isSuccess, data, description } = await usersUpdateRequest({
            lastname: store.lastname,
            firstname: store.firstname,
            middlename: store.middlename,
            email: store.email,
            birthdate: formatDate(store.birthdate, 'yyyy-MM-dd', 'dd.MM.yyyy')
        });
        if (isSuccess && data) {
            UserModule.user.update(data.item);
        } else {
            store.set('errorMessage', description);
        }
        store.set("isLoading", false);
    }

    return (
        <UiForm onSubmit={handleSubmit} onReset={store.reset}>
            <UiGrid gap={32}>
                <UiGrid media={{
                    [MEDIA_POINTS.IS_360]: { columns: 1, gap: 16 },
                    [MEDIA_POINTS.IS_768]: { columns: 2, gap: 16 },
                    [MEDIA_POINTS.IS_1024]: { columns: 3, gap: 16 }
                }}>
                    <UiFormControl label='Фамилия'>
                        <UiInput
                            onChange={store.handleChange}
                            name='lastname'
                            value={store.lastname}
                        />
                    </UiFormControl>
                    <UiFormControl label='Имя'>
                        <UiInput
                            onChange={store.handleChange}
                            name='firstname'
                            value={store.firstname}
                        />
                    </UiFormControl>
                    <UiFormControl label='Отчество'>
                        <UiInput
                            onChange={store.handleChange}
                            name='middlename'
                            value={store.middlename}
                        />
                    </UiFormControl>
                </UiGrid>
                <UiFormControl label={'Телефон'}>
                    <UiTextValue
                        value={getMaskedValue('+0 (000) 000 00 00', UserModule.user.phone)}
                    />
                </UiFormControl>
                <UiFormControl
                    label='Введите эл.почту'
                    hint='На эту почту будут приходить уведомления о заказе'
                    errorMessage={validation.email.errorMessage}
                >
                    <UiInput
                        onChange={store.handleChange}
                        name='email'
                        value={store.email}
                    />
                </UiFormControl>
                <UiFormControl
                    label={'Введите дату рождения'}
                    errorMessage={validation.birthdate.errorMessage}
                    hint={'Введите дату рождения, чтобы получать персональные скидки и бонусы'}
                >
                    <UiInput
                        onChange={store.handleChange}
                        name='birthdate'
                        value={store.birthdate}
                        mask={'00.00.0000'}
                    />
                </UiFormControl>
                <UiFormFooter>
                    <UiButton
                        isLoading={store.isLoading}
                        label='СОХРАНИТЬ'
                        type='submit'
                    />
                </UiFormFooter>
            </UiGrid>
        </UiForm>
    )
});
