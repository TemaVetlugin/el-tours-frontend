import { defineEnum } from "./utilities/defineEnum";

export const HeaderMenuTypeEnum = defineEnum({
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
