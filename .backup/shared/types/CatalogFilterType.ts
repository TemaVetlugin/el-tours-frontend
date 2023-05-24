type FilterType<TType, TItems> = {
    name: string,
    label: string,
    isCollapsable: boolean,
    type: TType,
    items: TItems
}

type RangeFilterType = FilterType<'range', [number, number]>

type RadioFilterType = FilterType<'radio', {
    id: string | number,
    name: string
}>

type ChecklistFilterType = FilterType<'checklist', {
    id: string | number,
    name: string
}>

type CheckboxFilterType = FilterType<'checkbox', string | boolean | number>

export type CatalogFilterType = RangeFilterType | RadioFilterType | ChecklistFilterType | CheckboxFilterType;
