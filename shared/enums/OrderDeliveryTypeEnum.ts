import { makeEnum } from "./utilities/makeEnum";

export const OrderDeliveryTypeEnum = makeEnum({
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
