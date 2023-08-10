'use client';

import { observer } from "mobx-react-lite";
import React from "react";

import { COLORS } from "shared/contants";
import { useRouter, useSearchParams } from "shared/hooks";
import { UiButton } from "shared/ui";

type PropsType = {
    label: string,
    count: number,
    name: string
}

export const PSearchTabButton = observer(({ label, name, count }: PropsType) => {
    const searchParams = useSearchParams({
        tab: 'catalogProducts'
    });
    const router = useRouter();

    if (count === 0) {
        return null;
    }
    return (
        <UiButton
            template={"small"}
            label={`${label}: ${count}`}
            onClick={() => router.replace(null, {
                ...searchParams,
                page: 1,
                tab: name
            })}
            colors={searchParams.tab !== name ? {
                button: [COLORS.TRANSPARENT, COLORS.GRAY_SECONDARY],
                border: [COLORS.GRAY_PRIMARY, COLORS.GRAY_SECONDARY],
                label: [COLORS.GRAY_PRIMARY, COLORS.WHITE],
            } : {
                button: [COLORS.GRAY_PRIMARY, COLORS.GRAY_SECONDARY],
                border: [COLORS.GRAY_PRIMARY, COLORS.GRAY_SECONDARY],
                label: [COLORS.WHITE, COLORS.WHITE]
            }}
        />
    )
});
