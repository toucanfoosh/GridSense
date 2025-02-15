"use client";
import Sidebar from "./components/sidebar/Sidebar";
import Searchbar from "./components/searchbar/Searchbar";

export default function Home() {
  function onSearch(query: string) {
    window.location.href = `/search?query=${query}&location=${location}`;
  }

  return (
    <main className="flex min-h-[80vh] flex-col justify-center p-24">
      <Sidebar />
      <div className="flex flex-col items-center justify-start p-24">
        <div className="text-6xl p-4 pb-0 cursor-default no-highlight w-[100vw] text-center">
          GridSense
        </div>
        <p className="pb-4 w-[100vw] text-center">
          The smart solution to energy optimizations
        </p>

        <Searchbar onSearch={onSearch} height="3rem" width="50rem" />
      </div>
    </main>
  );
}
