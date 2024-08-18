import { ReactNode } from 'react';
import style from './ControlledFormPage.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { formSchema } from '../../utils/schema';
import { FormValues } from '../../models/form';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { countriesSelector } from '../../store/selectors';
import { setForms } from '../../store/formsSlice';

export function ControlledFormPage(): ReactNode {
  const navigate = useNavigate();
  const countriesList = useAppSelector(countriesSelector);
  const dispatch = useAppDispatch();
  const schema = formSchema;
  const { register, handleSubmit, formState, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {},
    context: { countriesList: countriesList },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    console.log('submit!');
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <header>
        <NavLink to={`/`} className={style.link} children={'Main page'} />
        <NavLink to={`/uncontrolled`} className={style.link} children={'Uncontrolled form'} />
      </header>
      <main>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">
            Name: <span className={style.errorMessage}>{formState.errors.name?.message}</span>
          </label>
          <input type="text" id="name" {...register('name')} placeholder="Enter your name" />
          <label htmlFor="age">
            Age: <span className={style.errorMessage}>{formState.errors.age?.message}</span>
          </label>
          <input type="number" id="age" {...register('age')} placeholder="Enter your age" />
          <label htmlFor="email">
            Email: <span className={style.errorMessage}>{formState.errors.email?.message}</span>
          </label>
          <input type="text" id="email" {...register('email')} placeholder="Enter your email" />
          <label htmlFor="password">
            Password: <span className={style.errorMessage}>{formState.errors.password?.message}</span>
          </label>
          <input type="password" id="password" {...register('password')} placeholder="Enter your password" />
          <label htmlFor="confirmPassword">
            Confirm: <span className={style.errorMessage}>{formState.errors.confirmPassword?.message}</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
            placeholder="confirm your password"
          />
          <fieldset className={style.genderFieldset}>
            <legend>
              Select gender: <span className={style.errorMessage}>{formState.errors.gender?.message}</span>
            </legend>
            <div className={style.radioContainer}>
              <label htmlFor="male" className={style.radioTag}>
                <input type="radio" id="male" {...register('gender')} value="male" />
                <span>male</span>
              </label>
              <label htmlFor="female" className={style.radioTag}>
                <input type="radio" id="female" {...register('gender')} value="female" />
                <span>female</span>
              </label>
            </div>
          </fieldset>
          <label htmlFor="ataca" className={style.checkboxLabel}>
            Terms:
            <span className={classNames(style.errorMessage, style.checkboxError)}>
              {formState.errors.ataca?.message}
            </span>
          </label>
          <div className={style.checkboxContainer}>
            <input type="checkbox" id="ataca" {...register('ataca')} placeholder="Enter your password" />
            <span>accept Terms and Conditions agreement</span>
          </div>
          <label htmlFor="picture">
            Picture: <span className={style.errorMessage}>{formState.errors.picture?.message}</span>
          </label>
          <input type="file" id="picture" placeholder="Upload picture" {...register('picture')} />
          <datalist id="countrydata" className={style.datalist}>
            {countriesList.map(name => (
              <option key={name}>{name}</option>
            ))}
          </datalist>
          <label htmlFor="country">
            Country: <span className={style.errorMessage}>{formState.errors.country?.message}</span>
          </label>

          <input type="text" list="countrydata" id="country" size={10} autoComplete="off" {...register('country')} />

          <button type="submit" disabled={!formState.isValid}>
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}
