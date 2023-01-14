import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";

function UpdateGenre() {
  
  const navigate = useNavigate();
  const {state} = useLocation();

  const RegisterSchema = Yup.object().shape({
     name: Yup.string()
     .min(2, 'Muito curto!')
     .max(200, 'Muito grande!')
     .required('Género obrigatório!')
  });

  const formik = useFormik({
  initialValues: {
    name: state.item.name
  },
  validationSchema: RegisterSchema,

  onSubmit: async (values) => {
    const body = { name: values.name }
    const settings = {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body)
    };
    try {
      const fetchResponse = await fetch('http://localhost:3001/genre/' + state.item._id, settings);  
      console.log("fetchResponse",fetchResponse);
      if (fetchResponse.status === 200) {
        formik.setFieldValue("name", null);
        navigate('/genreList', { replace: true });
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
              id="name"
              placeholder="Digite a Género"
              {...getFieldProps('name')}
            />
            <div>{touched.name && errors.name}</div>
          </div>
          <button type='submit'>Atualizar Género</button>
          <Link to="/">Voltar para pagina inicial </Link>
        </Form>
      </FormikProvider>
    </>
  );
}

export default UpdateGenre;
