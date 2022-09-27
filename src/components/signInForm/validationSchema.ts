import * as Yup from 'yup'

export default Yup.object().shape({
  email: Yup.string().email().required('Enter valid email-id'),
  password: Yup.string()
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/)
    .required(
      'Please valid password. One uppercase, one lowercase, one special character and no spaces',
    ),
})
