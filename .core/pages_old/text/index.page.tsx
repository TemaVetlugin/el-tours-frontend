import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'

import { Layout } from "shared/layout";
import { ReturnType } from "shared/types";
import { getApplicationData } from "shared/server";
import {
    UiWrap,
    UiGrid,
    UiSeo,
    UiTypography,
} from "shared/uikit";
import { BootstrapModule } from "shared/modules";
import { MEDIA_POINTS, BREADCRUMBS, ROUTES } from "shared/contants";
import React from "react";

type PropsType = {
    application: ReturnType<typeof getApplicationData>
}

const TextPage: NextPage<PropsType> = observer(({ application }) => {
    BootstrapModule.application(application);

    return (
        <Layout>
            <UiSeo title={'Тестовая страница'}/>
            <UiWrap>
                {/*<UiBreadcrumbs items={[MENU.CART(), MENU.CHECKOUT()]}/>*/}
                <UiGrid
                    media={{
                        [MEDIA_POINTS.IS_360]: { columns: 1 },
                        [MEDIA_POINTS.IS_1024]: { columns: '812px' },
                    }}
                >
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

export default TextPage;
