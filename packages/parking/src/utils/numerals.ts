import { ProductPrice } from '@/types';
import numeral from 'numeral';

numeral.defaultFormat('0,0.00');

export const getNumeralString = (amount: number) => numeral(amount).format();

export const getPriceValue = (productPrice: ProductPrice) =>
  `₱${numeral(productPrice.amount).divide(100).format()}`;
