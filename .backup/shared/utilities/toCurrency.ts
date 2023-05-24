export const toCurrency = (value: number, prefix = '') => {
    const price = Math.round(value * 100) / 100;
    const priceFormatted = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price);

    return `${prefix}${priceFormatted}`;
}
