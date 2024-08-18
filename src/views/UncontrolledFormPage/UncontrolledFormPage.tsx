import { ReactNode, SyntheticEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { formSchema } from '../../utils/schema';
import style from './UncontrolledFormPage.module.css';
import { countriesSelector } from '../../store/selectors';
import { FormValues } from '../../models/form';
import { defaultFormErrors } from '../../utils/const';
import { setForms } from '../../store/formsSlice';

export function UncontrolledFormPage(): ReactNode {
  const [errors, setErrors] = useState<Record<string, string>>({ ...defaultFormErrors });
  const [formError, setFormError] = useState<string>('');
  const navigate = useNavigate();
  const countriesList = useAppSelector(countriesSelector);
  const dispatch = useAppDispatch();

  const onSubmit = async (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();

    console.log(event);
    console.log('submit!');

    const target = event.target as typeof event.target & {
      name: { value: string };
      age: { value: number };
      email: { value: string };
      password: { value: string };
      confirmPassword: { value: string };
      gender: { value: string };
      ataca: { checked: boolean };
      country: { value: string };
      picture: { files: FileList };
    };

    console.log('target', { target });

    const data: FormValues = {
      name: target.name.value,
      age: target.age.value ? Number(target.age.value) : NaN,
      email: target.email.value,
      password: target.password.value,
      confirmPassword: target.confirmPassword.value,
      gender: target.gender.value,
      ataca: target.ataca.checked,
      picture: target.picture.files,
      country: target.country.value,
    };

    console.log(data);

    formSchema
      .validate(data, { abortEarly: false, context: { countriesList } })
      .then(async formData => {
        console.log('valid', formData);
        setFormError('');
        setErrors({ ...defaultFormErrors });
        const file = formData.picture[0];

        const reader = new FileReader();

        const convert = new Promise((res, rej) => {
          reader.onloadend = () => {
            res(null);
          };
          reader.onerror = () => {
            rej();
          };
        });

        reader.readAsDataURL(file);

        try {
          await convert;
          const base64String = String(reader.result).replace('data:', '').replace(/^.+,/, '');

          const { age, ataca, confirmPassword, email, gender, name, password, country } = data;
          dispatch(
            setForms({
              age,
              ataca,
              confirmPassword,
              email,
              gender,
              name,
              password,
              country,
              pictureFile: base64String,
              createdAt: new Date().toISOString(),
            }),
          );
          navigate('/');
        } catch (error) {
          console.log(error);
        }
      })
      .catch(validationErrors => {
        if (Array.isArray(validationErrors.inner)) {
          const validateErrors: Record<string, string> = validationErrors.inner.reduce(
            (acc: Record<string, string>, err: yup.ValidationError) => {
              if (err.path) {
                acc[err.path] = err?.message ?? '';
              }
              return acc;
            },
            {},
          );
          console.log(validateErrors);
          setErrors({ ...defaultFormErrors, ...validateErrors });
        } else {
          setFormError(validationErrors?.message ?? 'Something went wrong');
        }
      });
    /*
    console.log(data);
    const file = data.picture[0];

    const reader = new FileReader();

    const convert = new Promise((res, rej) => {
      reader.onloadend = () => {
        res(null);
      };
      reader.onerror = () => {
        rej();
      };
    });

    reader.readAsDataURL(file);

    try {
      await convert;
    } catch (error) {
      console.log(error);
    }
    const base64String = String(reader.result).replace('data:', '').replace(/^.+,/, '');

    const { age, ataca, confirmPassword, email, gender, name, password, country } = data;
    dispatch(
      setForms({
        age,
        ataca,
        confirmPassword,
        email,
        gender,
        name,
        password,
        country,
        pictureFile: base64String,
        createdAt: new Date().toISOString(),
      }),
    );
    reset();
    navigate('/');

    */
  };

  return (
    <div>
      <header>
        <NavLink to={`/`} className={style.link} children={'Main page'} />
        <NavLink to={`/controlled`} className={style.link} children={'Controlled form'} />
      </header>
      <main>
        <form className={style.form} onSubmit={onSubmit}>
          <label htmlFor="name">
            Name: <span className={style.errorMessage}>{errors.name}</span>
          </label>
          <input type="text" id="name" name="name" placeholder="Enter your name" />
          <label htmlFor="age">
            Age: <span className={style.errorMessage}>{errors.age}</span>
          </label>
          <input type="number" id="age" name="age" placeholder="Enter your age" />
          <label htmlFor="email">
            Email: <span className={style.errorMessage}>{errors.email}</span>
          </label>
          <input type="text" id="email" name="email" placeholder="Enter your email" />
          <label htmlFor="password">
            Password: <span className={style.errorMessage}>{errors.password}</span>
          </label>
          <input type="password" id="password" name="password" placeholder="Enter your password" />
          <label htmlFor="confirmPassword">
            Confirm: <span className={style.errorMessage}>{errors.confirmPassword}</span>
          </label>
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="confirm your password" />
          <fieldset className={style.genderFieldset}>
            <legend>
              Select gender: <span className={style.errorMessage}>{errors.gender}</span>
            </legend>
            <div className={style.radioContainer}>
              <label htmlFor="male" className={style.radioTag}>
                <input type="radio" id="male" name="gender" value="male" />
                <span>male</span>
              </label>
              <label htmlFor="female" className={style.radioTag}>
                <input type="radio" id="female" name="gender" value="female" />
                <span>female</span>
              </label>
            </div>
          </fieldset>
          <label htmlFor="ataca" className={style.checkboxLabel}>
            Terms:
            <span className={classNames(style.errorMessage, style.checkboxError)}>{errors.ataca}</span>
          </label>
          <div className={style.checkboxContainer}>
            <input type="checkbox" id="ataca" name="ataca" placeholder="Enter your password" />
            <span>accept Terms and Conditions agreement</span>
          </div>
          <label htmlFor="picture">
            Picture: <span className={style.errorMessage}>{errors.picture}</span>
          </label>
          <input type="file" id="picture" placeholder="Upload picture" name="picture" />
          <datalist id="countrydata" className={style.datalist}>
            {countriesList.map(name => (
              <option key={name}>{name}</option>
            ))}
          </datalist>
          <label htmlFor="country">
            Country: <span className={style.errorMessage}>{errors.country}</span>
          </label>

          <input type="text" list="countrydata" id="country" size={10} autoComplete="off" name="country" />

          <button type="submit">Submit</button>
          {formError && <span className={style.errorMessage}>{formError}</span>}
        </form>
      </main>
    </div>
  );
}
