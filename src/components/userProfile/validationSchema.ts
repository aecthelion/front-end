import * as Yup from 'yup'

export default Yup.object().shape({
  email: Yup.string().email(),
  firstName: Yup.string(),
  lastName: Yup.string(),
  password: Yup.string().matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/,
  ),
  confirmPassword: Yup.string().test(
    'password-match',
    'Password musth match',
    function test(value) {
      return this.parent.password === value
    },
  ),
})
