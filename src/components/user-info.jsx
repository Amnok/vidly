import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { options } from 'joi-browser';

export default function userInfo() {
  const initialValues = {
    firstName: '',
    lastName: '',
    address: '',
    gender: '',
    language: '',
  };
  const gender = [
    { key: 'male', value: 'MALE' },
    { key: 'female', value: 'FEMALE' },
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
    gender: yup.string().required(),
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

          {/* input */}

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

          {/* text area */}

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

          {/* radio button */}

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <Field name="gender">
              {(props) => {
                const { field, form, meta } = props;
                console.log(props);
                return gender.map((option) => (
                  <div key={option.key} style={{ marginLeft: 20 }}>
                    <input
                      type="radio"
                      id={option.value}
                      {...field}
                      class="form-check-input"
                      value={option.value}
                      checked={field.value === option.value}
                    />
                    <label class="form-check-label" htmlFor={option.value}>
                      {option.key}
                    </label>
                  </div>
                ));
              }}
            </Field>
            <ErrorMessage name="gender">
              {(error) => {
                return <div className="alert alert-danger">{error}</div>;
              }}
            </ErrorMessage>
          </div>

          {/* dropdown */}

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
