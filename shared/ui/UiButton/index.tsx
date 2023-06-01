'use client';

import React, { CSSProperties, useState } from "react";
import { observer } from "mobx-react-lite";
import classnames from "classnames";
import Link from "next/link";

import { COLORS } from "shared/contants";

import { UiLoading } from '../UiLoading';

import './index.scss';

type PropsType = {
    children?: React.ReactNode,
    type?: 'button' | 'submit' | 'reset',
    href?: string,
    onClick?: (e: React.MouseEvent) => void,
    label?: string,
    isLoading?: boolean,
    style?: React.CSSProperties,
    className?: string,
    hasBorder?: boolean,
    size?: 'small' | 'normal' | 'large' | 'icon';
    colors?: {
        button?: [string, string] | string,
        label?: [string, string] | string,
        border?: [string, string] | string,
        icon?: [string, string] | string,
    },
    isDisabled?: boolean,
    iconOnly?: boolean,
}

export const UiButton = observer((
    {
        children,
        type = 'button',
        label,
        size = 'normal',
        href,
        style,
        onClick,
        className,
        colors: _colors,
        isLoading = false,
        isDisabled = false,
    }: PropsType
) => {
    const [isHovered, setIsHovered] = useState(false);
    const classNames = classnames('ui-button', `ui-button--${size}`, className, {
        'ui-button--disabled': isDisabled,
    });

    let colors = {
        button: [COLORS.GREEN_PRIMARY, COLORS.GREEN_SECONDARY],
        label: [COLORS.WHITE, COLORS.WHITE],
        icon: [COLORS.WHITE, COLORS.WHITE],
        ..._colors
    }

    if (colors?.icon && !Array.isArray(colors.icon)) {
        colors.icon = [colors.icon, colors.icon];
    }

    const hasBorder = !!colors?.border;

    const styles = {
        button: {
            ...style,
            border: null as null | string,
            background: null as null | string,
        } as CSSProperties,
        background: {
            background: null as null | string,
        } as CSSProperties,
        label: {
            color: null as null | string,
        } as CSSProperties
    };

    if (colors) {
        if (colors?.button) {
            const colorsButton = Array.isArray(colors.button) ? colors.button : [colors.button, colors.button];
            styles.button.background = colorsButton[0];
            styles.background.background = colorsButton[1];
        }

        if (hasBorder && colors?.border) {
            const colorsBorder = Array.isArray(colors.border) ? colors.border : [colors.border, colors.border];
            styles.button.border = !isHovered ? `1px solid ${colorsBorder[0]}` : `1px solid ${colorsBorder[1]}`;
        }
        if (colors?.label) {
            const colorsLabel = Array.isArray(colors.label) ? colors.label : [colors.label, colors.label];
            styles.label.color = !isHovered ? colorsLabel[0] : colorsLabel[1];
        }
    }

    if (!hasBorder) {
        styles.button.border = 'none';
    }

    const content = () => {
        if (isLoading) {
            return (
                <UiLoading style={{ width: 50 }} color={styles.label.color}/>
            )
        }

        return label || children || 'label';
    }

    if (href) {
        return (
            <Link
                href={href}
                className={classNames}
                type={type}
                style={styles.button}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={(e) => {
                    if (isDisabled) {
                        e.preventDefault();
                        return;
                    }
                    onClick && onClick(e);
                }}
            >
                <style jsx>
                    {`
                    .ui-button {
                        ${colors?.icon ? ` --icon-color: ${colors.icon[0]};` : ''}
                    }

                    .ui-button:hover {
                        ${colors.icon ? ` --icon-color: ${colors.icon[1]};` : ''}
                    }
                `}
                </style>
                <div className="ui-button__background" style={styles.background}/>
                <div className='ui-button__inner' style={styles.label}>
                    {content()}
                </div>
            </Link>
        )
    }

    return (
        <button
            className={classNames}
            type={type}
            style={styles.button}
            disabled={isDisabled}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <style jsx>
                {`
                    .ui-button {
                        ${colors?.icon ? ` --icon-color: ${colors.icon[0]};` : ''}
                    }

                    .ui-button:hover {
                        ${colors.icon ? ` --icon-color: ${colors.icon[1]};` : ''}
                    }
                `}
            </style>
            <div className="ui-button__background" style={styles.background}/>
            <div className='ui-button__inner' style={styles.label}>
                {content()}
            </div>
        </button>
    )
})

