'use client';

import React, { useEffect, useState } from "react";

import { useNavigate, useObservable, useObserve } from "shared/hooks";
import { UiPage } from "shared/ui";
import { useRouter } from "next/navigation";

export default function TestPage() {
    const [count, setCount] = useState(1)
    const router = useRouter();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('useEffect')
    }, []);
    const handleClick = () => {
        router.replace(`/test?date=${Date.now()}`);
    }

    return useObserve(() => (
        <UiPage>
            <UiPage.Title value={'Каталог'}/>
            <button onClick={handleClick}>test</button>
            <div onClick={() => setCount(count + 1)}>count: {count}</div>
        </UiPage>
    ))
}
