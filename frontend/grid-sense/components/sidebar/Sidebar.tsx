"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./Sidebar.css";
import "../../globals.css";
import { useAuth } from "../../contexts/AuthContext";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState("0");
  const { currentUser } = useAuth();

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
          <div className="z-10 ps-4 text-2xl cursor-pointer">Remolist</div>
        </Link>
      </div>
      <div className="flex items-center h-[5rem] z-10 pe-4">
        {currentUser ? (
          <Link href="/account" onClick={() => setOpen(false)}>
            <div className="text-xl rl-color-primary px-4 cursor-pointer">
              My Account
            </div>
          </Link>
        ) : (
          <Link href="/login" onClick={() => setOpen(false)}>
            <div className="text-xl rl-color-primary pe-6 cursor-pointer">
              Sign in
            </div>
          </Link>
        )}
      </div>
      <div
        className={`rl-background-blur ${open ? "open" : ""} z-30`}
        style={{ width }}
        onClick={open ? handleClick : undefined}
      />
      <div className="rl-background-30 backdrop-blur-md absolute top-0 left-0 z-[9] w-screen h-[5rem]" />
      <div className={`text-xl fullscreen-panel ${open ? "open" : ""} flex`}>
        <div className="p-6 ms-[3px] pt-14 rl-color-primary h-full w-[16rem]">
          {!currentUser ? (
            <span className="h-full w-full py-1">
              <Link href="/login" onClick={() => setOpen(false)}>
                <div className="w-full h-full pt-4 pb-1">Sign in</div>
              </Link>
            </span>
          ) : (
            <div className="pt-2 flex flex-col h-full justify-between">
              <div className="flex flex-col h-full">
                {/* <Link href="/saved" onClick={() => setOpen(false)}>
                  <div className="w-full h-full pt-4 pb-1">Saved</div>
                </Link> */}
                <Link href="/account" onClick={() => setOpen(false)}>
                  <div className="w-full h-full pt-1">Account</div>
                </Link>
              </div>
              <div>
                <Link href="/logout" onClick={() => setOpen(false)}>
                  <div className="w-full h-[2rem] pt-1">Sign out</div>
                  <div className="w-full rl-color-tertiary text-sm truncate">
                    {currentUser.email}
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
