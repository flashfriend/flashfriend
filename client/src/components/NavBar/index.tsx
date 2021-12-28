// Nav with Middle Links from Gust UI: https://www.gustui.com/docs/application/elements/navs
import React, { useState } from "react"
import { Link } from "react-router-dom";

// TODO: Change black font to text-neutral-900

function NavTripleMenu() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex items-center h-20 px-6 justify-between shadow-sm bg-slate-100 relative z-50">
      <Link to='/' className="flex-1 no-underline flex h-8 items-center">
        <svg className="w-6 h-6 fill-amber-400 stroke-amber-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        <h1 className="text-xl font-bold">
          flashfriend
        </h1>
      </Link>
      <div className="flex-none hidden md:flex md:justify-center md:h-full">
        <Link
          to="/home"
          className="block h-full flex items-center mx-4 px-2 border-b-2 border-transparent transition-colors duration-300 ease-in-out hover:text-amber-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> Home
        </Link>
        <Link
          to="/cards"
          className="block h-full flex items-center mx-4 px-2 transition-colors duration-300 ease-in-out hover:text-amber-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg> My Cards
        </Link>
        <Link
          to="/settings"
          className="block h-full flex items-center mx-4 px-2 border-b-2 border-transparent transition-colors duration-300 ease-in-out hover:text-amber-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Settings
        </Link>
      </div>
      <div className="text-black text-3xl cursor-pointer md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        { mobileOpen ?
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> :
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        }
      </div>
      {mobileOpen && (
        <div className="bg-white absolute top-full left-0 flex flex-col w-full py-8 shadow-sm lg:hidden">
          <div className="flex-1 flex flex-col items-center text-xl">
            <Link
              to="/home"
              className="no-underline px-2 my-2 font-medium hover:text-amber-600"
            >
              Home
            </Link>
            <Link
              to="/cards"
              className="no-underline px-2 py-1 my-2 font-medium hover:text-amber-600"
            >
              My Cards
            </Link>
            <Link
              to="/settings"
              className="no-underline px-2 my-2 font-medium hover:text-amber-600"
            >
              Settings
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavTripleMenu