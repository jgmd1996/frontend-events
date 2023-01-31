import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <form>
        <table align='center' border="100">
          <tbody>

            <tr>
              <td>Generos</td>
              <td>Evento</td>
              <td>Banda</td>
            </tr>

            <tr>
              <td><Link to="/createGenre">Criar Genero</Link></td>
              <td><Link to="/CreateEvent">Criar novo evento</Link></td>
              <td><Link to="/CreateBand">Registrar banda</Link></td>
            </tr>

            <tr>
              <td><Link to="/genreList">Lista Genero</Link></td>
              <td><Link to="/EvetList">Lista evento</Link></td>
              <td><Link to="/BandList">Lista bandas</Link></td>
            </tr>

          </tbody>
        </table>
      </form>
    </div>
  );
}

export default Home;
