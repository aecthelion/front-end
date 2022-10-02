import * as Yup from 'yup';

export default Yup.object().shape({
  email: Yup.string().email().required('Enter valid email-id'),
  firstName: Yup.string().required('Enter your first name'),
  lastName: Yup.string().required('Enter your last name'),
  password: Yup.string()
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/)
    .required(
      'Please valid password. One uppercase, one lowercase, one special character and no spaces'
    ),
  confirmPassword: Yup.string().test(
    'password-match',
    'Password musth match',
    function test(value) {
      return this.parent.password === value;
    }
  ),
});
