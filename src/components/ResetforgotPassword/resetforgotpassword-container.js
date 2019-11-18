import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const usePasswordForm = (callback, token) => {
  const [inputs, setInputs] = useState({
    password1: '',
    password2: '',
  });
  const { password1, password2 } = inputs;

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
      console.log(inputs);
      if (password1 !== password2) {
        toast.error("The passwords doesn't match");
        return;
      }
      axios
        .post(
          `http://localhost:3001/validation/forgotpasswordupdate/${token}`,
          {
            password: password1,
          },
          {
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          },
        )
        .then(({ data }) => {
          if (data.success === true) {
            callback(true);
          } else {
            console.log('Nope, try again');
            toast.error(data.err);
          }
        });
    }
  };

  const handleInputChange = event => {
    event.persist();
    const newInput = {
      ...inputs,
      [event.target.name]: event.target.value,
    };
    setInputs(newInput);
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};

export default usePasswordForm;