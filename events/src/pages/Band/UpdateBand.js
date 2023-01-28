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


  const stateGender = state.item.genre.map(genreh => ({value: genreh._id, label: genreh.name}));



  const [selectedGenre, setSelectedGenre] = useState({});
  
  console.log("selectedGenre",selectedGenre)
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3001/genre");
      const body = await response.json();
      const genresSelect = body.genres.map(genreApi => ({ value: genreApi._id, label: genreApi.name }));
      setGenres(genresSelect);
    }

    fetchMyAPI();
  }, []);
  

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('name obrigatório!'),

    numbermembers: Yup.string()
      .min(1, 'Muito curto!')
      .max(500, 'Muito grande!')
      .required('Numero de integrantes obrigatório!'),

      contact: Yup.string()
      .min(11, 'Muito curto!')
      .max(99999999999, 'Muito grande!')
      .required('Contato obrigatório!'),

      email: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('E-mail obrigatório!'),

      logo: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('logo obrigatório!'),

      bandphoto: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('Foto da banda obrigadorio'),

      targetaudience: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('Publico alvo obrigatório!'),

      cache: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('Cache obrigatório!')
});

const formik = useFormik({
  initialValues: {
    id: state.item._id,
    name: state.item.name,
    numbermembers: state.item.numberMembers,
    contact: state.item.contact,
    email: state.item.email,
    logo: state.item.logo,
    bandphoto: state.item.bandPhoto,
    targetaudience: state.item.targetAudience,
    cache: state.item.cache,
    genre: state.item.genre.map(genreApi => ({ value: genreApi._id, label: genreApi.name }))
  },
  validationSchema: RegisterSchema,

  onSubmit: async (values) => {
    const body = { 
        id: values.id,
        name: values.name,
        numberMembers: JSON.stringify(values.numbermembers),
        contact: JSON.stringify(values.contact),
        email: values.email,
        logo: values.logo,
        bandPhoto: values.bandphoto,
        targetAudience: values.targetaudience,
        cache: JSON.stringify(values.cache),
        genre: selectedGenre.map(id => ({_id:id.value}))

     }
     console.log("body",body)
    const settings = {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body)
    };
    try {
      console.log("body",body)
      const fetchResponse = await fetch('http://localhost:3001/band/',settings);  
      console.log("fetchResponse",fetchResponse);
      console.log("body",body)
      if (fetchResponse.status === 200) {
        formik.setFieldValue("name", null);
        navigate('/BandList', { replace: true });
        console.log("body",body)
      }
    } catch (e) {
      console.log("body",body)
      console.error(e);
    }
  }
});

const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete='off' noValidate onSubmit={handleSubmit}>

        <h1>Atuallizar Banda</h1>
        <div>
            <input
              type="text"
              id="name"
              placeholder="Digite o name da banda"
              {...getFieldProps('name')}
            />
            <div>{touched.name && errors.name}</div>
          </div>

          <div>
            <input
              type="text"
              id="numbermembers"
              placeholder="Digite o numero de integrantes"
              {...getFieldProps('numbermembers')}
            />
            <div>{touched.numbermembers && errors.numbermembers}</div>
          </div>

          <div>
            <input
              type="text"
              id="contact"
              placeholder="Digite o contato"
              {...getFieldProps('contact')}
            />
            <div>{touched.contact && errors.contact}</div>
          </div>

          <div>
            <input
              type="text"
              id="email"
              placeholder="Digite o E-mail"
              {...getFieldProps('email')}
            />
            <div>{touched.email && errors.email}</div>
          </div>

          <div>
            <input
              type="text"
              id="logo"
              placeholder="Digite a logo"
              {...getFieldProps('logo')}
            />
            <div>{touched.logo && errors.logo}</div>
          </div>

          <div>
            <input
              type="text"
              id="bandphoto"
              placeholder="Imagem da banda"
              {...getFieldProps('bandphoto')}
            />
            <div>{touched.bandphoto && errors.bandphoto}</div>
          </div>

          <div>
            <input
              type="text"
              id="targetaudience"
              placeholder="Digite o publico alvo"
              {...getFieldProps('targetaudience')}
            />
            <div>{touched.targetaudience && errors.targetaudience}</div>
          </div>

          <div>
            <input
              type="text"
              id="cache"
              placeholder="Digite o cache"
              {...getFieldProps('cache')}
            />
            <div>{touched.cache && errors.cache}</div>
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

          <button type='submit'  >Atualizar evento</button>
          <Link to="/">Volta para pagina inicial</Link>  
        </Form>
      </FormikProvider>
    </>
  );
}

export default UpdateBand;
