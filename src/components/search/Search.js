import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { options, url } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inpValue) => {
    return fetch(`${url}?minPopulation=1000000&namePrefix=${inpValue}`, options)
      .then((response) => response.json())
      .then((responsse) => {
        return {
          options: responsse.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((error) => console.error(error));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <div>
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default Search;
