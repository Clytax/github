import { useState } from 'react';
import { moonIcon, sunIcon } from '../../constants/images';

const Header = () => {
  const [theme, setTheme] = useState(0);
  return (
    <div className="header flex justify-space-between">
      <h1 className="header-h1">devfinder</h1>
      <div className="header__right flex items-center">
        {theme === 0 ? (
          <>
            <p className="text-grey">DARK</p>
            <img src={moonIcon} alt="moon" onClick={() => setTheme(1)} />
          </>
        ) : (
          <>
            <p className="text-grey">LIGHT</p>
            <img src={moonIcon} alt="moon" onClick={() => setTheme(0)} />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
