import * as Yup from 'yup';

export default Yup.object().shape({
  courseId: Yup.string().required('Select course'),
  englishLvl: Yup.string().required('Select english level'),
  technicalBackground: Yup.string().required('Select technical background'),
});
