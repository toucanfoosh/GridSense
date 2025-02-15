import React, { useState } from "react";
import "./Searchbar.css";
import { IoMdSearch } from "react-icons/io";

interface Props {
  onSearch: (query: string, location: string) => void;
  height?: string;
  width?: string;
  textFill?: string;
  locationFill?: string;
}

const Searchbar: React.FC<Props> = (props) => {
  // Initialize query state with textFill if provided, otherwise an empty string
  const [query, setQuery] = useState(props.textFill || "");
  const [searching, setSearching] = useState(false);
  const [location, setLocation] = useState(props.locationFill || "");

  let height = "100%";
  let width = "100%";
  if (props.height) {
    height = props.height;
  }
  if (props.width) {
    width = props.width;
  }

  const handleSearch = () => {
    props.onSearch(query, location);
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
        } flex justify-start items-center rl-text rl-border-primary rl-background-secondary rl-searchbar pe-5 relative focus:top-[1px] focus:left-[1px]`}
        style={{ height, width }}
      >
        <div
          className="cursor-pointer h-full flex items-center ps-5 pe-2"
          onClick={handleSearch}
        >
          <IoMdSearch />
        </div>
        <div className="w-full h-full flex">
          <input
            id="search"
            type="text"
            placeholder="Search"
            className="rl-text rl-background-secondary focus:outline-none w-full h-full pe-1"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setSearching(true)}
            onBlur={() => setSearching(false)}
          />
          <input
            id="location"
            type="text"
            placeholder="Location"
            className="rl-text rl-background-secondary focus:outline-none w-full h-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setSearching(true)}
            onBlur={() => setSearching(false)}
          />
        </div>
      </div>
      <div
        className="z-[-1] flex justify-start items-center rl-text rl-background-dark-primary rl-searchbar px-5 absolute top-[2px] left-[2px]"
        style={{ height, width }}
      ></div>
    </div>
  );
};

export default Searchbar;
