import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import './theme.css'
import { useLocation } from "react-router-dom"
import axios from "axios"
import { useEffect, useRef } from "react"
import { Capacitor } from '@capacitor/core'


export default function App() {

  const location = useLocation()
  const prevLocation = useRef(location)

  useEffect(() => {
    if (Capacitor.getPlatform() === "web") {
        const header = document.querySelector("header")
        if (header) {
            header.style.paddingTop = "15px"
        }
    }
    
    const theme = localStorage.getItem('theme') || "dark"
    document.querySelector("html").setAttribute("data-theme", theme)

    if (prevLocation.current.pathname !== location.pathname) {
      const fetchData = async () => {
        try {
          await axios.get(`${import.meta.env.VITE_API_URL}/stores/fetch`)
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }

      fetchData()
    }

    prevLocation.current = location
  }, [location])

  return (
      <div className='main-content'>
       
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
  )
}
