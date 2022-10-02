import * as Yup from 'yup';

export default Yup.object().shape({
  email: Yup.string().email().required('Enter valid email-id'),
  firstName: Yup.string().required('Enter your first name'),
  role: Yup.string().required('Role is required'),
  lastName: Yup.string().required('Enter your last name'),
  password: Yup.string()
    .notRequired()
    .test('password', 'Please provide valid password', function (value) {
      if (!!this.parent.password) {
        const schema = Yup.string().matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/
        );

        return schema.isValidSync(value);
      }
      return true;
    }),
  confirmPassword: Yup.string().test(
    'password-match',
    'Password musth match',
    function test(value) {
      return this.parent.password === value;
    }
  ),
});
