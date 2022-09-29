import React, { useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { selectRates } from '../../store/selectors/rates';

import './header.scss';

const Header: React.FC<{}> = () => {
  const rates = useAppSelector(selectRates);
  const { lastUpdate } = useAppSelector((state) => state.rates);

  return (
    <header className='header'>
      {rates && (
        <div className='header__currencies'>
          <h2 className='header__currency'>
            USD <span className='header__rate'>{rates.USD}</span>{' '}
          </h2>
          <h2 className='header__currency'>
            EUR <span className='header__rate'>{rates.EUR}</span>
          </h2>
        </div>
      )}
      <h2 className='header__lastUpdate'>{`Останнє оновлення від ${lastUpdate}`}</h2>
    </header>
  );
};

export default Header;
