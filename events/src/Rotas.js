import { BrowserRouter, Routes, Route } from 'react-router-dom'

import GenreList from './pages/Genre/GenreList';
import CreateGenre from './pages/Genre/ CreateGenre';
import UpdateGenre from './pages/Genre/UpdateGenre';

import Home from './pages/Home'

import CreateEvent from './pages/produto/CreateEvent';
import EvetList from './pages/produto/EvetList';
import UpdateEvent from './pages/produto/UpdateEvent';




const Rotas =() => {
  return (
    <div className='routes'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/createGenre" element={<CreateGenre />} />
        <Route path="/genreList" element={<GenreList />} />
        <Route path="/updateGenre" element={<UpdateGenre />} />

        <Route path="/CreateEvent" element={<CreateEvent />} />
        <Route path="/EvetList" element={<EvetList />} />
        <Route path="/UpdateEvent" element={<UpdateEvent />} />
    
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Rotas;