import { Link, useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import React from 'react';
import { useEffect, useState } from 'react'
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "./style.css";

function CreateBand() {

  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  // selecionar e busca genre
  const [selectedGenre, setSelectedGenre] = useState({});
  const [genres, setGenres] = useState([]);
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
  const [event, setEvent] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({});
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3001/event");
      const genresApi = await response.json();
      const eventsSelect = genresApi.map(genreApi => ({ value: genreApi._id, label: genreApi.name }));
      setEvent(eventsSelect);
    }

    fetchMyAPI();
  }, []);
  //

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('name obrigatório!'),

    numbermembers: Yup.number()
      .min(1, 'Muito curto!')
      .max(500, 'Muito grande!')
      .required('Numero de integrantes obrigatório!'),

      contact: Yup.number()
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

      cache: Yup.number()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('Cache obrigatório!')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      numbermembers: '',
      contact: '',
      email: '',
      logo: '',
      bandphoto: '',
      targetaudience: '',
      cache:'',
      genre: '',
      event: ''
    },

    validationSchema: RegisterSchema,

    onSubmit: async (values) => {
      const body = {
        name: values.name,
        numberMembers: values.numbermembers,
        contact: values.contact,
        email: values.email,
        logo: values.logo,
        bandPhoto: values.bandphoto,
        targetAudience: values.targetaudience,
        cache: values.cache,
        genre: selectedGenre.map(id => id.value),
        event: selectedEvent.map(id => id.value)
      };
      const settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body)

      };
      try {
        const fetchResponse = await fetch('http://localhost:3001/band', settings);
        console.log("fetchResponse", fetchResponse);
        if (fetchResponse.status === 201) {
          formik.setFieldValue("name", null);
          navigate('/BandList', { replace: true });
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
          <h1>Criar Evento</h1>

          <div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Digite o name da banda"
              {...getFieldProps('name')}
            />
            <div>{touched.name && errors.name}</div>
          </div>

          <div>
            <input
              type="number"
              id="numbermembers"
              numbermembers="numbermembers"
              placeholder="Digite o numero de integrantes"
              {...getFieldProps('numbermembers')}
            />
            <div>{touched.numbermembers && errors.numbermembers}</div>
          </div>

          <div>
            <input
              type="text"
              id="contact"
              contact="contact"
              placeholder="Digite o contato"
              {...getFieldProps('contact')}
            />
            <div>{touched.contact && errors.contact}</div>
          </div>

          <div>
            <input
              type="text"
              id="email"
              email="email"
              placeholder="Digite o E-mail"
              {...getFieldProps('email')}
            />
            <div>{touched.email && errors.email}</div>
          </div>

          <div>
            <input
              type="text"
              id="logo"
              logo="logo"
              placeholder="Digite a logo"
              {...getFieldProps('logo')}
            />
            <div>{touched.logo && errors.logo}</div>
          </div>

          <div>
            <input
              type="text"
              id="bandphoto"
              bandphoto="bandphoto"
              placeholder="Imagem da banda"
              {...getFieldProps('bandphoto')}
            />
            <div>{touched.bandphoto && errors.bandphoto}</div>
          </div>

          <div>
            <input
              type="text"
              id="targetaudience"
              targetaudience="targetaudience"
              placeholder="Digite o publico alvo"
              {...getFieldProps('targetaudience')}
            />
            <div>{touched.targetaudience && errors.targetaudience}</div>
          </div>

          <div>
            <input
              type="number"
              id="cache"
              cache="cache"
              placeholder="Digite o cache"
              {...getFieldProps('cache')}
            />
            <div>{touched.cache && errors.cache}</div>
          </div>

          <Select
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
            components={animatedComponents}
            placeholder="Selecione o evento"
            isMulti
            options={event}
            onChange={(item) => setSelectedEvent(item)}
            className="select"
            isClearable={true}
            isSearchable={true}
            isDisabled={false}
            isLoading={false}
            isRtl={false}
            closeMenuOnSelect={false}
          />

          <div>{touched.category && errors.category}</div>
          <button type='submit'  >Criar produtos</button>
          <Link to="/">home</Link>
        </Form>
      </FormikProvider>
    </>
  );
}

export default CreateBand;