import * as yup from 'yup';
import { FileSizeB } from './const';

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .required('Enter your name!')
    .matches(/^[\p{Lu}]/u, 'Need first uppercased letter'),
  age: yup.number().typeError('Enter your age').min(0, 'Enter valid age').required('Enter your age'),
  email: yup.string().email('Enter valid email!').required('Enter your email!'),
  password: yup
    .string()
    .required('Enter your password')
    .matches(/([0-9])/, 'Must Contain One number ')
    .matches(/([\p{Lu}])/u, 'Must Contain One Uppercase ')
    .matches(/([\p{Ll}])/u, 'Must Contain One lowercase ')
    .matches(/([^\p{L}0-9])/u, 'Must Contain one special character ')
    .required('Set password'),
  confirmPassword: yup
    .string()
    .required('Confirm password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().oneOf(['male', 'female'], 'Choose one').required('Choose one'),
  ataca: yup.bool().oneOf([true], 'Set this checkbox').required('Set this checkbox'),
  picture: yup
    .mixed<FileList>()
    .required('Upload picture')
    .test('fileSize', (files: FileList, { path, createError }) => {
      if (!files?.[0]) {
        return createError({
          message: 'Upload the file',
          path,
        });
      } else if (files[0].size >= 1024 * 1024 * FileSizeB) {
        return createError({
          message: 'file is too lagre',
          path,
        });
      }
      return true;
    })
    .test('fileTypeJpeg', 'We only support JPEG/PNG', (files: FileList) => {
      const filytype = files?.[0]?.type;
      return filytype === 'image/jpeg' || filytype === 'image/png';
    }),
  country: yup
    .string()
    .required('Choose country!')
    .test('countryExists', 'Choose country!', function testCountry(country) {
      if (!country) {
        return false;
      }

      const lowerCountry = country.toLowerCase();
      const { options } = this;
      const countriesList: Array<string> = options.context?.countriesList ?? [];
      return countriesList.some(x => x.toLowerCase() === lowerCountry);
    }),
});
