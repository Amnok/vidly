import { Field } from 'formik';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default function TextArea({ label, name }) {
  return (
    <div className="form-group">
      <label htmlFor="address">{label}</label>
      <Field name={name}>
        {(props) => {
          const { field, meta, form } = props;
          const { isSubmitting } = form;
          if (isSubmitting) return <Skeleton height={40} />;
          return (
            <div>
              <textarea
                type="text"
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
