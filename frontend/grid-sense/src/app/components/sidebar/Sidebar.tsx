"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./Sidebar.css";
import "../../globals.css";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState("0");

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      setWidth("100vw");
    } else {
      const timeoutId = setTimeout(() => {
        setWidth("0");
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [open]);

  return (
    <div className="fixed top-0 left-0 ps-6 justify-between flex w-full z-20 ">
      <div className="flex items-center z-50 h-[5rem]">
        <div id="nav-icon" className={open ? "open" : ""} onClick={handleClick}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Link href="/" onClick={() => setOpen(false)}>
          <div className="z-10 ps-4 text-2xl cursor-pointer gs-text">
            GridSense
          </div>
        </Link>
      </div>
      <div
        className={`gs-background-blur ${open ? "open" : ""} z-30`}
        style={{ width }}
        onClick={open ? handleClick : undefined}
      />
      <div className="gs-background-30 backdrop-blur-md absolute top-0 left-0 z-[9] w-screen h-[5rem]" />
      <div className={`text-xl fullscreen-panel ${open ? "open" : ""} flex`}>
        <div className="p-6 ms-[3px] pt-14 gl-color-primary h-full w-[16rem]">
          <div className="pt-2 flex flex-col h-full justify-between">
            <div className="flex flex-col h-full gs-color-tertiary">
              <Link href="/about" onClick={() => setOpen(false)}>
                <div className="w-full h-full pt-1">About</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
