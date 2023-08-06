import React from "react";
import { Metadata } from "next";

import { Client } from "./client";

import './page.scss';
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Избранное`,
    };
}

export default function Page() {
    return <Client/>;
};
