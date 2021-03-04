import React, { useState, useEffect } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi';

const ThemeChanger = () => {
  const [themeState, setThemeState] = useState(false);

  const handleChange = () => {
    setThemeState(!themeState);
    if (themeState) {
      localStorage.setItem('Theme', 'dark');
      document.documentElement.classList.add('dark-mode');
    } else {
      localStorage.setItem('Theme', 'light');
      document.documentElement.classList.remove('dark-mode');
    }
  }
  useEffect(() => {
    const getTheme = localStorage.getItem('Theme');
    if (getTheme === 'dark') return  document.documentElement.classList.add('dark-mode');
  })
  return (
    <div>
      <a onClick={handleChange}>{themeState ? <FiMoon size={32} /> : <FiSun size={32} /> }</a>
    </div>
  )
}

export default ThemeChanger;