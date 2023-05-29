import { makeEnum } from "./utilities/makeEnum";

export const HeaderMenuTypeEnum = makeEnum({
    Primary: {
        id: 'primary',
        name: 'Основное'
    },
    Secondary: {
        id: 'secondary',
        name: 'Дополнительное'
    },
} as const, {
    id: null,
    name: 'Неопределён',
});
