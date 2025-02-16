"use client";
import Sidebar from "./components/sidebar/Sidebar";
import Searchbar from "./components/searchbar/Searchbar";
import Result from "./components/result/Result";
import { useState, useEffect } from "react";

export default function Home() {
  const [home, setHome] = useState(true);
  const [animating, setAnimating] = useState(false);

  // ---- Commented out for initial deployment ----
  // function onSearch(zip: string) {
  function onSearch() {
    // TODO: API call and display results
  }

  useEffect(() => {
    if (!home) {
      setAnimating(true);
      const timer = setTimeout(() => setAnimating(false), 1500); // Match this to your transition duration
      return () => clearTimeout(timer);
    }
  }, [home]);

  return (
    <main
      className={`flex flex-col justify-start ${
        home ? "my-[30vh]" : "my-[-5rem]"
      } transition-all duration-[1.5s] ease`}
    >
      <Sidebar setHome={setHome} />
      <div className={`flex flex-col items-center no-highlight`}>
        <div className={`${!home && !animating ? "opacity-0" : ""}`}>
          <div className="text-6xl cursor-default w-[100vw] text-center">
            ThermaSense AI
          </div>
          <p className="pb-4 w-[100vw] text-center">
            The smart solution to energy optimizations
          </p>
        </div>

        <div
          className={`w-[90vw] flex transition-[margin] duration-[1.5s] ease justify-center ${
            home ? "ms-0" : "ms-[50vw] md:ms-0"
          }`}
        >
          <Searchbar onSearch={onSearch} setHome={setHome} />
        </div>

        {!home && !animating && (
          <div className="text-center mt-24 w-[60vw] h-[60vh]">
            <Result />
          </div>
        )}
      </div>
    </main>
  );
}
