import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './ContactForm.css';

const ContactForm = () => {
  return (
    <div>
        <h1 style={{ textAlign: 'center', margin:60 }}>
        Contact Us
        </h1>   
    <div className="form-container">
      <Formik
        initialValues={{ name: '', email: '', message: '' }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(50, 'Must be 50 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          message: Yup.string()
            .max(500, 'Must be 500 characters or less')
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-field">
              <label htmlFor="name">Name:</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name">{msg => <div style={{color:'red'}}>{msg}</div>}</ErrorMessage>
            </div>
            <div className="form-field">
              <label htmlFor="email">Email:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email">{msg => <div style={{color:'red'}}>{msg}</div>}</ErrorMessage>
            </div>
            <div className="form-field">
              <label htmlFor="message">Message:</label>
              <Field as="textarea" name="message" />
              <ErrorMessage name="message">{msg => <div style={{color:'red'}}>{msg}</div>}</ErrorMessage>
            </div>
            <div className='btn-container'>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
    </div>

  );
};

export default ContactForm;
