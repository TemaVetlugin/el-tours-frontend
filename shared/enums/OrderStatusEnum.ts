import { makeEnum } from "./utilities/makeEnum";
import { COLORS } from "shared/contants";

export const OrderStatusEnum = makeEnum({
    New: {
        id: 'new',
        name: 'Новый',
        color: [COLORS.GREEN_PRIMARY, COLORS.WHITE],
    },
} as const, {
    id: null,
    name: 'Неопределён',
    color: [COLORS.LIGHT_BLUE, COLORS.GRAY_PRIMARY],
});
