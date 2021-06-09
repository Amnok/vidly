import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

export default function userInfo() {
  const initialValues = {
    firstName: '',
    lastName: '',
    address: '',
    gender: '',
    language: '',
  };
  const gender = [
    { key: 'male', value: 'male' },
    { key: 'female', value: 'female' },
  ];

  const languages = [
    { key: 'cpp', value: 'cpp' },
    { key: 'Java', value: 'Java' },
    { key: 'JS', value: 'JS' },
    { key: 'python', value: 'python' },
  ];
  const onSubmit = (values) => {
    console.log('submitted values', values);
  };
  const validationSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    address: yup.string().required(),
  });

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="firstName">FirstName</label>
            <Field name="firstName">
              {(props) => {
                const { field, form, meta } = props;
                console.log(props);
                return (
                  <div>
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      placeholder="firstName"
                      {...field}
                    />
                    {meta.touched && meta.error ? (
                      <div className="alert alert-danger">{meta.error}</div>
                    ) : null}
                  </div>
                );
              }}
            </Field>
          </div>
          <div className="form-group">
            <label htmlFor="lastName">LastName</label>
            <Field name="lastName">
              {(props) => {
                const { field, form, meta } = props;
                console.log(props);
                return (
                  <div>
                    <input
                      type="text"
                      class="form-control"
                      id="lastName"
                      placeholder="lastName"
                      {...field}
                    />
                    {meta.touched && meta.error ? (
                      <div className="alert alert-danger">{meta.error}</div>
                    ) : null}
                  </div>
                );
              }}
            </Field>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <Field name="address">
              {(props) => {
                const { field, form, meta } = props;
                console.log(props);
                return (
                  <div>
                    <textarea
                      type="text"
                      class="form-control"
                      id="address"
                      placeholder="address"
                      {...field}
                    />
                    {meta.touched && meta.error ? (
                      <div className="alert alert-danger">{meta.error}</div>
                    ) : null}
                  </div>
                );
              }}
            </Field>
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <Field name="gender">
              {(props) => {
                const { field, form, meta } = props;
                console.log(props);
                gender.map((g) => (
                  <div>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gender"
                      id={g.value}
                      value={g.value}
                      {...field}
                      checked={field.value === g.value}
                    />
                    <label class="form-check-label" htmlFor={g.value}>
                      {g.key}
                    </label>
                    {meta.touched && meta.error ? (
                      <div className="alert alert-danger">{meta.error}</div>
                    ) : null}
                  </div>
                ));
              }}
            </Field>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
