import { makeEnum } from "./utilities/makeEnum";

export const OrderPaymentTypeEnum = makeEnum({
    Personal: {
        id: 'personal',
        name: 'При получении'
    },
    Online: {
        id: 'online',
        name: 'Онлайн'
    },
} as const, {
    id: null,
    name: 'Неопределён',
});
