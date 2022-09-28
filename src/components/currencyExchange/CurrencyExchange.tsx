import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { fetchRates } from "../../store/slicers/ratesSlicer";
import Converter from "../converter/Converter";
import Header from "../header/Header";

import "./currencyExchange.scss";

const CurrencyExchange: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchRates());
  }, []);

  return (
    <main className='currency-exchange'>
      <Header />
      <Converter />
    </main>
  );
};

export default CurrencyExchange;
