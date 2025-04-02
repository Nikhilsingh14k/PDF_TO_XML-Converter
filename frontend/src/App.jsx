import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar.jsx'
import Login from './pages/Login.jsx'
import Sidebar from './components/Sidebar.jsx'
import FeaturePage from './pages/Featuers.jsx'
import AboutPage from './pages/About.jsx'
import PricingPage from './pages/Price.jsx'
import Footer from './components/Footer.jsx'


const App = () => {
  return (
    <div className='w-full min-h-screen'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <div className='flex-1 p-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/features' element={<FeaturePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/pricing' element={<PricingPage />} />

            
          </Routes>
          <Footer/>
        </div>
       
        
      </div>
   
    </div>
   
  )
}

export default App
