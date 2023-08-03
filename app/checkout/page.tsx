import React from "react";
import { Metadata } from "next";

import { Client } from "./client";

import './page.scss';

type PropsType = {
    searchParams: {
        deliveryTypeId?: string
    }
}

export default function CartPage({searchParams}: PropsType) {
    return <Client deliveryTypeId={searchParams.deliveryTypeId}/>
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Оформление заказа',
    };
}
