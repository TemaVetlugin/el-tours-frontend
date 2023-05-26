type EnumValueType = string | number | null;

type EnumEntryType<T> = {
    id: EnumValueType,
    name: string
} & T & object;

type ResolveEnumReturnType<Value> = EnumEntryType<Value> & {
    in: (values: EnumEntryType<any>[]) => boolean,
    is: (value: EnumEntryType<any>) => boolean,
}

type EnumType<Key extends string, Value> = {
    items: EnumEntryType<Value>[],
    values: Key[],
    from: (id: EnumValueType) => ResolveEnumReturnType<Value>
} & Record<Key, Value>;

const resolveEnum = <Value>(entry: EnumEntryType<Value>): ResolveEnumReturnType<Value> => {
    return {
        ...entry,
        in: (values: EnumEntryType<any>[]) => {
            return values.map(value => value.id).includes(entry.id);
        },
        is: (value: EnumEntryType<any> | string) => {
            return `${value.id}` === `${entry.id}` || `${value}` === `${entry.id}`;
        }
    }
}

export const defineEnum = <Value extends EnumEntryType<any>, Key extends string>(entries: Record<Key, Value>, defaultEnum: Record<keyof Value, any>): EnumType<Key, Value> => {
    const items: EnumEntryType<Value>[] = Object.values(entries);
    const result: Record<string, any> = {
        items: items,
        values: items.map(item => item.id),
        from: (id: EnumValueType) => {
            let value = items.find(item => item.id === id);
            if (!value) {
                value = {...(defaultEnum as object)} as (EnumEntryType<Value> & {
                    id: EnumValueType,
                    name: string
                });
            }
            return resolveEnum(value);
        },
    };
    for (const key in entries) {
        result[key as string] = entries[key];
    }
    return result as EnumType<Key, Value>;
}
