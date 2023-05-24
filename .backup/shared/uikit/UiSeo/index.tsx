import React from "react";
import { observer } from "mobx-react";
import Head from "next/head";

import './index.scss';

type PropsType = {
    title?: string,
    description?: string
    image?: string
    keywords?: string | string[]
}

export const UiSeo = observer(({title = 'Страница', description, keywords: _keywords = [], image}: PropsType) => {
    let keywords = Array.isArray(_keywords) ? _keywords.join(',') : _keywords;

    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta name="language" content="RU"/>
            <meta property="og:locale" content="ru_RU"/>
            <meta charSet="UTF-8"/>
            <meta httpEquiv="Expires" content="0"/>
            <meta httpEquiv="Pragma" content="no-cache"/>
            <meta httpEquiv="Cache-Control" content="no-cache"/>
            <title>{title}</title>
            <meta property="og:title" content={title}/>
            {description && (
                <>
                    <meta name="description" content={description}/>
                    <meta name="og:description" content={description}/>
                </>
            )}
            {keywords && (
                <>
                    <meta name="keywords" content={keywords}/>
                </>
            )}
            {image && (
                <>
                    <meta name="og:image" content={image}/>
                </>
            )}
        </Head>
    )
});
