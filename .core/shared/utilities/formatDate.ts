import { format as dateFormat, parse, parseISO } from "date-fns";

export const formatDate = (value: string, format: string = 'dd.MM.yyyy', rawFormat: string = 'iso') => {
    try {
        if (rawFormat === 'iso') {
            return value ? dateFormat(parseISO(value), format) : ''
        }
        return value ? dateFormat(parse(value, rawFormat, new Date()), format) : ''
    } catch (e: any) {
        console.log(e.message);
        return 'ошибка обработки даты';
    }
}
