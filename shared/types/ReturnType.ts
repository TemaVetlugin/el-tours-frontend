export type ReturnType<T> =
    T extends (...args: any[]) => Promise<infer U>
        ? U
        : T extends (...args: any[]) => infer U
            ? U
            : T;
