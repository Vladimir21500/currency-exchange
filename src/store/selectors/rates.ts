import { RootState } from "..";

export const selectRates = (state: RootState) =>
  state.rates.rates?.reduce(
    (acc, el) => ({
      ...acc,
      [el.currency]: el.rate,
    }),
    { UAH: 1 } as any
  );
