import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { selectRates, selectSortedCurencies } from '../../store/selectors/rates';
import Loader from '../loader/Loader';
import { FaExchangeAlt } from 'react-icons/fa';

import './converter.scss';
import Select from './select/Select';

const Converter: React.FC<{}> = () => {
  const ratesObj = useAppSelector(selectRates);
  const isLoading = useAppSelector((state) => state.rates.isLoading);
  const sortedRates = useAppSelector(selectSortedCurencies);

  const [firstCount, setFirstCount] = useState<string>('');
  const [secondCount, setSecondCount] = useState<string>('');
  const [currencies, setCurrencies] = useState<{ firstCur: string; secondCur: string }>({
    firstCur: 'USD',
    secondCur: 'UAH',
  });

  useEffect(() => {
    if (sortedRates) {
      const secondCount =
        (+firstCount * ratesObj[currencies.firstCur]) / ratesObj[currencies.secondCur];
      setSecondCount(secondCount.toFixed(2));
    }
  }, [currencies]);

  const selectCurHandle = (name: string, value: string): void => {
    setCurrencies({
      ...currencies,
      [name]: value,
    });
  };

  const replaceClickHandler = () => {
    setCurrencies({
      firstCur: currencies.secondCur,
      secondCur: currencies.firstCur,
    });
  };

  const changeFistCountHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFirstCount(event.target.value.replace(/^0+/, ''));
    if (event.target.value[0] === '-') {
      setSecondCount('');
      return;
    }
    const secondCountValue =
      (+event.target.value * ratesObj[currencies.firstCur]) / ratesObj[currencies.secondCur];
    setSecondCount(secondCountValue.toFixed(2));
  };

  const changeSecondCountHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSecondCount(event.target.value.replace(/^0+/, ''));
    if (event.target.value[0] === '-') {
      setFirstCount('');
      return;
    }
    const firstCountValue =
      (+event.target.value * ratesObj[currencies.secondCur]) / ratesObj[currencies.firstCur];
    setFirstCount(firstCountValue.toFixed(2));
  };

  return (
    <div className='converter'>
      <h1 className='converter__title'>ОБМІН ВАЛЮТ</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='converter__container'>
          <div className='converter__firstCur'>
            <div className='converter__input-container'>
              <span className='converter__rate'>
                Курс до гривні: {ratesObj && ratesObj[currencies.firstCur]}
              </span>
              <input
                onChange={changeFistCountHandler}
                type='number'
                value={firstCount}
                max={9999999999}
                min={0}
              />
            </div>
            <Select
              selectCurHandle={selectCurHandle}
              rates={sortedRates}
              name='firstCur'
              value={currencies.firstCur}
            />
          </div>
          <button onClick={replaceClickHandler} className='converter__button'>
            <FaExchangeAlt />
          </button>
          <div className='converter__secondCur'>
            <div className='converter__input-container'>
              <span className='converter__rate'>
                Курс до гривні: {ratesObj && ratesObj[currencies.secondCur]}
              </span>
              <input
                onChange={changeSecondCountHandler}
                type='number'
                value={secondCount}
                max={9999999999}
                min={0}
              />
            </div>
            <Select
              selectCurHandle={selectCurHandle}
              rates={sortedRates}
              name='secondCur'
              value={currencies.secondCur}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Converter;
