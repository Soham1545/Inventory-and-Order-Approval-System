import * as Yup from 'yup';
import { useFormik } from 'formik';
import FormInput from '../components/FormInput';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/AuthServices';
import { useState } from 'react';
import Loader from '../components/Loader';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'sonner';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Minimum 8 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least 1 uppercase letter, 1 number, and 1 special character'
    ),
});

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {refetchUser} = useAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await loginUser(values);
        await refetchUser();
        navigate('/');
      } catch {
        toast.error('Login failed. Try again.');
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
              Login
            </legend>

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
              Login
            </button>
          </fieldset>
        </form>
      )}
    </div>
  );
};

export default Login;
