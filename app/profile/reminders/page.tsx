import React from "react";
import { Metadata } from "next";

import { ROUTES } from "shared/contants";

import { Client } from "./client";

import './page.scss';

export default function Page() {
    return <Client/>
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: ROUTES.PROFILE().name,
    };
}
