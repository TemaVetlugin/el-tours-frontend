import { observer } from "mobx-react";
import { useEffect } from "react";

import {
    UiBoundary,
    UiButton,
    UiCard,
    UiCardSection,
    UiCheckbox,
    UiForm,
    UiFormControl,
    UiGrid,
    UiInput,
    UiLink,
    UiTextarea
} from "shared/uikit";
import { useObservable, useValidation } from "shared/hooks";
import { catalogProductFeedbacksCreateRequest, catalogProductFeedbacksRequest } from "shared/requests/api";
import { CatalogProductFeedbackModel } from "shared/models";
import { MASKS, MEDIA_POINTS, ROUTES } from "shared/contants";
import { isEmail, isRequired } from "shared/validations";

import './index.scss';

type PropsType = {
    catalogProductId: number
}

export const PProductFeedbacks = observer(({ catalogProductId }: PropsType) => {
    const store = useObservable({
        isLoading: true,
        isSubmitting: false,
        catalogProductFeedbacks: [] as CatalogProductFeedbackModel[]
    });

    const form = useObservable({
        accept: 0,
        name: '',
        email: '',
        phone: '',
        content: '',
    });

    const validation = useValidation(form, {
        name: [isRequired()],
        email: [isRequired(), isEmail()],
        content: [isRequired()],
    });

    useEffect(() => {
        (async () => {
            store.set("isLoading", true);
            const { isSuccess, data } = await catalogProductFeedbacksRequest({ catalogProductId });
            if (isSuccess && data) {
                store.set("catalogProductFeedbacks", data.items.map(catalogProductFeedback => new CatalogProductFeedbackModel(catalogProductFeedback)));
            }
            store.set("isLoading", false);
        })();
    }, [catalogProductId, store]);

    const handleSubmit = async () => {
        validation.enableErrors();
        if (!validation.isValid) {
            return;
        }
        store.set("isSubmitting", true);
        await catalogProductFeedbacksCreateRequest({
            ...form.toObject(),
            catalogProductId,
        });
        store.set("isSubmitting", false);
    }

    return (
        <UiBoundary isLoading={store.isLoading}>
            <UiGrid className={`p-product-feedbacks`} media={{
                [MEDIA_POINTS.IS_360]: { columns: 1, gap: 24 },
                [MEDIA_POINTS.IS_1024]: { columns: 2, gap: 24 }
            }}>
                {store.catalogProductFeedbacks.length > 0 && (
                    <div className="p-product-feedbacks__items">

                    </div>
                )}
                <UiCard className='p-product-feedbacks__form'>
                    <UiCardSection title='Оставьте отзыв о препарате'>
                        <UiForm onSubmit={handleSubmit}>
                            <UiFormControl label={'Ваше имя'} isRequired errorMessage={validation.name.errorMessage}>
                                <UiInput
                                    value={form.name}
                                    name='name'
                                    onChange={form.handleChange}
                                    placeholder={'Введите ваше имя'}
                                />
                            </UiFormControl>
                            <UiFormControl label={'Ваш email'} isRequired errorMessage={validation.email.errorMessage}>
                                <UiInput
                                    value={form.email}
                                    name='email'
                                    onChange={form.handleChange}
                                    placeholder={'Введите email'}
                                />
                            </UiFormControl>
                            <UiFormControl label={'Ваш телефон'}>
                                <UiInput
                                    value={form.phone}
                                    name='phone'
                                    onChange={form.handleChange}
                                    placeholder={'Введите телефон'}
                                    mask={MASKS.MOBILE_PHONE}
                                />
                            </UiFormControl>
                            <UiFormControl
                                isRequired
                                label={'Текст отзыва'}
                                errorMessage={validation.content.errorMessage}
                            >
                                <UiTextarea
                                    value={form.content}
                                    name='content'
                                    onChange={form.handleChange}
                                    placeholder={'Ваш отзыв'} rows={6}
                                />
                            </UiFormControl>
                            <UiFormControl>
                                <UiCheckbox
                                    isRequired
                                    name={'accept'}
                                    value={form.accept}
                                    onChange={form.handleChange}
                                    label={<>
                                        Я согласен на обработку
                                        <UiLink href={ROUTES.P_PERSONAL_DATA()}> персональных данных</UiLink>
                                    </>}
                                />
                            </UiFormControl>
                            <UiButton
                                type='submit'
                                className={'p-product-feedbacks__submit'}
                                label={'Отправить'}
                            />
                        </UiForm>
                    </UiCardSection>
                </UiCard>
            </UiGrid>
        </UiBoundary>
    )
});
