import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";

function UpdateBand() {
  const navigate = useNavigate();
  const {state} = useLocation();
  const animatedComponents = makeAnimated();

  // selecionar e busca genre
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState({});
  const stateGender = state.item.genre.map(genre => ({value: genre._id, label: genre.name}));
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3001/genre");
      const genresApi = await response.json();
      const genresSelect = genresApi.map(genreApi => ({ value: genreApi._id, label: genreApi.name }));
      setGenres(genresSelect);
    }

    fetchMyAPI();
  }, []);
  //
  // selecionar e busca a banda
  const [band, setBand] = useState([]);
  const [selectedBand, setSelectedBand] = useState({});
  const stateBand = state.item.band.map(band => ({value: band._id, label: band.name}));
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3001/band");
      const genresApi = await response.json();
      const genresSelect = genresApi.map(genreApi => ({ value: genreApi._id, label: genreApi.name }));
      setBand(genresSelect);
    }

    fetchMyAPI();
  }, []);
  //
const RegisterSchema = Yup.object().shape({
  name: Yup.string()
  .min(2, 'Muito curto!')
  .max(200, 'Muito grande!')
  .required('name obrigatório!'),

address: Yup.string()
  .min(2, 'Muito curto!')
  .max(200, 'Muito grande!')
  .required('Endereço obrigatório!'),

presentationlocation: Yup.string()
  .min(2, 'Muito curto!')
  .max(200, 'Muito grande!')
  .required('local de apresentação obrigatório!'),

targetaudience: Yup.string()
  .min(2, 'Muito curto!')
  .max(200, 'Muito grande!')
  .required('Publico alvo obrigatório!'),

cache: Yup.number()
  .min(2, 'Muito curto!')
  .max(200, 'Muito grande!')
  .required('Cache obrigatório!'),

bandinstruments: Yup.string()
  .min(2, 'Muito curto!')
  .max(200, 'Muito grande!')
  .required('Informe se os intrumentos são da banda ou do evento!'),

  expectedaudience: Yup.number()
  .min(2, 'Muito curto!')
  .max(200, 'Muito grande!')
  .required('Publico esperado obrigatório!')
});

const formik = useFormik({
  initialValues: {
    name: state.item.name,
    address: state.item.address,
    presentationlocation: state.item.presentationLocation,
    targetaudience: state.item.targetAudience,
    cache: state.item.cache,
    bandinstruments: state.item.bandInstruments,
    expectedaudience: state.item.expectedAudience,
    genre: state.item.genre,
    band: state.item.band,
  },
  validationSchema: RegisterSchema,

  onSubmit: async (values) => {
    const body = { 
      name: values.name,
      address: values.address,
      presentationLocation: values.presentationlocation,
      targetAudience: values.targetaudience,
      cache: values.cache,
      bandInstruments: values.bandinstruments,
      expectedAudience: values.expectedaudience,
      genre: selectedGenre.map(id => id.value),
      band: selectedBand.map(id => id.value)
     }
    const settings = {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body)
    };
    try {
      const fetchResponse = await fetch('http://localhost:3001/event/' + state.item._id, settings);  
      console.log("fetchResponse",fetchResponse);
      if (fetchResponse.status === 200) {
        formik.setFieldValue("name", null);
        navigate('/EvetList', { replace: true });
      }
    } catch (e) {
      console.error(e);
    }
  }
});

const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete='off' noValidate onSubmit={handleSubmit}>

        <h1>Atuallizar evento</h1>
        <div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Digite o name do evento"
              {...getFieldProps('name')}
            />
            <div>{touched.name && errors.name}</div>
          </div>

          <div>
            <input
              type="text"
              id="address"
              address="address"
              placeholder="Digite o endereço do evento"
              {...getFieldProps('address')}
            />
            <div>{touched.address && errors.address}</div>
          </div>

          <div>
            <input
              type="text"
              id="presentationlocation"
              presentationLocation="presentationlocation"
              placeholder="Digite o local de apresentaçao do evento"
              {...getFieldProps('presentationlocation')}
            />
            <div>{touched.presentationlocation && errors.presentationlocation}</div>
          </div>

          <div>
            <input
              type="text"
              id="targetaudience"
              targetaudience="targetaudience"
              placeholder="Digite o publico alvo do evento"
              {...getFieldProps('targetaudience')}
            />
            <div>{touched.targetaudience && errors.targetaudience}</div>
          </div>

          <div>
            <input
              type="number"
              id="cache"
              cache="cache"
              placeholder="Digite o cache do evento"
              {...getFieldProps('cache')}
            />
            <div>{touched.cache && errors.cache}</div>
          </div>

          <div>
            <input
              type="text"
              id="bandinstruments"
              bandinstruments="bandinstruments"
              placeholder="Instrumentos da banda?"
              {...getFieldProps('bandinstruments')}
            />
            <div>{touched.bandinstruments && errors.bandinstruments}</div>
          </div>

          <div>
            <input
              type="number"
              id="expectedaudience"
              expectedaudience="expectedaudience"
              placeholder="Digite a espectativa de audiencia do evento"
              {...getFieldProps('expectedaudience')}
            />
            <div>{touched.expectedaudience && errors.expectedaudience}</div>
          </div>

            <Select
            defaultValue={stateGender}
            components={animatedComponents}
            placeholder="Selecione o genero"
            isMulti
            options={genres}
            onChange={(item) => setSelectedGenre(item)}
            className="select"
            isClearable={true}
            isSearchable={true}
            isDisabled={false}
            isLoading={false}
            isRtl={false}
            closeMenuOnSelect={false}
          />

          <Select
          defaultValue={stateBand}
            components={animatedComponents}
            placeholder="Selecione a categoria"
            isMulti
            options={band}
            onChange={(item) => setSelectedBand(item)}
            className="select"
            isClearable={true}
            isSearchable={true}
            isDisabled={false}
            isLoading={false}
            isRtl={false}
            closeMenuOnSelect={false}
          />

          <button type='submit'  >Atualizar evento</button>
          <Link to="/">Volta para pagina inicial</Link>  
        </Form>
      </FormikProvider>
    </>
  );
}

export default UpdateBand;
