import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar";
import HeroSlider from "./components/Hero_slider";
import RecentlyUpdated from "./components/RecentlyUpdated";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <HeroSlider/>
      <RecentlyUpdated/>
    </>
  )
}

export default App
