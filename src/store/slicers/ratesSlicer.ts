import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IRate } from '../../types/rates';

const baseUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

export const fetchRates = createAsyncThunk('rates/fetchRates', async () => {
  try {
    const response = await fetch(baseUrl).then((response) => response.json());
    return response;
  } catch (err) {
    alert('error, try to come back later');
    return null;
  }
});

interface IInitialState {
  rates: IRate[] | null;
  lastUpdate: Date | null;
  isLoading: boolean;
}

const initialState: IInitialState = {
  rates: null,
  lastUpdate: null,
  isLoading: false,
};

export const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRates.fulfilled, (state, action) => {
        const rates = action.payload;
        state.isLoading = false;
        if (action.payload) {
          state.lastUpdate = action.payload[0].exchangedate;
          state.rates = rates.map((rate: any) => ({
            rate: rate.rate,
            descr: rate.txt,
            currency: rate.cc,
          }));
          state.rates?.push({
            rate: 1,
            descr: 'Українська гривня',
            currency: 'UAH',
          });
        }
      })
      .addCase(fetchRates.rejected, (state, action) => {
        alert(action.payload);
        state.isLoading = false;
        state.rates = [];
      });
  },
});

export default ratesSlice.reducer;
