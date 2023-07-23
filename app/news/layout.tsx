import React from "react";
import { Metadata } from "next";
import { useSearchParams } from "next/navigation";
import { headers } from "next/headers";
import qs from "qs";

type PropsType = {
    children: React.ReactNode
}


export async function generateMetadata(params: any, params2: any): Promise<Metadata> {

    return {
        title: 'Я+Аптека',
    };
}

export default async function Layout({ children }: PropsType) {
    return (<>{children}</>);
}
