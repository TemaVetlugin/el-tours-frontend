import React from "react";
import { Metadata } from "next";

import { Client } from "./client";
import './page.scss';

export default function CartPage() {
    return <Client/>
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Корзина',
    };
}
