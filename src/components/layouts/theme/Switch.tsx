'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '../Icons';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
      <button  onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {
          theme === "light" ? <MoonIcon/>  : <SunIcon/>
        }
      </button>
  );
};

export default ThemeSwitch;
