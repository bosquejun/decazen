import numeral from 'numeral';

numeral.defaultFormat('0,0.00');

export const getNumeralString = (amount: number) => numeral(amount).format();
