import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Input from './formik/input';
import TextArea from './formik/textArea';
import Radio from './formik/radio';
import Select from './formik/select';

export default function UserInfo() {
  const [initial, setInitial] = useState({});
  const [isLoading, setisLoading] = useState(false);

  const getInitialValues = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          firstName: 'ankit',
          lastName: 'singh',
          address: 'india ',
          gender: 'MALE',
          language: 'CPP',
        });
      }, 5000);
    });
  };
  useEffect(() => {
    const getData = async () => {
      const dt = await getInitialValues();
      console.log('filter data', dt);
      setInitial(dt);
    };
    getData();
  }, []);
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
    language: yup.string().required(),
  });

  return (
    <div className="container">
      <Formik
        initialValues={initial}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
        isLoading={isLoading}
      >
        <Form isLoading={isLoading}>
          <Input label="FirstName" name="firstName" type="text" />
          <Input label="LastName" name="lastName" type="text" />
          <TextArea label="Address" name="address" />
          <Radio label="Gender" name="gender" options={gender} />
          <Select label="language" name="language" options={languages} />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
