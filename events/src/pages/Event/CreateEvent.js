import { Link, useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import React from 'react';
import { useEffect, useState } from 'react'
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "./style.css";

function CreateEvent() {

  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  // selecionar e busca genre
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState({});
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
      name: '',
      address: '',
      presentationlocation: '',
      targetaudience: '',
      cache: '',
      bandinstruments: '',
      expectedaudience: '',
      genre: '',
      band: ''
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
        const fetchResponse = await fetch('http://localhost:3001/event', settings);
        console.log("fetchResponse", fetchResponse);
        if (fetchResponse.status === 201) {
          formik.setFieldValue("name", null);
          navigate('/ListaProduto', { replace: true });
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
              placeholder="Digite o name do evento"
              {...getFieldProps('name')}
            />
            <div>{touched.name && errors.name}</div>
          </div>

          <div>
            <input
              type="text"
              id="address"
              placeholder="Digite o endereço do evento"
              {...getFieldProps('address')}
            />
            <div>{touched.address && errors.address}</div>
          </div>

          <div>
            <input
              type="text"
              id="presentationlocation"
              placeholder="Digite o local de apresentaçao do evento"
              {...getFieldProps('presentationlocation')}
            />
            <div>{touched.presentationlocation && errors.presentationlocation}</div>
          </div>

          <div>
            <input
              type="text"
              id="targetaudience"
              placeholder="Digite o publico alvo do evento"
              {...getFieldProps('targetaudience')}
            />
            <div>{touched.targetaudience && errors.targetaudience}</div>
          </div>

          <div>
            <input
              type="number"
              id="cache"
              placeholder="Digite o cache do evento"
              {...getFieldProps('cache')}
            />
            <div>{touched.cache && errors.cache}</div>
          </div>

          <div>
            <input
              type="text"
              id="bandinstruments"
              placeholder="Instrumentos da banda?"
              {...getFieldProps('bandinstruments')}
            />
            <div>{touched.bandinstruments && errors.bandinstruments}</div>
          </div>

          <div>
            <input
              type="number"
              id="expectedaudience"
              placeholder="Digite a espectativa de audiencia do evento"
              {...getFieldProps('expectedaudience')}
            />
            <div>{touched.expectedaudience && errors.expectedaudience}</div>
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

          <div>{touched.category && errors.category}</div>
          <button type='submit'  >Criar produtos</button>
          <Link to="/">home</Link>
        </Form>
      </FormikProvider>
    </>
  );
}

export default CreateEvent;