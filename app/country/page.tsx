import React from "react";

import { Client } from "./client";

import { Metadata } from "next";
import './page.scss';

export default function Page() {
    return <Client/>
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Страны',
    };
}
