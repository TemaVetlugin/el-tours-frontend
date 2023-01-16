import { observer } from "mobx-react";
import React from "react";

import { UiGrid, UiLink } from "shared/uikit";
import { CATALOG_LETTERS, ROUTES } from "shared/contants";

import image from './assets/image.svg';

import './index.scss';


export const PHomeAlphabet = observer(() => {
    return (
        <div className='p-home-alphabet' style={{ backgroundImage: `url(${image.src})` }}>
            <div className="p-home-alphabet__title">Cписок лекарств по алфавиту</div>
            <div className="p-home-alphabet__items">
                {CATALOG_LETTERS.slice(0, -2).map((letter) => (
                    <UiLink
                        key={letter.id}
                        href={`${ROUTES.CATALOG_BY_NAME()}?query=${letter.id}`}
                        className='p-home-alphabet-item'
                    >
                        <div className="p-home-alphabet-item__inner">
                            {letter.name}
                        </div>
                    </UiLink>
                ))}
            </div>
            <div className="p-home-alphabet__other">
                {CATALOG_LETTERS.slice(-2).map((letter) => (
                    <UiLink
                        key={letter.id}
                        href={`${ROUTES.CATALOG_BY_NAME()}?query=${letter.id}`}
                        className='p-home-alphabet-item p-home-alphabet-item--side'
                    >
                        <div className="p-home-alphabet-item__inner">
                            {letter.name}
                        </div>
                    </UiLink>
                ))}
            </div>
        </div>
    )
});
