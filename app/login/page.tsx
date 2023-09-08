import React from "react";

import { Client } from "./client";

import './page.scss';
import { Metadata } from "next";

export default function Page() {
    return <Client/>
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Войти',
    };
}
