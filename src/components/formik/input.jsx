import React from 'react';
import { Field } from 'formik';
import Skeleton from 'react-loading-skeleton';

export default function Input({ label, name, type }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {(props) => {
          const { field, meta, form } = props;
          const { isSubmitting } = form;
          if (isSubmitting) return <Skeleton height={40} />;

          console.log('filter props', props);
          return (
            <div>
              <input
                type={type}
                className="form-control"
                id={name}
                placeholder={name}
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
  );
}
