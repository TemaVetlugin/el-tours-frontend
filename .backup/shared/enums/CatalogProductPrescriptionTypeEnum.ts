import { createEnum } from 'shared/utilities';

export const CatalogProductPrescriptionTypeEnum = createEnum({
    With: {
        id: 'with',
        name: 'требуется рецепт',
    },
    Without: {
        id: 'without',
        name: 'без рецепта',
    },
} as const, {
    id: null,
    name: 'Неопределён',
});
