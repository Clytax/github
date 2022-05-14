import { useState, useEffect } from 'react';

import { Header, Searchbar, Card } from './components';

import { moonIcon, sunIcon, searchIcon } from './constants/images';

import { usePrefersColorScheme } from '@anatoliygatt/use-prefers-color-scheme';

function App() {
  const [hasError, setHasError] = useState(false);
  const preferredColorScheme = usePrefersColorScheme();

  const [mode, setMode] = useState(0);
  const [searchTermInput, setSearchTermInput] = useState('clytax');
  const [finalSearch, setFinalSearch] = useState('');

  useEffect(() => {
    if (preferredColorScheme === 'light') {
      setMode(0);
    }
    if (preferredColorScheme === 'dark') {
      setMode(1);
    }
  }, [preferredColorScheme]);

  const handleChange = (e) => {
    const value = e.target.value;
    const cleanTerm = value.trim().toLowerCase().toLowerCase();
    setSearchTermInput(cleanTerm);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTermInput != '') {
      setFinalSearch(searchTermInput);
    }
  };
  return (
    <div className={`app font-h1 ${mode === 1 && 'dark-app'}`}>
      <div className="container">
        <div className="header flex justify-space-between">
          <h1 className={`header-h1 ${mode === 1 && 'dark-header-h1 '}`}>
            devfinder
          </h1>
          <div className="header__right flex items-center">
            {mode === 0 ? (
              <>
                <p className="text-grey  header-p">DARK</p>
                <img src={moonIcon} alt="moon" onClick={() => setMode(1)} />
              </>
            ) : (
              <>
                <p className="text-grey dark-header-p">LIGHT</p>
                <img src={sunIcon} alt="moon" onClick={() => setMode(0)} />
              </>
            )}
          </div>
        </div>
        <Searchbar>
          <form
            onSubmit={handleSearch}
            className={`searchbar bg-white shadow-1 ${
              mode === 1 && 'dark-searchbar '
            }`}
          >
            <div className="searchbar__left">
              <img src={searchIcon} alt="search" />
            </div>
            <div className={`searchbar__mid `}>
              {' '}
              {/*  ${hasError && 'searchbar-error'} */}
              <input
                className={`${mode === 1 && 'dark-searchbar-input '}`}
                placeholder="Search GitHub username…"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="searchbar__right">
              <button className="bg-blue text-white fw-bold" type="submit">
                Search
              </button>
            </div>
          </form>
          <Card searchTerm={finalSearch ? finalSearch : 'clytax'} mode={mode} />
        </Searchbar>
      </div>
    </div>
  );
}

export default App;
