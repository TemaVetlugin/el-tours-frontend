'use client';

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { UiDatepicker, UiPage } from "shared/ui";

export default function TestPage() {
    const [count, setCount] = useState(1)
    const router = useRouter();

    const handleClick = () => {
        router.replace(`/test?date=${Date.now()}`);
    }

    return (
        <UiPage>
            <UiPage.Wrap>
                <UiPage.Header title={'Каталог'}/>
                <button onClick={handleClick}>test</button>
                <div onClick={() => setCount(count + 1)}>count: {count}</div>
                <UiDatepicker/>
            </UiPage.Wrap>
        </UiPage>
    );
}
