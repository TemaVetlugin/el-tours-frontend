import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'

import { Layout, LayoutTitle } from "shared/layout";
import { UiBoundary, UiBreadcrumbs, UiGrid, UiIcon, UiSeo, UiWrap } from "shared/uikit";
import { COLORS, MEDIA_POINTS, BREADCRUMBS } from "shared/contants";
import { ApplicationDataType } from "shared/types";
import { BootstrapModule } from "shared/modules";
import { getApplicationData } from "shared/server";
import { useObservable } from "shared/hooks";

import "./index.scss";

type PropsType = {
    application: ApplicationDataType
}

const ContactsPage: NextPage<PropsType> = observer(({ application }) => {
    // BootstrapModule.application(application)

    return (
        <Layout>
            <UiSeo title={'Контакты'}/>
            <UiWrap>
                <UiBreadcrumbs items={[BREADCRUMBS.CONTACTS()]}/>
                <LayoutTitle value='Контакты'/>
                <UiGrid className={'p-contacts'}
                        media={{
                            [MEDIA_POINTS.IS_360]: { columns: 1, gap: 16 },
                            [MEDIA_POINTS.IS_768]: { columns: '370px auto', gap: 20 },
                            [MEDIA_POINTS.IS_1024]: { columns: '760px auto', gap: 20 },
                            [MEDIA_POINTS.IS_1440]: { columns: '860px auto', gap: 20 }
                        }}
                >
                    <UiGrid
                        media={{
                            [MEDIA_POINTS.IS_360]: { columns: 1, gap: 16 },
                            [MEDIA_POINTS.IS_768]: { columns: 1, gap: 20 },
                            [MEDIA_POINTS.IS_1024]: { columns: 2, gap: 20 },
                        }}
                    >
                        <div className="p-contacts-item">
                            <div className="p-contacts-item__icon">
                                <UiIcon size={60} name={'location'} color={COLORS.GREEN}/>
                            </div>
                            <div className="p-contacts-item__inner">
                                <div className="p-contacts-item__label">Адрес:</div>
                                <div className="p-contacts-item__value">Вписать адрес</div>
                            </div>
                        </div>
                        <div className="p-contacts-item">
                            <div className="p-contacts-item__icon">
                                <UiIcon size={60} name={'mail'} color={COLORS.GREEN}/>
                            </div>
                            <div className="p-contacts-item__inner">
                                <div className="p-contacts-item__label">Информационная запись</div>
                                <a href="mailto:info@ya-apteka.ru" className="p-contacts-item__value">info@ya-apteka.ru</a>
                            </div>
                        </div>
                   </UiGrid>
                    <div className="p-contacts__image">
                        <div className="p-contacts__img" style={{backgroundImage: 'url("./assets/images/contacts.png")'}}/>
                    </div>
                </UiGrid>
            </UiWrap>
        </Layout>
    )
});

// export const getServerSideProps: GetServerSideProps<PropsType> = async () => {
//     return {
//         props: {
//             application: await getApplicationData(),
//         }
//     }
// }
export default ContactsPage;
