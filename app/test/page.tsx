'use client';

import React, { useEffect, useState } from "react";

import { useObserve } from "shared/hooks";
import { UiDatepicker, UiPage } from "shared/ui";
import { useRouter } from "next/navigation";

export default function TestPage() {
    const [count, setCount] = useState(1)
    const router = useRouter();

    const handleClick = () => {
        router.replace(`/test?date=${Date.now()}`);
    }

    return useObserve(() => (
        <UiPage>
            <UiPage.Wrap>
                <UiPage.Header title={'Каталог'}/>
                <button onClick={handleClick}>test</button>
                <div onClick={() => setCount(count + 1)}>count: {count}</div>
                <UiDatepicker/>
            </UiPage.Wrap>
        </UiPage>
    ))
}
