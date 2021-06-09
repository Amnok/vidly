import { ErrorMessage, Field } from 'formik';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default function Radio({ options, name, label }) {
  return (
    <div className="form-group">
      <label htmlFor="gender">{label}</label>
      <Field name={name}>
        {(props) => {
          const { field, form } = props;
          const { isSubmitting } = form;
          if (isSubmitting) return <Skeleton height={40} />;
          return options.map((option) => (
            <div key={option.key} style={{ marginLeft: 20 }}>
              <input
                type="radio"
                id={option.value}
                {...field}
                className="form-check-input"
                value={option.value}
                checked={field.value === option.value}
              />
              <label className="form-check-label" htmlFor={option.value}>
                {option.key}
              </label>
            </div>
          ));
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
