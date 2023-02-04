import RedirectPages from '../components/RedirectPages';

function Home() {
  return (
    <div>
      <form>
        <table align='center' border="100">
          <tbody>

            <tr>
              <td><RedirectPages NamePage="Generos"/></td>
              <td><RedirectPages NamePage="Evento"/></td>
              <td><RedirectPages NamePage="Banda"/></td>
            </tr>

            <tr align="center">
             <td><RedirectPages linkPage="createGenre" page="Criar novo genero"/></td>
             <td><RedirectPages linkPage="CreateEvent" page="Criar novo evento"/></td>
             <td><RedirectPages linkPage="CreateBand" page="Criar nova Banda"/></td>
            </tr>

            <tr>
            <td><RedirectPages linkPage="genreList" page="Listar Generos"/></td>
            <td><RedirectPages linkPage="EvetList" page="Listar Eventos"/></td>
            <td><RedirectPages linkPage="BandList" page="Listar Bandas"/></td>
            </tr>

          </tbody>
        </table>
      </form>
    </div>
  );
}

export default Home;