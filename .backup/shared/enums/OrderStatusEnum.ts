import { createEnum } from 'shared/utilities';
import { COLORS } from "shared/contants";

export const OrderStatusEnum = createEnum({
    New: {
        id: 'new',
        name: 'Новый',
        color: COLORS.PRIMARY,
    },
    Assembled: {
        id: 'assembled',
        name: 'Готов к выдаче',
        color: COLORS.SECONDARY,
    },
    CanceledByStore: {
        id: 'canceled_by_store',
        name: 'Отменён',
        color: COLORS.SECONDARY,
    },
    CanceledByUser: {
        id: 'canceled_by_user',
        name: 'Отменён',
        color: COLORS.SECONDARY,
    },
    Annulled: {
        id: 'annulled',
        name: 'Аннулирован',
        color: COLORS.SECONDARY,
    },
    InDelivery: {
        id: 'in_delivery',
        name: 'В доставке',
        color: COLORS.YELLOW1,
    },
    Done: {
        id: 'done',
        name: 'Завершенный',
        color: COLORS.PRIMARY
    },
} as const, {
    id: null as null | number,
    name: 'Неопределён',
    color: COLORS.GRAY1
});
