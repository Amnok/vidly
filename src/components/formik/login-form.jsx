import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

export default function Loginform1() {
  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = (values) => {
    console.log('submitted values', values);
  };
  const validationSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <label htmlFor="email">Email</label>
        <Field id="email" name="email" />
        <ErrorMessage name="email" />

        <label htmlFor="password">Password</label>
        <Field id="password" name="password" />
        <ErrorMessage name="password" />
      </Form>
    </Formik>
  );
}
