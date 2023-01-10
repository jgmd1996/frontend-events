import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <form>
        <table align='center' border="100">
          <tbody>

            <tr>
              <td>Categorias</td>
              <td>produtos</td>
            </tr>

            <tr>
              <td><Link to="/createGenre">Criar Genero</Link></td>
              <td><Link to="/criarProduto">Criar novo produto</Link></td>
            </tr>

            <tr>
              <td><Link to="/genreList">Lista Genero</Link></td>
              <td><Link to="/ListaProduto">Lista produto</Link></td>
            </tr>

          </tbody>
        </table>
      </form>
    </div>
  );
}

export default Home;
