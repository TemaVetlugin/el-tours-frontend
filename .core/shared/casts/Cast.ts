export type ICast = {
    set: (currentValue: any, newValue: any) => any;
}
export abstract class Cast implements ICast {
    set: (currentValue: any, newValue: any) => any = () => {}
}
