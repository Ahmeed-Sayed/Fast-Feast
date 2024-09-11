import React from "react";
import { Field, ErrorMessage } from "formik";

const FormField = ({ label, name, type = "text", placeholder }) => (
  <div className="control">
    <label htmlFor={name} className="label">
      {label}
    </label>
    <Field name={name} type={type} placeholder={placeholder} />
    <ErrorMessage name={name} className="error" component="span" />
  </div>
);

export default FormField;
