import { makeEnum } from "./utilities/makeEnum";

export const UserTypeEnum = makeEnum({
    Verified: {
        id: 'verified',
        name: 'Подтвержденный'
    },
    Anonymous: {
        id: 'anonymous',
        name: 'Анонимный'
    },
} as const, {
    id: null,
    name: 'Неопределён',
});
