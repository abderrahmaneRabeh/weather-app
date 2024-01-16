import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geo_Api_Options, geo_Api_url } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (inputValue) => {
    return fetch(
      `${geo_Api_url}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geo_Api_Options
    )
      .then((res) => res.json())
      .then((data) => {
        return {
          options: data.data.map((el) => {
            return {
              value: `${el.latitude} ${el.longitude}`,
              label: `${el.name} ${el.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.log(err))
      
  };

  return (
    <>
      <AsyncPaginate
        placeholder="search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </>
  );
};
export default Search;
