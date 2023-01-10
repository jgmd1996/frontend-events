import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";


function AtualizarProduto() {
  const navigate = useNavigate();
  const {state} = useLocation();
  const animatedComponents = makeAnimated();
  const categoriasdoState = state.item.category.map(categori => ({value: categori._id, label: categori.nome}));

  const [selectedOptions, setSelectedOptions] = useState({});
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("http://localhost:3001/categories");
      const categoriasApi = await response.json();
      const categoriasSelect = categoriasApi.map(categoriaApi => ({ value: categoriaApi._id, label: categoriaApi.nome }));
      setCategorias(categoriasSelect);
    }

    fetchMyAPI();
  }, []);

const RegisterSchema = Yup.object().shape({
    nome: Yup.string()
    .min(2, 'Muito curto!')
    .max(200, 'Muito grande!')
    .required('Nome obrigatório!'),

    description: Yup.string()
    .min(2, 'Muito curto!')
    .max(200, 'Muito grande!')
    .required('Descrição obrigatório!'),

    price: Yup.number()
    .min(1, 'Muito curto!')
    .max(900, 'Muito grande!')
    .required('Preço obrigatório!'),

    quantidade: Yup.number()
    .min(1, 'Muito curto!')
    .max(200, 'Muito grande!')
    .required('Quantidade obrigatório!') 
});

const formik = useFormik({
  initialValues: {
    nome: state.item.nome,
    description: state.item.description,
    price: state.item.price,
    quantidade: state.item.quantidade,
    category: state.item.category,
  },
  validationSchema: RegisterSchema,

  onSubmit: async (values) => {
    const body = { 
        nome: values.nome,
        description: values.description,
        price: values.price,
        quantidade: values.quantidade,
        category: selectedOptions.map(id=> id.value)
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
      const fetchResponse = await fetch('http://localhost:3001/produtos/' + state.item._id, settings);  
      console.log("fetchResponse",fetchResponse);
      if (fetchResponse.status === 200) {
        formik.setFieldValue("nome", null);
        navigate('/ListaProduto', { replace: true });
        console.log("Chego aqui");
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

        <h1>Criar produto</h1>
          <div>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Digite o nome do produto"
              {...getFieldProps('nome')}
            />
            <div>{touched.nome && errors.nome}</div>
          </div>

          <div>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Descrição do produto"
              {...getFieldProps('description')}
            />
            <div>{touched.description && errors.description}</div>
          </div>

          <div>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="Digite o preço"
              {...getFieldProps('price')}
            />
            <div>{touched.price && errors.price}</div>
          </div>

          <div>
            <input
              type="text"
              id="quantidade"
              name="quantidade"
              placeholder="Digite a quantidade"
              {...getFieldProps('quantidade')}
            />
            <div>{touched.quantidade && errors.quantidade}</div>
          </div>

          <Select
              defaultValue={categoriasdoState}
              components={animatedComponents}
              placeholder="Selecione a categoria"
              isMulti
              options={categorias}
              onChange={(item) => setSelectedOptions(item)}
              className="select"
              isClearable={true}
              isSearchable={true}
              isDisabled={false}
              isLoading={false}
              isRtl={false}
              closeMenuOnSelect={false}
            />

          <button type='submit'  >Atualizar Produto</button>
          <Link to="/">home</Link>  
        </Form>
      </FormikProvider>
    </>
  );
}

export default AtualizarProduto;
