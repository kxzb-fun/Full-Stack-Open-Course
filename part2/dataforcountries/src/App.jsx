import { useState, useEffect } from "react";

import api from "./servers/countries";

const App = () => {
  const [countryList, setCountryList] = useState([]);
  const [filterCountryList, setFilterCountryList] = useState([]);
  const [countryName, setCountryName] = useState("");
  useEffect(() => {
    api.getAllCountries().then((res) => {
      console.log("i was called");
      setCountryList(res.data);
    });
  }, []);
  const SearchResult = () => {
    if (!countryName) {
      return "";
    }
    if (filterCountryList.length > 10) {
      return "too many  countries, specifiy another filter ";
    }
    if (filterCountryList.length == 1) {
      return (
        <div>
          {/* <WetherInfo /> */}
          <CountryInfo />
        </div>
      );
    }
    return <CountryList />;
  };
  const CountryInfo = () => {
    const info = filterCountryList[0];
    return (
      <div>
        <h2>{info.name.common}</h2>
        <p>capital: {info.capital[0]} </p>
        <p>area: {info.area}</p>
        <p>
          languages:
          <ul>
            {Object.keys(info.languages).map((key) => (
              <li key={key}>{info.languages[key]}</li>
            ))}
          </ul>
        </p>

        <p>{info.flag}</p>
      </div>
    );
  };
  // TODO
  const WetherInfo = () => {
    return <div>this is the captal wether info</div>;
  };
  const CountryList = () => {
    return (
      <ul>
        {filterCountryList.map((item) => (
          <li key={item.name.common}>{item.name.common}</li>
        ))}
      </ul>
    );
  };

  const Search = () => {
    const changeCountryName = (e) => {
      const name = e.target.value;

      setCountryName(name);
      if (!name) {
        setFilterCountryList([]);
        return;
      }
      const filterList = countryList.filter((c) =>
        c.name.common.toLowerCase().includes(name.toLowerCase())
      );
      console.log(filterList);
      setFilterCountryList(filterList);
    };
    return (
      <div>
        <span>find countries </span>
        <input value={countryName} onChange={changeCountryName} />
      </div>
    );
  };

  return (
    <div>
      <Search />
      <SearchResult />
    </div>
  );
};

export default App;
