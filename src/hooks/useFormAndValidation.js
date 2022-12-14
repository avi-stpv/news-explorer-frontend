import { useState, useCallback } from 'react';

const useFormAndValidation = () => {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const handleInputChange = (evt) => {
    const { target } = evt;
    const { name, value, validationMessage } = target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: validationMessage,
    });

    setIsFormValid(target.closest('form').checkValidity());
  };
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setFormValues(newValues);
      setFormErrors(newErrors);
      setIsFormValid(newIsValid);
    },
    [setFormValues, setFormErrors, setIsFormValid],
  );

  const validateFormOnSubmit = (evt) => {
    const { target } = evt;
    const { name: formName } = target;
    const newValues = {};
    const newErrors = {};
    Array.from(document.forms[formName].elements).forEach((element) => {
      const { name: elementName, value, validationMessage } = element;
      newValues[elementName] = value;
      newErrors[elementName] = validationMessage;
    });
    setFormValues({
      ...formValues,
      ...newValues,
    });
    setFormErrors({
      ...formErrors,
      ...newErrors,
    });
    setIsFormValid(target.checkValidity());
  };

  return {
    formValues,
    formErrors,
    isFormValid,
    handleInputChange,
    resetForm,
    validateFormOnSubmit,
  };
};

export default useFormAndValidation;
