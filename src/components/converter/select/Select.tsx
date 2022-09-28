import React from 'react';
import { IRate } from '../../../types/rates';

interface ISelect {
  rates: IRate[] | null;
  name: string;
  value: string;
  selectCurHandle: (name: string, value: string) => void;
}

const Select: React.FC<ISelect> = ({ rates, name, value, selectCurHandle }) => {
  const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    selectCurHandle(event.target.name, event.target.value);
  };

  return (
    <select onChange={changeHandler} name={name} value={value}>
      {rates?.map((rate) => (
        <option key={Math.random()} value={rate.currency}>
          {rate.currency} {rate.descr}
        </option>
      ))}
    </select>
  );
};

export default Select;
