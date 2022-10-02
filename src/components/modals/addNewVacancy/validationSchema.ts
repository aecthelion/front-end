import * as Yup from 'yup';

export default Yup.object().shape({
  jobTitle: Yup.string().required('Enter job title'),
  companyName: Yup.string().required('Enter company name'),
  vacancyLink: Yup.string().required('Enter vacancy link'),
  country: Yup.string().required('Enter vacancy country'),
  city: Yup.string().required('Enter vacancy city'),
  vacancyType: Yup.string().required('Please select vacancy type'),
});
