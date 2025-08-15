import { TextField } from '../calcFields/text/textField.tsx';
import { ActionTypes } from '../../state/calculator/calculator.state.ts';
import { EmailField } from '../calcFields/email/emailField.tsx';
import { FormEvent } from 'react';

import styles from './detailsForm.module.css';

const DetailsForm = ({ state, dispatch, isSubmitDisabled }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isSubmitDisabled) {
      dispatch({ type: ActionTypes.SET_DETAILS_ADDED, payload: true });
    }
    console.log(e);
  };
  return (
    <form>
      <TextField
        name="firstname"
        placeholder="First Name*"
        label="First name"
        onChange={(value) =>
          dispatch({ type: ActionTypes.SET_FIRST_NAME, payload: value })
        }
        required
      />
      <TextField
        name="lastname"
        label="Last name*"
        placeholder="Last Name"
        onChange={(value) =>
          dispatch({ type: ActionTypes.SET_LAST_NAME, payload: value })
        }
        required
      />
      <EmailField
        name="email"
        label="Email address*"
        placeholder="Enter Email"
        onChange={(value) =>
          dispatch({ type: ActionTypes.SET_EMAIL, payload: value })
        }
        required
      />
      <button
        type="submit"
        disabled={isSubmitDisabled}
        onClick={(e) => handleSubmit(e)}
        className={styles.nbsButton + ' ' + styles.nbsButton__primary}
      >
        Get my results
      </button>
    </form>
  );
};

export { DetailsForm };
