import * as Yup from 'yup';
import { useFormik } from 'formik';
import { apiUrl } from '../constans/environment';
import axiosInstance from '../interceptors/keycloak-interceptor';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Required')
    .min(2, 'Minimum length: 2'),
  age: Yup.number()
    .required('Required')
    .min(0, 'Age cannot be negative')
    .max(120, 'Don\'t lie'),
  fakeFan: Yup.boolean()
});

export default function FanForm({fans, setFans}){
  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      fakeFan: false
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      const newFan = {name: values.name, age: values.age, fakeFan: values.fakeFan};
      const updatedFans = [...fans, newFan];
      setFans(updatedFans);
      axiosInstance.post(`${apiUrl}/fan`, newFan).then(console.log).catch(console.log);

      setSubmitting(false);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='full-w grid pb-2'>
        <label htmlFor="name" className='pr-2'>Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <span className='error'>{formik.errors.name}</span>
        ) : null}
      </div>
      <div className='full-w grid pb-2'>
        <label htmlFor="age" className='pr-2'>Age</label>
        <input
          id="age"
          name="age"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.age}
        />
        {formik.touched.age && formik.errors.age ? (
          <span className='error'>{formik.errors.age}</span>
        ) : null}
      </div>
      <div className='full-w grid pb-2'>
        <label htmlFor="fakeFan" className='width-content pr-2'>Fake Fan</label>
        <input
          id="fakeFan"
          name="fakeFan"
          type="checkbox"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          checked={formik.values.fakeFan}
        />
        {formik.touched.fakeFan && formik.errors.fakeFan ? (
          <span className='error'>{formik.errors.fakeFan}</span>
        ) : null}
      </div>
      <button type="submit" disabled={formik.isSubmitting}>
        Add fan
      </button>
    </form>
  );
}               