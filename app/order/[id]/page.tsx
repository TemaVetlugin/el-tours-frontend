import React from "react";

import { Client } from "./client";
import './page.scss';

type PropsType = {
    params: {
        id: string
    }
}
export default function Page({ params }: PropsType) {
    return <Client id={params.id}/>
}

export async function generateMetadata({ params }: PropsType) {
    return {
        title: `Заказ №${params.id}`,
    };
}
