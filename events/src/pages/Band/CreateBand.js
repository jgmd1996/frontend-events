import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import React from 'react';
import { useEffect, useState } from 'react'
import Select from "react-select";
import makeAnimated from "react-select/animated";
import RedirectPages from '../../components/RedirectPages';
import "./style.css";

function CreateBand() {
  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  // selecionar e busca genre
  const [selectedGenre, setSelectedGenre] = useState({});
 
  //console.log("selectedGenre",selectedGenre);

  const [genres, setGenres] = useState([]);
  //console.log("genres",genres);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3001/genre");
      const body = await response.json();
      const genresSelect = body.genres.map(genreApi => ({ value: genreApi._id, label: genreApi.name }));
      setGenres(genresSelect);
    }

    fetchMyAPI();
  }, []);


   useEffect(() => {
    formik.setFieldValue("genre", selectedGenre)
   }, [selectedGenre]);


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
      .min(10, 'Muito curto!')
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
      .max(1000000, 'Muito grande!')
      .required('Cache obrigatório!'),

      genre: Yup.array()
      .nullable(true)
      .min(1, 'Muito curto!')
      .required('genero obrigatório!')
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
      genre: ''
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
        genre: selectedGenre.map(id => ({ _id: id.value}))
      };
      console.log("body",body)
      const settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body)
      };
      try {
        console.log("body",body)
        const fetchResponse = await fetch('http://localhost:3001/band', settings);
        console.log("fetchResponse", fetchResponse);
        console.log("settings",settings)
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
          <h1>Criar Banda</h1>

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

        <div>
          <Select
         
            components={animatedComponents}
            placeholder="Selecione o genero"
            isMulti
            id="genre"
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
          <div>{touched.genre && errors.genre}</div>
          </div>

          <div>{touched.category && errors.category}</div>
          <button type='submit'  >Criar produtos</button>
          <RedirectPages linkPage="/" page="Voltar para Home"/>
        </Form>
      </FormikProvider>
    </>
  );
}

export default CreateBand;