import * as Yup from 'yup';

export default Yup.object().shape({
  title: Yup.string().required('Enter course title'),
  type: Yup.string().required('Please select course type'),
});
