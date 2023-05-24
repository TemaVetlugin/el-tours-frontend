import React from "react";
import { observer } from "mobx-react";

import { COLORS, MASKS } from "shared/contants";
import {
    UiButton,
    UiCheckbox,
    UiForm,
    UiFormControl,
    UiIcon,
    UiInput,
    UiLink,
    UiModal,
    UiModalTitle,
    UiStickerCircle
} from "shared/uikit";
import { useObservable, useValidation } from "shared/hooks";
import { isMobilePhone, isRequired } from "shared/validations";
import { backCallRequestCreateRequest } from "shared/requests/api";
import { NotifierModule } from "shared/modules";

import './index.scss';

export const CBackCallRequestCreate = observer(() => {
    const store = useObservable({
        isOpened: false,
    });

    const form = useObservable({
        name: '',
        phone: '',
        isAccepted: 0
    });

    const validation = useValidation(form, {
        phone: [isRequired(), isMobilePhone()],
        name: [isRequired()],
    });

    const handleSubmit = async () => {
        validation.enableErrors();
        if (!validation.isValid) {
            return;
        }
        backCallRequestCreateRequest(form);
        store.set("isOpened", false);
        NotifierModule.alert('Заказать звонок', {
            description: 'Вы оставили заявку на обратный звонок. Скоро мы с вами свяжемся'
        });
    }

    return (
        <div className="c-back-call-request-create">
            <a href="tel:+73822543999" className="c-back-call-request-create__icon">
                <UiIcon size={14} name={'phone'} color={COLORS.WHITE}/>
            </a>
            <div className="c-back-call-request-create__group">
                <a href="tel:+73822543999" className="c-back-call-request-create__number">+7 (3822) 543-999</a>
                <div className="c-back-call-request-create__callback" onClick={() => store.set("isOpened", true)}>
                    Заказать звонок
                </div>
            </div>
            <UiModal isOpened={store.isOpened} onClose={() => store.set("isOpened", false)} width={450}>
                <UiStickerCircle size={102} name={'phone'} stickerSize={82}/>
                <UiModalTitle value={'Оставьте номер и мы вам перезвоним!'}/>
                <UiForm onSubmit={handleSubmit}>
                    <UiFormControl label={'Ваше имя'} isRequired errorMessage={validation.name.errorMessage}>
                        <UiInput onChange={form.handleChange} name='name' value={form.name}/>
                    </UiFormControl>
                    <UiFormControl label={'Ваш телефон'} isRequired errorMessage={validation.phone.errorMessage}>
                        <UiInput onChange={form.handleChange} name='phone' value={form.phone}
                                 mask={MASKS.MOBILE_PHONE}/>
                    </UiFormControl>
                    <UiFormControl>
                        <UiCheckbox
                            onChange={form.handleChange}
                            name='isAccepted'
                            value={form.isAccepted}
                            isRequired
                            label={(
                                <>
                                    Я согласен на <UiLink href={'/p/personal-data-processing'}>обработку персональных
                                    данных</UiLink>
                                </>
                            )}
                        />
                    </UiFormControl>
                    <UiButton hasBorder={false} type={'submit'} label='ЗАКАЗАТЬ ЗВОНОК' colors={{
                        button: [COLORS.PRIMARY_GRADIENT, COLORS.PRIMARY],
                        label: [COLORS.WHITE, COLORS.WHITE]
                    }} style={{
                        width: '100%'
                    }}/>
                </UiForm>
            </UiModal>
        </div>
    )
})
