import React, { useState } from "react";
import "./Searchbar.css";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";

interface Props {
  onSearch: (query: string) => number;
  textFill?: string;
  locationFill?: string;
  setHome: (home: boolean) => void;
  setResult: (search: number) => void;
  setQuery: (query: string) => void;
}

const Searchbar: React.FC<Props> = (props) => {
  // Initialize query state with textFill if provided, otherwise an empty string
  const [query, setQuery] = useState(props.textFill || "");
  const [searching, setSearching] = useState(false);

  async function isValidZip(zip: string): Promise<boolean> {
    try {
      const response = await axios.get(`https://api.zippopotam.us/us/${zip}`);
      return response.status === 200;
    } catch {
      return false;
    }
  }

  const handleSearch = async () => {
    if (!isNaN(Number(query)) && query.length === 5) {
      if (!(await isValidZip(query))) {
        return;
      }
      props.setHome(false);
      props.setQuery(query);
      props.setResult(props.onSearch(query));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <div
        className={`${
          searching ? "left-[1px] top-[1px]" : ""
        } h-[3rem] w-[45vw] min-w-[10rem] flex justify-start items-center gs-text gs-border-tertiary gs-background-secondary gs-searchbar pe-5 relative focus:top-[1px] focus:left-[1px]`}
      >
        <div
          className="cursor-pointer h-full flex items-center ps-5 pe-2"
          onClick={handleSearch}
        >
          <IoMdSearch />
        </div>
        <div className="w-full h-full flex">
          <input
            id="zip"
            type="text"
            placeholder="Zip code"
            className="gs-text gs-background-secondary focus:outline-none w-full h-full pe-1"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setSearching(true)}
            onBlur={() => setSearching(false)}
          />
        </div>
      </div>
      <div className="h-[3rem] w-[45vw] min-w-[10rem] z-[-1] flex justify-start items-center gs-text gs-background-dark-tertiary gs-searchbar px-5 absolute top-[2px] left-[2px]"></div>
    </div>
  );
};

export default Searchbar;
