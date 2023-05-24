import { CatalogProductModel } from "shared/models";

export const getTabsItems = (catalogProduct: CatalogProductModel) => {
    const items: {
        id: string | number | null,
        name: string,
        badge?: string | number | null,
    }[] = [];
    if (catalogProduct.description) {
        items.push({
            id: 'description',
            name: 'Описание'
        });
    }
    if (catalogProduct.instructionFull) {
        items.push({
            id: 'instructionFull',
            name: 'Полная инструкция'
        });
    }
    if (catalogProduct.composition) {
        items.push({
            id: 'composition',
            name: 'Состав'
        });
    }
    if (catalogProduct.indications) {
        items.push({
            id: 'indications',
            name: 'Показания'
        });
    }
    if (catalogProduct.contraindications) {
        items.push({
            id: 'contraindications',
            name: 'Противопоказания'
        });
    }
    if (catalogProduct.instructionSpecial) {
        items.push({
            id: 'instructionSpecial',
            name: 'Специальные указания'
        });
    }
    if (catalogProduct.applicationMode) {
        items.push({
            id: 'applicationMode',
            name: 'Способ применения'
        });
    }
    if (catalogProduct.dispensingConditions) {
        items.push({
            id: 'dispensingConditions',
            name: 'Условия отпуска препарата'
        });
    }

    if (catalogProduct.sideEffects) {
        items.push({
            id: 'sideEffects',
            name: 'Побочные действия'
        });
    }

    // items.push({
    //     id: 'feedbacks',
    //     name: 'Отзывы'
    // });

    items.push({
        id: 'availability',
        name: 'Наличие в аптеках'
    });

    return items;
}
