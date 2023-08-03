'use client';

import React from "react";
import { observer } from "mobx-react-lite";

import { UiLink } from "shared/ui";
import { ROUTES } from "shared/contants";

import { LETTERS } from "./letters";

import './index.scss';

export const LayoutCatalogAlphabet = observer(() => {
    const letters = Object.entries(LETTERS);
    return (
        <div className="layout-catalog-alphabet">
            <div className="layout-catalog-alphabet__label">Товары по алфавиту</div>
            <div className="layout-catalog-alphabet__items">
                {letters.map(letter => (
                    <UiLink href={ROUTES.CATALOG_NAME(letter[0])} key={letter[0]} className="layout-catalog-alphabet__item">
                        {letter[1].label}
                    </UiLink>
                ))}
            </div>
        </div>
    );
});
