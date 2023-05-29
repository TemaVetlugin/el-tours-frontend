import React from "react";
import { observer } from "mobx-react";

import { MEDIA_POINTS, BREADCRUMBS, ROUTES } from "shared/contants";
import { Layout, LayoutTitle } from "shared/layout";
import { UiBreadcrumbs, UiGrid, UiSeo, UiWrap } from "shared/uikit";
import { CProfileMenu } from "shared/components";

type PropsType = {
    title?: string
    children?: React.ReactNode
}

export const PProfileLayout = observer(({ children, title }: PropsType) => {
    return (
        <Layout>
            <UiSeo title={title || 'Личные данные'}/>
            <UiWrap>
                <UiBreadcrumbs items={[{ href: ROUTES.PROFILE(), name: 'Профиль' }, BREADCRUMBS.PROFILE()]}/>
                <LayoutTitle value={title || 'Личные данные'}/>
                <UiGrid media={{
                    [MEDIA_POINTS.IS_360]: { columns: 1, gap: 16 },
                    [MEDIA_POINTS.IS_1024]: { columns: '234px 1fr', gap: 30 },
                }}>
                    <CProfileMenu/>
                    {children}
                </UiGrid>
            </UiWrap>
        </Layout>
    )
});

