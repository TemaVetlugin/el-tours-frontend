'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { useAsyncEffect, useCity, useRouter, useSearchParams, useStore } from "shared/hooks";
import { ArticleModel, PaginationModel } from "shared/models";
import { articlesQuery } from "shared/queries/main";
import { UiButton, UiForm, UiIcon, UiInput, UiLightbox, UiPage, UiSlider, UiTypography } from "shared/ui";
import { LayoutHeader } from "shared/layout";
import { COLORS, ROUTES } from "shared/contants";
import { LayoutHeaderSearch } from "shared/layout/LayoutHeaderSearch";
import classnames from "classnames";
import { UserService } from "shared/services";
import { PVisaManager } from "./components/PVisaManager";
import { PVisaCountries } from "./components/PVisaCountries";
import { PVisaServices } from "./components/PVisaServices";

import './page.scss';

export const Client = observer(() => {
    const city = useCity();
    const router = useRouter()
    const store = useStore({
        articles: [] as ArticleModel[],
        pagination: new PaginationModel(),
        isLoading: true,
        isLightbox: false,
        lightboxIndex: 0,
        activeSlide: 0,
        isShallowLoading: true,

    });

    const media = [
        {type: 'image', src: '/assets/images/typical/image69.png'},
        {type: 'image', src: '/assets/images/typical/image70.png'},
        {type: 'image', src: '/assets/images/typical/image71.png'},
        {type: 'image', src: '/assets/images/typical/image69.png'},
        {type: 'image', src: '/assets/images/typical/image70.png'},
        {type: 'image', src: '/assets/images/typical/image71.png'},
        {type: 'image', src: '/assets/images/typical/image69.png'},
        {type: 'image', src: '/assets/images/typical/image70.png'},
        {type: 'image', src: '/assets/images/typical/image71.png'},
        {type: 'image', src: '/assets/images/typical/image69.png'},
        {type: 'image', src: '/assets/images/typical/image70.png'},
        {type: 'image', src: '/assets/images/typical/image71.png'},
        // и т.д.
    ];


    const searchParams = useSearchParams({page: 1, tagId: null as null | number})


    useAsyncEffect(async () => {
        store.set("isShallowLoading", true);
        const {isSuccess, data} = await articlesQuery({
            page: searchParams.page,
        });
        if (isSuccess && data) {
            store.pagination.update(data.pagination);
            store.set("articles", data.items.map(item => new ArticleModel(item)));
        }
        store.set("isLoading", false);
        store.set("isShallowLoading", false);
    }, [searchParams.page, city, searchParams.tagId]);

    return (
        <UiPage className="p-visa">
            <LayoutHeader>
                <LayoutHeaderSearch/>
            </LayoutHeader>
            <UiPage.Header
                backTo={ROUTES.VISA()}
                title={'Оформление визы в Испанию'}
                subtitle={'Шенгенские визы, мультивизы, приглашение для иностранцев'}

            />


            <UiPage.Wrap className="p-visa--wrap">
                <div className="p-visa-body">
                    <div className="p-visa-body-media">
                        <UiLightbox
                            items={media}
                            isOpened={store.isLightbox}
                            onClose={() => store.set("isLightbox", false)}
                            index={store.lightboxIndex}
                        />
                        <div
                            onClick={() => {
                                store.set("isLightbox", true);
                            }}
                            className="p-visa-body-media__image"
                            style={{backgroundImage: `url(${media[store.activeSlide]?.src})`}}
                        />
                        <UiSlider
                            className={'p-visa-body-media-slider'}
                            slideClassName={'p-visa-body-media-slide'}
                            perGroup={1}
                            perPage={'auto'}
                            gap={8}
                            items={media}
                            slide={(item, index) => (
                                <UiSlider.Slide
                                    render={() => (
                                <div
                                    className={classnames('p-visa-body-media-slide__inner', {
                                        'p-visa-body-media-slide__inner--active': index === store.activeSlide
                                    })}
                                >
                                    {item.type === 'image' && (
                                        <div
                                            className={'p-visa-body-media-slide__image'}
                                            onClick={() => {
                                                store.set("activeSlide", index);
                                                store.set("lightboxIndex", index);
                                            }}
                                            style={{
                                                backgroundImage: `url(${item.src})`
                                            }}
                                        />
                                    )}
                                </div>
                                    )}/>
                            )}
                            renderLine={(item, _, index) => (
                                <div
                                    className={classnames('p-visa-body-media-line__step', {
                                        'p-visa-body-media-line__step--active': index === store.activeSlide
                                    })}
                                    onClick={() => {
                                        store.set("activeSlide", index);
                                        store.set("lightboxIndex", index);
                                    }}
                                >
                                </div>
                            )}




                        />
                    </div>
                    <div className="p-visa-body-offer">
                        <h5 className="p-visa-body-offer__title">Для вас мы предлагаем:</h5>
                        <div className="p-visa-body-offer__wrap">
                            <div className="p-visa-body-offer-item">
                                <UiIcon
                                    size={48}
                                    name={"phone"} color={COLORS.DARK_SECONDARY_BORDER}/>
                                <div className="p-visa-body-offer-item__text">Оформление за 2 недели</div>
                            </div>
                            <div className="p-visa-body-offer-item">
                                <UiIcon
                                    size={48}
                                    name={"phone"} color={COLORS.DARK_SECONDARY_BORDER}/>
                                <div className="p-visa-body-offer-item__text">Стоимость <br/> от 1 900 ₽</div>
                            </div>
                            <div className="p-visa-body-offer-item">
                                <UiIcon
                                    size={48}
                                    name={"phone"} color={COLORS.DARK_SECONDARY_BORDER}/>
                                <div className="p-visa-body-offer-item__text">Полное сопровождение</div>
                            </div>
                        </div>
                    </div>
                    <div className="p-visa-body-tab">
                        <div className="p-visa-body-tab-headers">
                            <div className="p-visa-body-tab-headers__blackout"/>
                            <div className="p-visa-body-tab-headers__arrows">
                                <UiIcon size={12} name={"arrowBack"}/>
                                <UiIcon size={12} name={"arrowForward"}/>
                            </div>
                            <div className="p-visa-body-tab-headers__button--active">
                                <h5>Туристическая</h5>
                            </div>
                            <div className="p-visa-body-tab-headers__button">
                                <h5>Бизнес</h5>
                            </div>
                            <div className="p-visa-body-tab-headers__button">
                                <h5>Гостевая</h5>
                            </div>
                            <div className="p-visa-body-tab-headers__button">
                                <h5>Для владельцев недвижимости</h5>
                            </div>

                        </div>
                        <div className="p-visa-body-tab-content">
                            <div className="p-visa-body-tab-content-item">
                                <h5>Нахождение в Испании</h5>
                                <div className="p-visa-body-tab-content__wrap">
                                    <span>До 90 дней</span>
                                </div>
                            </div>
                            <div className="p-visa-body-tab-content-item">
                                <h5>Оформление</h5>
                                <div className="p-visa-body-tab-content__wrap">
                                    <span>7-8 рабочих дней</span>
                                </div>
                            </div>
                            <div className="p-visa-body-tab-content-item">
                                <h5>Стоимость</h5>
                                <div className="p-visa-body-tab-content__wrap">
                                    <span>11 700 ₽</span>
                                </div>
                            </div>
                            <UiButton>
                                <span>Заказать визу</span>
                            </UiButton>

                        </div>
                    </div>
                    <UiTypography className="p-visa-body-text">
                        <p>Испания входит в шенгенскую зону, поэтому для туристов выгодно оформлять шенгенскую визу.
                            Шенгенская виза открывает путь в другие европейские государства, входящие в список стран
                            Шенгенского соглашения. Однако требования для получения такой визы очень жесткие и строгие.
                            Поэтому ее оформление лучше доверить профессионалам. Наши специалисты помогут правильно
                            составить анкеты и подготовят необходимый перечень документов, объяснят все нюансы.</p>
                        <p>Если же вы планируете въезжать в страну несколько раз в течение года или полугода, то
                            выгодной для вас будет мультивиза в Испанию.</p>
                        <h4>Документы для оформления туристической визы:</h4>
                        <ul>
                            <li>Загранпаспорт, действительный минимум в течение трех месяцев после последней
                                предполагаемой даты выезда из Шенгенской зоны, содержащий как минимум две чистые
                                страницы и не старше десяти лет + старый заграничный паспорт (с копией всех страниц: по
                                4 разворота на 1 лист, по 2 с каждой стороны);
                            </li>
                            <li>Копия всех страниц действующего заграничного паспорта (по 4 разворота на 1 лист, по 2 с
                                каждой стороны);
                            </li>
                            <li>2 цветные фотографии на белом фоне (3,5х4,5), 70-80% лицо; (МАТОВЫЕ);</li>
                            <li>Справка с места работы с указанием должности и заработной платы(для ИП дополнительно
                                копия свидетельства о регистрации и постановке на учет в налоговую инспекцию, для
                                пенсионеров - копия пенсионного удостоверения, для школьников, студентов - справка с
                                учебного заведения); Для пенсионеров и студентов спонсорское письмо от спонсора;
                            </li>
                            <li>Документация, подтверждающая наличие финансовых средств - выписка со счета в банке, из
                                расчета - min 75 евро на день прибывания (сумма не может быть меньше 670 евро);
                            </li>
                            <li>Опросный лист;</li>
                            <li>Медицинская страховка (оформляется в офисе);</li>
                            <li>Копия общегражданского паспорта, все страницы (по 4 разворота на 1 лист, по 2 с каждой
                                стороны);
                            </li>
                            <li>Бронь или копия авиабилетов;</li>
                            <li>Нотариальная доверенность на нашего курьера на подачу и получение заграничного паспорта
                                (данные высылаем по запросу);
                            </li>
                            <li>Туристическое приглашение: прикладывается бронирование гостиницы или ваучеры испанской турфирмы.</li>
                        </ul>

                    </UiTypography>
                    <UiButton className="p-visa-body-text__download"
                              template={'large'}
                              colors={{
                                  button: [COLORS.GRAY_SECONDARY, COLORS.GREEN_SECONDARY],
                                  border: [COLORS.DARK_SECONDARY, COLORS.GREEN_SECONDARY],
                                  label: [COLORS.DARK_PRIMARY, COLORS.WHITE],
                                  icon: [COLORS.DARK_PRIMARY, COLORS.WHITE],
                              }}
                    >
                        <UiIcon size={32} name={'download'} color={COLORS.GREEN_PRIMARY}/>
                        <span>Скачать документы</span>
                    </UiButton>
                    <div className="p-visa-body-price">
                        <h2 className="p-visa-body-price__title">В оформление входит:</h2>
                        <div className="p-visa-body-price__wrap">
                            <div className="p-visa-body-price-item">
                                <div className="p-visa-body-price-item__number">
                                    <span>900 ₽</span>
                                    <div className="p-visa-body-price-item__icon">
                                        <UiIcon size={16} name={'add'}/>
                                    </div>
                                </div>
                                <div className="p-visa-body-price-item__description">
                                    <span>Проверка, подготовка документов + заполнение анкеты</span>
                                </div>
                            </div>
                            <div className="p-visa-body-price-item">
                                <div className="p-visa-body-price-item__number">
                                    <span>290 ₽</span>
                                    <div className="p-visa-body-price-item__icon">
                                        <UiIcon size={16} name={'add'}/>
                                    </div>
                                </div>
                                <div className="p-visa-body-price-item__description">
                                    <span>Бронь авиабилета</span>
                                </div>
                            </div>
                            <div className="p-visa-body-price-item">
                                <div className="p-visa-body-price-item__number">
                                    <span>710 ₽</span>
                                    <div className=" p-visa-body-price-item__icon p-visa-body-price-item__icon--last">
                                        <UiIcon size={16} name={'add'}/>
                                    </div>
                                </div>
                                <div className="p-visa-body-price-item__description">
                                    <span>Бронь гостиницы</span>
                                </div>
                            </div>
                            <div className="p-visa-body-price-item">
                                <div className="p-visa-body-price-item__number p-visa-body-price-item__number--last">
                                    <span>9 800 ₽</span>
                                </div>
                                <div className="p-visa-body-price-item__description p-visa-body-price-item__description--last">
                                    <span>Туристическая виза на 360 дней</span>
                                </div>
                            </div>
                            <div className="p-visa-body-price-sum">
                                <span className="p-visa-body-price-sum__title">Итого:</span>
                                <span className="p-visa-body-price-sum__number">11 700 ₽</span>
                            </div>

                        </div>

                    </div>

                    <div className="p-visa-body-instruction">
                        <h2 className="p-visa-body-instruction__title">Как получить визу:</h2>
                        <div className="p-visa-body-instruction__wrap">
                            <div className="p-visa-body-instruction-item">
                                <div className="p-visa-body-instruction-item-header">
                                    <div className="p-visa-body-instruction-item-header__number">
                                        1
                                    </div>
                                    <div className="p-visa-body-instruction-item-header__text">
                                        <span>Оставляете заявку</span>
                                    </div>
                                </div>
                                <div className="p-visa-body-instruction-item__content">
                                    Вы заполняете форму на этой странице, и мы приступаем к работе
                                </div>
                            </div>

                            <div className="p-visa-body-instruction__arrow">
                                <UiIcon size={[40, 12]} name={"arrowRight"}/>
                            </div>

                            <div className="p-visa-body-instruction-item">
                                <div className="p-visa-body-instruction-item-header">
                                    <div className="p-visa-body-instruction-item-header__number">
                                        2
                                    </div>
                                    <div className="p-visa-body-instruction-item-header__text">
                                        <span>Выясняем детали</span>
                                    </div>
                                </div>
                                <div className="p-visa-body-instruction-item__content">
                                    Наш менеджер свяжется с вами, чтобы выяснить детали поездки
                                </div>
                            </div>

                            <div className="p-visa-body-instruction__arrow">
                                <UiIcon size={[40, 12]} name={"arrowRight"}/>
                            </div>

                            <div className="p-visa-body-instruction-item">
                                <div className="p-visa-body-instruction-item-header">
                                    <div className="p-visa-body-instruction-item-header__number">
                                        3
                                    </div>
                                    <div className="p-visa-body-instruction-item-header__text">
                                        <span>Готовим документы</span>
                                    </div>
                                </div>
                                <div className="p-visa-body-instruction-item__content">
                                    Вместе с вами формируем пакет из всех необходимых документов
                                </div>
                            </div>

                            <div className="p-visa-body-instruction__arrow">
                                <UiIcon size={[40, 12]} name={"arrowRight"}/>
                            </div>


                            <div className="p-visa-body-instruction-item">
                                <div className="p-visa-body-instruction-item-header">
                                    <div className="p-visa-body-instruction-item-header__number">
                                        4
                                    </div>
                                    <div className="p-visa-body-instruction-item-header__text">
                                        <span>Получаете визу</span>
                                    </div>
                                </div>
                                <div className="p-visa-body-instruction-item__content">
                                    Полное сопровождение — с подачи заявления и до оформления визы
                                </div>
                            </div>
                        </div>
                    </div>

                    <UiForm className="p-visa-body-request">
                        <h2 className="p-visa-body-request__title">Оставить заявку на оформление визы</h2>
                        <div className="p-visa-body-request-form">
                            <span>Введите номер телефона для связи с Вами</span>
                            <div className="p-visa-body-request-form__input">
                                <UiInput
                                    placeholder='+7 --- --- -- --'
                                    name={'query'}
                                />
                                <UiButton template={'search_right'} type={'submit'} colors={{
                                    button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
                                    icon: [COLORS.WHITE, COLORS.WHITE],
                                }}>
                                    <span>Отправить</span>
                                </UiButton>
                            </div>
                        </div>
                    </UiForm>

                </div>
                <div className="p-visa--aside">
                    <PVisaManager/>
                    <PVisaCountries/>
                    <PVisaServices/>
                </div>
            </UiPage.Wrap>


        </UiPage>
    )
});
