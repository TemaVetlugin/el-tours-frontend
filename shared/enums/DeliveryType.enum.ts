import { makeEnum } from "./utilities/makeEnum";

export const DeliveryTypeEnum = makeEnum({
    Selfpickup: {
        id: 'selfpickup',
        name: 'Самовывоз'
    },
    Courier: {
        id: 'courier',
        name: 'Доставка'
    },
} as const, {
    id: null,
    name: 'Неопределён',
});
