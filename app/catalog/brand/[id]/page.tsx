import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Client } from "./client";
import { MARKS } from "./marks";

import './page.scss';

type PropsType = {
    params: {
        id: string
    }
}

export default function Page({ params }: PropsType) {
    if (!MARKS[params.id]) {
        notFound();
        return null;
    }

    return <Client id={params.id}/>
}

export async function generateMetadata({ params }: PropsType): Promise<Metadata> {
    if (!MARKS[params.id]) {
        return {};
    }

    return {
        title: MARKS[params.id]
    }
}
