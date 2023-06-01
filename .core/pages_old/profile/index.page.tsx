import React from "react";
import { observer } from "mobx-react";
import { GetServerSideProps, NextPage } from 'next'

import { UiCard, UiCardSection, UiGrid } from "shared/uikit";
import { getApplicationData } from "shared/server";
import { ApplicationDataType } from "shared/types";
import { withRequireAuthorize } from "shared/hoc";
import { BootstrapModule } from "shared/modules";
import { MEDIA_POINTS } from "shared/contants";

import { PProfileForm } from "./components/PProfileForm";
import { PProfileLayout } from "./components/PProfileLayout";

import './index.scss';

type PropsType = {
    application: ApplicationDataType
}

const ProfilePage: NextPage<PropsType> = withRequireAuthorize(observer(({ application }) => {
    BootstrapModule.application(application);

    return (
        <PProfileLayout>
            <UiCard>
                <UiCardSection title='Личные данные'>
                    <UiGrid columns='1fr 294px' gap={68} media={{
                        [MEDIA_POINTS.IS_360]: { columns: 1, gap: 0 },
                        [MEDIA_POINTS.IS_768]: { columns: 1, gap: 0 },
                        [MEDIA_POINTS.IS_1024]: { columns: '1fr 210px', gap: 40 },
                        [MEDIA_POINTS.IS_1440]: { columns: '1fr 294px', gap: 68 },
                    }}>
                        <PProfileForm/>
                    </UiGrid>
                </UiCardSection>
            </UiCard>
        </PProfileLayout>
    )
}));

export const getServerSideProps: GetServerSideProps<PropsType> = async () => {
    return {
        props: {
            application: await getApplicationData(),
        }
    }
}

export default ProfilePage;
