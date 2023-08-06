import { makeEnum } from "./utilities/makeEnum";

export const FooterMenuItemTypeEnum = makeEnum({
    Top: {
        id: 'top',
        name: 'Основное'
    },
    Bottom: {
        id: 'bottom',
        name: 'Дополнительное'
    },

} as const, {
    id: null,
    name: 'Неопределён',
});
