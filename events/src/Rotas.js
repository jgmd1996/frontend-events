import { BrowserRouter, Routes, Route } from 'react-router-dom'

import GenreList from './pages/Genre/GenreList';
import CreateGenre from './pages/Genre/ CreateGenre';
import UpdateGenre from './pages/Genre/UpdateGenre';

import Home from './pages/Home'

import CreateEvent from './pages/Event/CreateEvent';
import EvetList from './pages/Event/EvetList';
import UpdateEvent from './pages/Event/UpdateEvent';

import CreateBand from './pages/Band/CreateBand';
import BandList from './pages/Band/BandList';
import UpdateBand from './pages/Band/UpdateBand';




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

        <Route path="/CreateBand" element={<CreateBand />} />
        <Route path="/BandList" element={<BandList />} />
        <Route path="/UpdateBand" element={<UpdateBand />} />
    
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Rotas;