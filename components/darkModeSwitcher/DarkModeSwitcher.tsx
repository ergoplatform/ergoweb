import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';
import { useTheme } from 'next-themes';

export default function DarkModeSwitch() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (window.localStorage.getItem('theme') === 'light') {
      return setTheme('light');
    } else {
      return setTheme('dark');
    }
  }, []);

  const toggleSwitch = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const spring = {
    type: 'tween',
    stiffness: 700,
    damping: 30,
  };

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      window.localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
    }
  }, [theme]);

  return (
    <div
      onClick={toggleSwitch}
      className={`flex-start flex h-[40px] w-[80px] rounded-[50px] bg-zinc-100  shadow-inner hover:cursor-pointer dark:bg-black ${
        theme === 'light' && 'place-content-end'
      }`}
    >
      <motion.div
        className="flex h-[40px] w-[40px] items-center justify-center rounded-full"
        layout
        transition={spring}
      >
        <motion.div>
          {theme === 'light' ? (
            <RiSunFill className="h-6 w-6 text-orange-500" />
          ) : (
            <RiMoonClearFill className="h-6 w-6 text-slate-200" />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
