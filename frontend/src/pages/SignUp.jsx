import * as Yup from 'yup';
import { useFormik } from 'formik';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../services/AuthServices';
import { useState } from 'react';
import Loader from '../components/Loader';
import { useSearchParams } from 'react-router-dom';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
    .test('is company email', 'Email must end with @vml.com', (value) => {
      if (!value) return false;
      return value.endsWith('@vml.com');
    }),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Minimum 8 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least 1 uppercase letter, 1 number, and 1 special character'
    ),
  name: Yup.string()
    .required('Name is required'),
});

const Signup = () => {
  const navigate = useNavigate();
  const [signuperror, setsignuperror] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const emailFromQuery = searchParams.get('email') || '';

  const formik = useFormik({
    initialValues: {
      email: emailFromQuery,
      password: '',
      name: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setsignuperror('');
      setLoading(true);
      try {
        await signupUser(values);
        navigate('/auth/login');
      } catch {
        const errorMessage = 'Signup failed. Try again.';
        setsignuperror(errorMessage);
        setTimeout(() => {
          setsignuperror('');
        }, 5000);
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <div className="h-full w-full flex flex-col justify-center  items-center">
      {loading ? (
        <Loader />
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          className= "max-w-140 rounded-lg py-15 px-10 w-full items-center bg-white shadow-[0px_4px_15px_0px_#00000033]"
        >
          <fieldset className="flex flex-col items-start gap-6 text-base">
            <legend className="text-title-font text-2xl font-bold mb-6">
              Signup
            </legend>

            {signuperror && (
              <div className="w-full rounded bg-red-100 px-4 py-2 text-sm text-red-600">
                {signuperror}
              </div>
            )}

            <FormInput
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.email}
              touched={formik.touched.email}
              disabled={true}
            />
            <FormInput
              label="Name"
              name="name"
              type="name"
              placeholder="Enter your name"
              required
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.name}
              touched={formik.touched.name}
            />
            <FormInput
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.password}
              touched={formik.touched.password}
            />
            <button
              type='submit'
              className="bg-black w-full cursor-pointer rounded-lg px-3 py-2 font-medium text-white hover:bg-grey"
            >
              Signup
            </button>
          </fieldset>
        </form>
      )}
    </div>
  );
};

export default Signup;
