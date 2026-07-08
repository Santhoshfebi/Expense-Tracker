import { Bell, Mail, Search, Moon, Sun } from "lucide-react";

import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      {/* Left Section */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Dashboard
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Welcome back 👋 Track your finances efficiently.
        </p>
      </div>

      {/* Right Section */}

      <div className="flex items-center gap-4">
        {/* Search */}

        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="
              w-64
              h-11
              pl-11
              pr-4
              rounded-2xl
              border
              border-slate-200
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              text-slate-700
              dark:text-white
              outline-none
              focus:ring-2
              focus:ring-[#6C5CE7]
              transition
            "
          />
        </div>

        {/* Theme Toggle */}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="
            h-11
            w-11
            rounded-2xl
            bg-white
            dark:bg-slate-800
            border
            border-slate-200
            dark:border-slate-700
            flex
            items-center
            justify-center
            shadow-sm
            hover:scale-105
            transition-all
          "
        >
          {darkMode ? (
            <Sun size={18} className="text-yellow-500" />
          ) : (
            <Moon size={18} className="text-slate-700" />
          )}
        </button>

        {/* Notifications */}

        <button
          className="
            relative
            h-11
            w-11
            rounded-2xl
            bg-white
            dark:bg-slate-800
            border
            border-slate-200
            dark:border-slate-700
            flex
            items-center
            justify-center
            shadow-sm
            hover:scale-105
            transition-all
          "
        >
          <Bell size={18} className="text-slate-700 dark:text-white" />

          <span
            className="
              absolute
              top-2
              right-2
              h-2
              w-2
              rounded-full
              bg-red-500
            "
          />
        </button>

        {/* Messages */}

        <button
          className="
            relative
            h-11
            w-11
            rounded-2xl
            bg-white
            dark:bg-slate-800
            border
            border-slate-200
            dark:border-slate-700
            flex
            items-center
            justify-center
            shadow-sm
            hover:scale-105
            transition-all
          "
        >
          <Mail size={18} className="text-slate-700 dark:text-white" />

          <span
            className="
              absolute
              top-2
              right-2
              h-2
              w-2
              rounded-full
              bg-green-500
            "
          />
        </button>

        {/* Upgrade Button */}

        <button
          className="
            hidden
            md:flex
            items-center
            px-5
            py-2.5
            rounded-2xl
            bg-[#6C5CE7]
            text-white
            font-medium
            hover:bg-[#5B4AD1]
            transition-all
            shadow-lg
            shadow-purple-500/20
          "
        >
          Upgrade
        </button>

        {/* Profile */}

        <div
          className="
            h-11
            w-11
            rounded-full
            bg-linear-to-r
            from-[#6C5CE7]
            to-[#8B5CF6]
            flex
            items-center
            justify-center
            text-white
            font-semibold
            shadow-lg
          "
        >
          S
        </div>
      </div>
    </div>
  );
}
