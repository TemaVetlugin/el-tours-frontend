import React, { ErrorInfo } from "react";
import { observer } from "mobx-react";

import './index.scss';
import { UiEmpty, UiWrap } from "shared/uikit";
import { ROUTES } from "shared/contants";
import { ErrorTracker } from "shared/utilities";

type PropsType = {
    children?: React.ReactNode,
}
export const LayoutError = ({ children }: PropsType) => {
    return (
        <div>{children}</div>
    );
});
// export const LayoutError1 = observer(class extends React.Component<PropsType> {
//     state: {
//         hasError: false
//     }
//     constructor(props: PropsType) {
//         super(props)
//         this.state = { hasError: false }
//     }
//     static getDerivedStateFromError() {
//         return { hasError: true }
//     }
//     componentDidCatch(error: Error, errorInfo: ErrorInfo) {
//         // You can use your own error logging service here
//         ErrorTracker.handle(error, {
//             errorInfo,
//             location: typeof window !== 'undefined' ? window.location : {},
//         });
//     }
//
//     render() {
//         if (this.state.hasError) {
//             return (
//                 <div className="layout-error">
//                     <UiWrap>
//                         <UiEmpty
//                             title={'Произошла непредвиденная ошибка'}
//                             withSearch={false}
//                             linkLabel={'На главную'}
//                             link={ROUTES.HOME()}
//                             description={'Обновите страницу, попробуйте вернуться позже или вернитесь на главную страницу'}
//                         />
//                     </UiWrap>
//                 </div>
//             )
//         }
//
//         return this.props.children
//     }
// })
//
//
