'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import generateResume from './generateResume';

const InputField = ({ label, name, type = 'text', as = 'input', value, onChange, onBlur, error, touched, options }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-bold text-gray-700">{label}</label>
    {as === 'select' ? (
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )}
    {error && touched && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const ResumeForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      dateOfBirth: '',
      presentAddress: '',
      summary: '',
      branch: '',
      college: '',
      percentage: '',
      passingYear: '',
      skills: '',
      technicalCertifications: '',
      internshipCertifications: '',
      yearsOfExperience: '',
      experienceDetails: '',
      linkedinProfile: '',
      projectTitle: '',
      projectDescription: '',
      hobbies: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      mobileNumber: Yup.string().required('Required'),
      dateOfBirth: Yup.date().required('Required'),
      presentAddress: Yup.string().required('Required'),
      college: Yup.string().required('Required'),
      branch: Yup.string().required('Required'),
      percentage: Yup.number().required('Required').min(0).max(100),
      passingYear: Yup.number().required('Required').min(1900),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post('/api/ai/generateresume', values);
        generateResume(response.data.data);
      } catch (error) {
        console.error('Error submitting resume:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center py-8" style={{ backgroundColor: '#0A192F' }}>
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl space-y-6">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Details</h2>
          {Object.keys(formik.initialValues).map((field) => (
            <InputField
              key={field}
              label={field.replace(/([A-Z])/g, ' $1')}
              name={field}
              type={field === 'email' ? 'email' : field === 'dateOfBirth' ? 'date' : 'text'}
              value={formik.values[field]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors[field]}
              touched={formik.touched[field]}
            />
          ))}
          <div className="text-center mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeForm;