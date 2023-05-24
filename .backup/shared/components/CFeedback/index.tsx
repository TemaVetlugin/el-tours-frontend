import React from "react";
import { observer } from "mobx-react";

import { COLORS, ROUTES } from "shared/contants";
import { UiIcon, UiLink } from "shared/uikit";
import { FeedbackModel } from "shared/models";
import { formatDate } from "shared/utilities";

import './index.scss';

type PropsType = {
    feedback: FeedbackModel
}

export const CFeedback = observer(({ feedback }: PropsType) => {
    return (
        <div className="c-feedback">
            <div className="c-feedback__header">
                <div className="c-feedback__name">{feedback.username}</div>
                <time className="c-feedback__date">{formatDate(feedback.date)}</time>
            </div>
            <div className="c-feedback__text">{feedback.description}</div>
            {feedback.isLocal && (
                <UiLink href={ROUTES.FEEDBACK()} className="c-feedback__link">
                    <span>Оставлен на сайте</span>
                    <UiIcon size={24} name={'logo'}/>
                </UiLink>
            )}
            {(feedback.href && !feedback.isLocal) && (
                <UiLink href={feedback.href} className="c-feedback__link" target='_blank'>
                    <span>Читать подробней</span>
                    {feedback.iconName && (
                        <UiIcon size={24} name={feedback.iconName} color={COLORS.GRAY_ICON}/>
                    )}
                </UiLink>
            )}
        </div>
    )
})
