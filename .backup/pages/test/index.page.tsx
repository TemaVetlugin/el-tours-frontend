import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

import { Layout, LayoutTitle } from "shared/layout";
import { ReturnType } from "shared/types";
import { getApplicationData } from "shared/server";
import {
    UiArticleTile,
    UiBoundary,
    UiButton,
    UiCard,
    UiCheckbox,
    UiIcon,
    UiRange,
    UiWrap,
    UiFormControl,
    UiGrid,
    UiInput,
    UiTextarea,
    UiRadio,
    UiSelect,
    UiTabs,
    UiSeo,
    UiBreadcrumbs,
    UiPagination,
    UiQuantity,
    UiNewsTile,
    UiCardTile,
    UiDropdown,
    UiEmpty,
    UiEmpty2,
    UiLink, UiLoading, UiTooltip, UiTypography, UiHtml, UiSocialShare,
} from "shared/uikit";
import { useObservable } from "shared/hooks";
import { BootstrapModule } from "shared/modules";
import { CCatalogProductsGrid } from "shared/components";
import { COLORS, BREADCRUMBS, ROUTES } from "shared/contants";
import React from "react";
import { getTabsItems } from "../product/utilities/getTabsItems";
import { CatalogProductModel } from "shared/models";
import classnames from "classnames";
import { UiBadge } from "shared/uikit/UiBadge";

type PropsType = {
    application: ReturnType<typeof getApplicationData>
}

const TestPage: NextPage<PropsType> = observer(({ application }) => {
    BootstrapModule.application(application);

    const store = useObservable({
        value: [20, 40]
    });

    return (
        <Layout>
            <UiSeo title={'Тестовая страница'}/>
            <UiWrap>
                <UiBreadcrumbs items={[BREADCRUMBS.CART(), BREADCRUMBS.CHECKOUT()]}/>
                <LayoutTitle value={'Заголовок страницы'}/>
                <UiGrid gap={20}>
                    <h2>Icons</h2>
                    <UiGrid columns={20} gap={20}>
                        <UiIcon size={24} name="check14"/>
                        <UiIcon size={24} name="overPerformed"/>
                        <UiIcon size={24} name="plus"/>
                        <UiIcon size={24} name="minus"/>
                        <UiIcon size={24} name="minusSquare"/>
                        <UiIcon size={24} name="plusSquare"/>
                        <UiIcon size={24} name="checkSquare"/>
                        <UiIcon size={24} name="plusCircle"/>
                        <UiIcon size={24} name="minusCircle"/>
                        <UiIcon size={24} name="chevronDown"/>
                        <UiIcon size={24} name="chevronLeft"/>
                        <UiIcon size={24} name="chevronRight"/>
                        <UiIcon size={24} name="chevronUp"/>
                        <UiIcon size={24} name="phone"/>
                        <UiIcon size={24} name="menu"/>
                        <UiIcon size={24} name="menuOpen"/>
                        <UiIcon size={24} name="search"/>
                        <UiIcon size={24} name="box"/>
                        <UiIcon size={24} name="cart"/>
                        <UiIcon size={24} name="heart"/>
                        <UiIcon size={24} name="user"/>
                        <UiIcon size={24} name="stocks"/>
                        <UiIcon size={24} name="more"/>
                        <UiIcon size={24} name="rub"/>
                        <UiIcon size={24} name="bookmark"/>
                        <UiIcon size={24} name="arrowUpRight"/>
                        <UiIcon size={24} name="sortDown"/>
                        <UiIcon size={24} name="sortUp"/>
                        <UiIcon size={24} name="close"/>
                        <UiIcon size={24} name="share"/>
                        <UiIcon size={24} name="exit"/>
                        <UiIcon size={24} name="calendar"/>
                        <UiIcon size={24} name="edit"/>
                        <UiIcon size={24} name="trash"/>
                        <UiIcon size={24} name="filter"/>
                        <UiIcon size={24} name="arrowRotate"/>
                        <UiIcon size={24} name="warning"/>
                        <UiIcon size={24} name="download"/>
                    </UiGrid>
                    <h2>Buttons</h2>
                    <UiGrid columns={5} gap={20}>
                        <UiFormControl>
                            <UiButton
                                size="large"
                                iconOnly={true}
                                colors={{
                                    button: [COLORS.PRIMARY, COLORS.PRIMARY_DARK],
                                    label: [COLORS.WHITE, COLORS.WHITE]
                                }}
                            >
                                <UiIcon size={24} name={'cart'} color={COLORS.WHITE}/>
                            </UiButton>
                        </UiFormControl>
                        <UiFormControl>
                            <UiButton
                                label="Название кнопки"
                                colors={{
                                    button: [COLORS.PRIMARY, COLORS.PRIMARY_DARK],
                                    label: [COLORS.WHITE, COLORS.WHITE]
                                }}
                            />
                        </UiFormControl>
                        <UiFormControl>
                            <UiButton
                                colors={{
                                    button: [COLORS.PRIMARY, COLORS.PRIMARY_DARK],
                                    label: [COLORS.WHITE, COLORS.WHITE]
                                }}
                            >
                                <UiIcon size={24} name={'cart'} color={COLORS.WHITE}/>
                                <span>Название кнопки</span>
                            </UiButton>
                        </UiFormControl>
                        <UiFormControl>
                            <UiButton
                                colors={{
                                    button: [COLORS.PRIMARY, COLORS.PRIMARY_DARK],
                                    label: [COLORS.WHITE, COLORS.WHITE]
                                }}
                            >
                                <span>Название кнопки</span>
                                <UiIcon size={24} name={'cart'} color={COLORS.WHITE}/>
                            </UiButton>
                        </UiFormControl>
                        <UiFormControl>
                            <UiButton
                                label="Название кнопки"
                                colors={{
                                    button: [COLORS.PRIMARY, COLORS.PRIMARY_DARK],
                                    label: [COLORS.WHITE, COLORS.WHITE]
                                }}
                                isDisabled={true}
                            />
                        </UiFormControl>
                        <UiFormControl>
                            <UiButton
                                iconOnly={true}
                                colors={{
                                    button: [COLORS.WHITE, COLORS.BLUE_LIGHT],
                                    border: [COLORS.PRIMARY, COLORS.PRIMARY],
                                    label: [COLORS.PRIMARY, COLORS.PRIMARY]
                                }}
                            >
                                <UiIcon size={24} name={'cart'} color={COLORS.PRIMARY}/>
                            </UiButton>
                        </UiFormControl>
                        <UiFormControl>
                            <UiButton
                                label="Название кнопки"
                                colors={{
                                    button: [COLORS.WHITE, COLORS.BLUE_LIGHT],
                                    border: [COLORS.PRIMARY, COLORS.PRIMARY],
                                    label: [COLORS.PRIMARY, COLORS.PRIMARY]
                                }}
                            />
                        </UiFormControl>
                        <UiFormControl>
                            <UiButton
                                colors={{
                                    button: [COLORS.WHITE, COLORS.BLUE_LIGHT],
                                    border: [COLORS.PRIMARY, COLORS.PRIMARY],
                                    label: [COLORS.PRIMARY, COLORS.PRIMARY]
                                }}
                            >
                                <UiIcon size={24} name={'cart'} color={COLORS.PRIMARY}/>
                                <span>Название кнопки</span>
                            </UiButton>
                        </UiFormControl>
                        <UiFormControl>
                            <UiButton
                                colors={{
                                    button: [COLORS.WHITE, COLORS.BLUE_LIGHT],
                                    border: [COLORS.PRIMARY, COLORS.PRIMARY],
                                    label: [COLORS.PRIMARY, COLORS.PRIMARY]
                                }}
                            >
                                <span>Название кнопки</span>
                                <UiIcon size={24} name={'cart'} color={COLORS.PRIMARY}/>
                            </UiButton>
                        </UiFormControl>
                        <UiFormControl>
                            <UiButton
                                label="Название кнопки"
                                colors={{
                                    button: [COLORS.WHITE, COLORS.BLUE_LIGHT],
                                    border: [COLORS.PRIMARY, COLORS.PRIMARY],
                                    label: [COLORS.PRIMARY, COLORS.PRIMARY]
                                }}
                                isDisabled={true}
                            />
                        </UiFormControl>
                        <UiFormControl>
                            <UiButton
                                iconOnly={true}
                                colors={{
                                    button: [COLORS.WHITE, COLORS.BLUE_LIGHT],
                                    label: [COLORS.PRIMARY, COLORS.PRIMARY]
                                }}
                            >
                                <UiIcon size={24} name={'cart'} color={COLORS.PRIMARY}/>
                            </UiButton>
                        </UiFormControl>
                        <UiFormControl>
                            <UiButton
                                label="Название кнопки"
                                colors={{
                                    button: [COLORS.WHITE, COLORS.BLUE_LIGHT],
                                    label: [COLORS.PRIMARY, COLORS.PRIMARY]
                                }}
                            />
                        </UiFormControl>
                        <UiFormControl>
                            <UiButton
                                colors={{
                                    button: [COLORS.WHITE, COLORS.BLUE_LIGHT],
                                    label: [COLORS.PRIMARY, COLORS.PRIMARY]
                                }}
                            >
                                <UiIcon size={24} name={'cart'} color={COLORS.PRIMARY}/>
                                <span>Название кнопки</span>
                            </UiButton>
                        </UiFormControl>
                        <UiFormControl>
                            <UiButton
                                colors={{
                                    button: [COLORS.WHITE, COLORS.BLUE_LIGHT],
                                    label: [COLORS.PRIMARY, COLORS.PRIMARY]
                                }}
                            >
                                <span>Название кнопки</span>
                                <UiIcon size={24} name={'cart'} color={COLORS.PRIMARY}/>
                            </UiButton>
                        </UiFormControl>
                        <UiFormControl>
                            <UiButton
                                label="Название кнопки"
                                href={""}
                                colors={{
                                    button: [COLORS.WHITE, COLORS.BLUE_LIGHT],
                                    label: [COLORS.PRIMARY, COLORS.PRIMARY]
                                }}
                                isDisabled={true}
                            />
                        </UiFormControl>
                        <UiLink
                            href={'#'}
                            className={'underline-wave underline-wave--large'}
                        >
                            <span>Смотреть все</span>
                            <UiIcon size={15} name={'chevronRightBold'} color={COLORS.RED}/>
                        </UiLink>

                        <UiLink className={'underline-wave underline-wave--small'}>
                            <UiIcon size={24} name={'clock'} color={COLORS.RED}/>
                            <span>Напомнить заказать</span>
                        </UiLink>
                        <UiLink className={'underline-wave underline-wave--primary'}>
                            <span>Смотреть все</span>
                        </UiLink>
                        <UiLink
                            href={'#'}
                            className={'underline-wave underline-wave--primary underline-wave--line-small'}
                        >
                            <span>Скачать</span>
                        </UiLink>
                    </UiGrid>
                    <h2>Inputs</h2>
                    <UiGrid columns={5} gap={20}>
                        <UiFormControl>
                            <UiInput placeholder="Label"/>
                        </UiFormControl>
                        <UiFormControl label="Label">
                            <UiInput placeholder="Placeholder"/>
                        </UiFormControl>
                        <UiFormControl hint="Helper text area">
                            <UiInput placeholder="Label"/>
                        </UiFormControl>
                        <UiFormControl errorMessage="Helper text area">
                            <UiInput placeholder="Label"/>
                        </UiFormControl>
                        <UiFormControl>
                            <UiQuantity value={1}/>
                        </UiFormControl>
                    </UiGrid>
                    <h2>Textarea</h2>
                    <UiGrid columns={5} gap={20}>
                        <UiFormControl>
                            <UiTextarea
                                placeholder="Label"
                                rows={6}
                            />
                        </UiFormControl>
                        <UiFormControl label="Helper text area">
                            <UiTextarea
                                placeholder="Label"
                                rows={6}
                            />
                        </UiFormControl>
                        <UiFormControl hint="Helper text area">
                            <UiTextarea
                                placeholder="Placeholder"
                                rows={6}
                            />
                        </UiFormControl>
                        <UiFormControl errorMessage="Helper text area">
                            <UiTextarea
                                placeholder="Placeholder"
                                rows={6}
                            />
                        </UiFormControl>
                    </UiGrid>
                    <h2>checkbox & radiobutton & tab</h2>
                    <UiGrid columns={3} gap={20}>
                        <UiGrid gap={20}>
                            <UiFormControl>
                                <UiCheckbox
                                    name={'Default'}
                                    label='Default'
                                />
                            </UiFormControl>
                            <UiFormControl>
                                <UiCheckbox
                                    value={1}
                                    name={'Default'}
                                    label='Checked'
                                />
                            </UiFormControl>
                            <UiFormControl errorMessage="Helper text area">
                                <UiCheckbox
                                    value={0}
                                    name={'Default'}
                                    label='Error'
                                />
                            </UiFormControl>
                        </UiGrid>
                        <UiGrid gap={20}>
                            <UiFormControl>
                                <UiRadio
                                    value="Selected"
                                    name={'radio'}
                                    items={[
                                        { id: 'Default', name: 'Default' },
                                        { id: 'Selected', name: 'Selected' },
                                    ]}
                                />
                            </UiFormControl>
                        </UiGrid>
                        <UiGrid>
                            <UiTabs
                                items={[
                                    {
                                        id: 1,
                                        name: 'Tab1',
                                    },
                                    {
                                        id: 2,
                                        name: 'Tab2',
                                    },
                                    {
                                        id: 3,
                                        name: 'Tab3',
                                    },
                                ]}
                                value={1}
                                name={'tab'}
                            />
                        </UiGrid>
                    </UiGrid>
                    <h2>Select</h2>
                    <UiGrid columns={3} gap={20}>
                        <UiGrid gap={40}>
                            <UiFormControl>
                                <UiSelect
                                    name='select'
                                    value="option1"
                                    items={[
                                        { id: 0, name: 'Valuе' },
                                        { id: 1, name: 'Valuе' },
                                        { id: 2, name: 'Valuе' },
                                    ]}
                                />
                            </UiFormControl>
                            <UiFormControl label="Helper text area">
                                <UiSelect
                                    name='select'
                                    value="option1"
                                    items={[
                                        { id: 0, name: 'Valuе' },
                                        { id: 1, name: 'Valuе' },
                                        { id: 2, name: 'Valuе' },
                                    ]}
                                />
                            </UiFormControl>
                            <UiFormControl hint="Helper text area">
                                <UiSelect
                                    name='select'
                                    value="option1"
                                    items={[
                                        { id: 0, name: 'Valuе' },
                                        { id: 1, name: 'Valuе' },
                                        { id: 2, name: 'Valuе' },
                                    ]}
                                />
                            </UiFormControl>
                            <UiFormControl errorMessage="Helper text area">
                                <UiSelect
                                    name='select'
                                    value="option1"
                                    items={[
                                        { id: 0, name: 'Valuе' },
                                        { id: 1, name: 'Valuе' },
                                        { id: 2, name: 'Valuе' },
                                    ]}
                                />
                            </UiFormControl>
                            <UiFormControl>
                                <UiDropdown
                                    label='Сортировать:'
                                    value="1"
                                    name='sort'
                                    items={[{
                                        id: 1,
                                        name: 'По популярности'
                                    }, {
                                        id: 2,
                                        name: 'Сначала дешевле'
                                    }, {
                                        id: 3,
                                        name: 'Сначала дороже'
                                    }, {
                                        id: 4,
                                        name: 'По названию А-Я'
                                    }, {
                                        id: 5,
                                        name: 'По названию Я-А'
                                    }]}
                                />
                            </UiFormControl>
                        </UiGrid>
                    </UiGrid>
                    <br/>
                    <UiGrid columns={4} gap={20}>
                        <UiCardTile
                            name="Спортсменам"
                            href="#"
                            image="https://via.placeholder.com/310x190"
                        />
                        <UiCardTile
                            name="Для будущих мам"
                            href="#"
                            image="https://via.placeholder.com/310x190"
                        />
                    </UiGrid>
                    <UiGrid columns={4} gap={[20, 50]}>
                        <UiNewsTile
                            name="Бережем нервы. Как избавиться от стресса"
                            href="#"
                            image="https://via.placeholder.com/310x380"
                        />
                        <UiNewsTile
                            name="План поддержки здоровья летом"
                            href="#"
                            image="https://via.placeholder.com/310x380"
                        />
                    </UiGrid>
                    <br/>
                    <UiGrid columns={4} gap={[20, 50]}>
                        <UiArticleTile
                            name="Особый уход за кожей при сахарном диабете"
                            href="#"
                            image="https://via.placeholder.com/310x174"
                        />
                        <UiArticleTile
                            name="Уход за пожилыми и ограниченно подвижными людьми"
                            href="#"
                            image="https://via.placeholder.com/310x174"
                            badge="Осталось 8 дней"
                        />
                    </UiGrid>
                    <br/>
                    <UiGrid columns={2} gap={[20, 50]}>
                        <UiArticleTile
                            name="Что принимать будущей маме?"
                            href="#"
                            image="https://via.placeholder.com/640x357"
                            isLarge={true}
                        />
                        <UiArticleTile
                            name="Уход за пожилыми и ограниченно подвижными людьми"
                            href="#"
                            image="https://via.placeholder.com/310x174"
                            isLarge={true}
                            badge="Осталось 8 дней"
                        />
                    </UiGrid>
                    <br/>
                    <UiEmpty2
                        title="По запросу «123» ничего не найдено"
                        description="Используйте Каталог или оформите заявку на товар, которого нет в Вашем городе"
                        isSearch
                    />
                    <UiEmpty2/>
                    <UiGrid columns={5}>
                        <UiTooltip label={'Убрать из избранного'}>
                            <UiIcon size={24} name={'heart'} color={[COLORS.GRAY_DARK, COLORS.GRAY_DARK]}/>
                        </UiTooltip>
                        <UiTooltip label={'Доставим на дом'}>
                            <UiBadge
                                icon={'./assets/images/badges/delivery.svg'}
                                isSmall
                            />
                        </UiTooltip>
                        <UiSocialShare/>
                    </UiGrid>
                    <div>
                        <UiBadge
                            label={'Доставим на дом'}
                            color={'#00A3B3'}
                            icon={'./assets/images/badges/delivery.svg'}
                        />
                        <br/>
                        <UiBadge
                            label={'Выгодно'}
                            color={'#EF7F1A'}
                            icon={'./assets/images/badges/wallet.svg'}
                        />
                        <br/>
                        <UiBadge
                            label={'Акция'}
                            color={'#B0CB1F'}
                            icon={'./assets/images/badges/percent.svg'}
                        />
                        <br/>
                        <UiBadge
                            label={'Требуется рецепт'}
                            color={'#E31E24'}
                            icon={'./assets/images/badges/warning.svg'}
                        />
                    </div>
                    <br/>
                    <UiGrid columns={'812px'}>
                        <UiTypography>
                            <h1>Название типовой страницы</h1>
                            <p>
                                Проверь себя и своих близких! Экспресс-тест Covid-19  для выявления антител IgM и IgG к COVID-19
                                уже в продаже. С его помощью можно определить заболевание на начальной стадии или увидеть результат
                                уже после перенесенной болезни, подтверждающий наличие  иммунитета.
                            </p>
                            <img src="https://via.placeholder.com/812x453" alt=""/>
                            <p>
                                Проверь себя и своих близких! Экспресс-тест Covid-19  для выявления антител IgM и IgG к COVID-19
                                уже в продаже. С его помощью можно определить заболевание на начальной стадии или увидеть результат
                                уже после перенесенной болезни, подтверждающий наличие  иммунитета.
                            </p>
                            <p>
                                Проверь себя и своих близких! Экспресс-тест Covid-19  для выявления антител IgM и IgG к COVID-19
                                уже в продаже. С его помощью можно определить заболевание на начальной стадии или увидеть результат
                                уже после перенесенной болезни, подтверждающий наличие  иммунитета.
                            </p>
                            <blockquote>
                                Конкурс «Лучший продукт» проводится ежегодно в целях увеличения объемов экспорта и повышения
                                конкурентоспособности российской агропродовольственной продукции, роста отечественного производства
                                и импортозамещения, пропаганды инновационных достижений в области качества и безопасности
                                агропродовольственной продукции и продвижения новых продуктов на российском и международном рынках.
                            </blockquote>
                            <h2>Заголовок Н2 на типовой странице</h2>
                            <h4>Поэтому, одноразовое заменяем многоразовым:</h4>
                            <ul>
                                <li>Вместо одноразовых стаканов используем многоразовые кружки.</li>
                                <li>Под воду купите многоразовую бутылку, которую можно наполнять.</li>
                            </ul>
                            <p>
                                Проверь себя и своих близких! Экспресс-тест Covid-19  для выявления антител IgM и IgG к COVID-19
                                уже в продаже. С его помощью можно определить заболевание на начальной стадии или увидеть результат
                                уже после перенесенной болезни, подтверждающий наличие  иммунитета.
                            </p>
                            <h3>Заголовок Н3 на типовой странице</h3>
                            <ol>
                                <li>Вместо одноразовых стаканов используем многоразовые кружки.</li>
                                <li>Под воду купите многоразовую бутылку, которую можно наполнять.</li>
                            </ol>
                        </UiTypography>
                    </UiGrid>
                </UiGrid>
                {/*<CCatalogProductsGrid catalogProducts={[]} isLoading/>*/}
                {/*<UiCard>*/}
                {/*    <UiCheckbox value={0} label='asdasd'/>*/}
                {/*    <UiCheckbox value={1} label='asdasd 21231'/>*/}
                {/*</UiCard>*/}
                {/*<UiIcon color='#000' size={20} name={'arrowTop'}/>*/}
                {/*<UiRange min={0} max={100} value={store.value} onChange={({ value }) => {*/}
                {/*    store.set("value", value as number[]);*/}
                {/*}}/>*/}
                {/*<UiBoundary isError onAction={() => {*/}
                {/*}}/>*/}
            </UiWrap>
        </Layout>
    )
});

export const getServerSideProps: GetServerSideProps<PropsType> = async (context) => {
    return {
        props: {
            application: await getApplicationData(),
        },
    }
}

export default TestPage;
