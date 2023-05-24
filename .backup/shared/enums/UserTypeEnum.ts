import { createEnum } from 'shared/utilities';

export const UserTypeEnum = createEnum({
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
