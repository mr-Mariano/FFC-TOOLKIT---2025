import { useState } from 'react'
import { Link } from 'react-router'
import { Routes, Route, Navigate } from 'react-router' // Importar Navigate
// Importacion de estilos
import './styles/App.css'
import './styles/Header.css'
import './styles/CardContainer.css'

//Importacion de componentes

//Importación de pages
import Index from './pages/Index'
import Logic from './pages/Logic'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import Page4 from './pages/Page4'
import Page5 from './pages/Page5'
import Subpage1 from './pages/subpages/Subpage1'
import Subpage2 from './pages/subpages/Subpage2'
import Subpage3 from './pages/subpages/Subpage3'

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/logic" element={<Logic />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
        <Route path="/page4" element={<Page4 />} />
        <Route path="/page5" element={<Page5 />} />
        <Route path="/page1/subpage1" element={<Subpage1 />} />
        <Route path="/page1/subpage2" element={<Subpage2 />} />
        <Route path="/page1/subpage3" element={<Subpage3 />} />
      </Routes>
    </>
  )
}

export default App
