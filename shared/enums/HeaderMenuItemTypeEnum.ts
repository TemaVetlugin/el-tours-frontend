import { makeEnum } from "./utilities/makeEnum";

export const HeaderMenuItemTypeEnum = makeEnum({
    Primary: {
        id: 'primary',
        name: 'Основное'
    },
    Secondary: {
        id: 'secondary',
        name: 'secondary'
    },
} as const, {
    id: null,
    name: 'Неопределён',
});
