import React, { CSSProperties } from "react";
import { observer } from "mobx-react";
import classnames from "classnames";
import Link from "next/link";

import { useHover } from "shared/hooks";
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
    isRounded?: boolean,
    size?: 'small' | 'normal' | 'large';
    colors?: {
        button?: [string, string] | string,
        label?: [string, string] | string,
        border?: [string, string] | string,
    },
    isDisabled?: boolean,
    iconOnly?: boolean,
}

export const UiButton = observer((
    {
        children,
        type = 'button',
        label,
        isRounded = false,
        size = 'normal',
        href,
        style,
        onClick,
        className,
        colors: _colors,
        isLoading = false,
        isDisabled = false,
        iconOnly = false,
    }: PropsType
) => {
    const { ref, isHovered } = useHover<any>();
    const classNames = classnames('ui-button', `ui-button--${size}`, className, {
        'ui-button--rounded': isRounded,
        'ui-button--disabled': isDisabled,
        'ui-button--icon': iconOnly,
    });

    const colors = {
        button: [COLORS.PRIMARY_GRADIENT, COLORS.PRIMARY],
        label: [COLORS.WHITE, COLORS.WHITE],
        ..._colors
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
                <UiLoading style={{ height: 12 }} color={styles.label.color}/>
            )
        }

        return label || children || 'label';
    }

    if (href) {
        return (
            <Link
                ref={ref}
                href={href}
                className={classNames}
                type={type}
                style={styles.button}
                onClick={(e) => {
                    if (isDisabled) {
                        e.preventDefault();
                        return;
                    }
                    onClick && onClick(e);
                }}
            >
                <div className="ui-button__background" style={styles.background}/>
                <div className='ui-button__inner' style={styles.label}>
                    {content()}
                </div>
            </Link>
        )
    }

    return (
        <button
            ref={ref}
            className={classNames}
            type={type}
            style={styles.button}
            onClick={onClick}
            disabled={isDisabled}
        >
            <div className="ui-button__background" style={styles.background}/>
            <div className='ui-button__inner' style={styles.label}>
                {content()}
            </div>
        </button>
    )
})

