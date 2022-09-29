import { RootState } from '..';
import { IRate } from '../../types/rates';

export const selectRates = (state: RootState): { [cur: string]: number } =>
  state.rates.rates?.reduce(
    (acc, el) => ({
      ...acc,
      [el.currency]: el.rate,
    }),
    { UAH: 1 } as any,
  );

export const selectSortedCurencies = (state: RootState): IRate[] | undefined =>
  state.rates.rates?.slice().sort((a, b) => {
    if (a.descr < b.descr) return -1;
    if (a.descr > b.descr) return 1;
    return 0;
  });
