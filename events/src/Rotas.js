import { BrowserRouter, Routes, Route } from 'react-router-dom'

import GenreList from './pages/Genre/GenreList';
import CreateGenre from './pages/Genre/ CreateGenre';
import UpdateGenre from './pages/Genre/UpdateGenre';

import Home from './pages/Home'
import AtualizarProduto from './pages/produto/AtualizarProduto'
import CriarProduto from './pages/produto/CriarProduto'
import ListaProduto from './pages/produto/ListaProduto'

const Rotas =() => {
  return (
    <div className='routes'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/createGenre" element={<CreateGenre />} />
        <Route path="/genreList" element={<GenreList />} />
        <Route path="/updateGenre" element={<UpdateGenre />} />

        <Route path="/ListaProduto" element={<ListaProduto />} />
        <Route path="/AtualizarProduto" element={<AtualizarProduto />} />
        <Route path="/CriarProduto" element={<CriarProduto />} />
  
 
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Rotas;