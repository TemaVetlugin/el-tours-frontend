import React from "react";
import { observer } from "mobx-react";

import { COLORS } from "shared/contants";
import { UiButton, UiModal, UiModalActions, UiModalDescription, UiModalTitle } from "shared/uikit";
import { NotifierModule } from "./NotifierModule";

export const NotifierModuleComponent = observer(() => {
    return (
        <UiModal isOpened={NotifierModule.isOpened} onClose={NotifierModule.hide} width={450}>
            <UiModalTitle value={NotifierModule.title}/>
            <UiModalDescription value={NotifierModule.description} style={{textAlign: 'center'}}/>
            <UiModalActions>
                {NotifierModule.type === 'prompt' && (
                    <UiButton type={'submit'} label={NotifierModule.cancelLabel} colors={{
                        button: [COLORS.TRANSPARENT, COLORS.PRIMARY],
                        label: [COLORS.PRIMARY, COLORS.WHITE],
                        border: [COLORS.PRIMARY, COLORS.PRIMARY],
                    }} onClick={() => {
                        NotifierModule.hide()
                        NotifierModule.cancel && NotifierModule.cancel();
                    }}/>
                )}
                <UiButton hasBorder={false} type={'submit'} label={NotifierModule.successLabel} colors={{
                    button: [COLORS.PRIMARY_GRADIENT, COLORS.PRIMARY],
                    label: [COLORS.WHITE, COLORS.WHITE]
                }} onClick={() => {
                    NotifierModule.hide()
                    NotifierModule.success && NotifierModule.success();
                }}/>
            </UiModalActions>
        </UiModal>
    )
})
