import { ErrorMessage, Field } from 'formik';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default function Select({ options, name, label }) {
  return (
    <div className="form-group">
      <label htmlFor="language">{label}</label>
      <Field name={name}>
        {(props) => {
          const { field, meta, form } = props;
          const { isSubmitting } = form;
          if (isSubmitting) return <Skeleton height={40} />;

          return (
            <select
              className="custom-select"
              {...field}
              id={name}
              placeholder="name"
            >
              <option>Select a {name}</option>
              {options.map((opt) => (
                <option value={opt.value} key={opt.key}>
                  {opt.key}
                </option>
              ))}
            </select>
          );
        }}
      </Field>
      <ErrorMessage name={name}>
        {(error) => {
          return <div className="alert alert-danger">{error}</div>;
        }}
      </ErrorMessage>
    </div>
  );
}
