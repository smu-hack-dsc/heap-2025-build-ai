// YOU DO NOT NEED TO TOUCH THIS FILE

import './App.css'
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router' 
import "@radix-ui/themes/styles.css"
import { Theme } from "@radix-ui/themes"
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [appearance, setAppearance] = useState("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", appearance === "dark");
  }, [appearance]);
  
  return (
    <Theme appearance={appearance}>
      <Outlet />
      <ThemeToggle appearance={appearance} setAppearance={setAppearance} />
    </Theme>
  )
}

export default App
