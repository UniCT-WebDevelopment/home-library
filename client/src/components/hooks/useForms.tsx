import React, { useState } from 'react';

/**
 * Hook allowing control of forms error and validation
 * @param initialForm
 * @param initialErrors
 * @returns
 */
const useForms = (initialForm, initialErrors) => {
  const [form, setForm] = useState(initialForm);

  const [errors, setErrors] = useState(initialErrors);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    componentType = 'default'
  ) => {
    let newValue: string | boolean = event.target.value;

    if (componentType === 'switch') {
      newValue = event.target.checked;
    }
    setForm({
      ...form,
      [event.target.id || event.target.name]: newValue
    });
  };

  const validationErrors = () => {
    let err = { ...errors };
    let isValidForm = true;
    Object.keys(errors).map((key) => {
      if (errors[key] && errors[key].validate) {
        const thisErr = { ...errors[key].validate(form) };
        if (thisErr.isValid === false) {
          isValidForm = false;
        }
        const newError = {
          [key]: { ...thisErr, validate: errors[key].validate }
        };

        err = { ...err, ...newError };
        return { key: errors[key].value };
      }

      return errors[key];
    });

    setErrors(err);

    return isValidForm;
  };

  const resetForm = () => {
    setForm(initialForm);
  };

  return {
    form,
    errors,
    resetForm,
    handleChange,
    validationErrors
  };
};

export default useForms;
