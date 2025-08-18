import React, { useState, useEffect } from 'react';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';
import { useTheme } from 'next-themes';
import classNames from 'classnames';

export default function DarkModeSwitch() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const toggleSwitch = () => {
    console.log('Toggling theme:', theme);
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!mounted) return null;

  return (
    <div
      onClick={toggleSwitch}
      className={classNames(
        `flex-start flex h-[40px] w-[80px] rounded-[50px] bg-zinc-100 shadow-inner hover:cursor-pointer dark:bg-black`,
        {
          'place-content-end': theme === 'light',
        },
      )}
    >
      <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full">
        {theme === 'light' ? (
          <RiSunFill className="h-6 w-6 text-orange-500" />
        ) : (
          <RiMoonClearFill className="h-6 w-6 text-slate-200" />
        )}
      </div>
    </div>
  );
}
