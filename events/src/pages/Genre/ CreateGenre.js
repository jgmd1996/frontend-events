import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import RedirectPages from '../../components/RedirectPages';
import * as Yup from "yup";

function  CreateGenre() {

  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Muito curto!')
      .max(200, 'Muito grande!')
      .required('Género obrigatório!')
  })

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: RegisterSchema,

    onSubmit: async (values) => {
      const body = { name: values.name }
      const settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body)
      };
      try {
        const fetchResponse = await fetch('http://localhost:3001/genre', settings);
        console.log("fetchResponse", fetchResponse);
        if (fetchResponse.status === 201) {
          formik.setFieldValue("name", null);
          navigate('/genreList', { replace: true });
        };
      } catch (e) {
        console.error(e);
      };
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
              placeholder="Digite o novo Género"
              {...getFieldProps('name')}
            />
            <div>{touched.name && errors.name}</div>
          </div>

          <button type='submit'>Criar Genero</button>
          
          <RedirectPages linkPage="/" page="Voltar para Home"/>
        </Form>
      </FormikProvider>
    </>
  );
}

export default  CreateGenre;
