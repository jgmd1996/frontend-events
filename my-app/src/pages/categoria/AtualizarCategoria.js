import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";

function AtualizarCategoria() {
  
  const navigate = useNavigate();
  const {state} = useLocation();

  const RegisterSchema = Yup.object().shape({
     nome: Yup.string()
     .min(2, 'Muito curto!')
     .max(200, 'Muito grande!')
     .required('Categoria obrigatório!')
  });

  const formik = useFormik({
  initialValues: {
    nome: state.item.nome
  },
  validationSchema: RegisterSchema,

  onSubmit: async (values) => {
    const body = { nome: values.nome }
    const settings = {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body)
    };
    try {
      const fetchResponse = await fetch('http://localhost:3001/categories/' + state.item._id, settings);  
      console.log("fetchResponse",fetchResponse);
      if (fetchResponse.status === 200) {
        formik.setFieldValue("nome", null);
        navigate('/listaCategoria', { replace: true });
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

          <div>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Digite a categoria"
              {...getFieldProps('nome')}
            />
            <div>{touched.nome && errors.nome}</div>
          </div>
          <button type='submit'  >Criar categoria</button>
          <Link to="/">home</Link>
        </Form>
      </FormikProvider>
    </>
  );
}

export default AtualizarCategoria;
