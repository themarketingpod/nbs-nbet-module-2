import { TextField } from '../calcFields/text/textField.tsx';
import { ActionTypes } from '../../state/calculator/calculator.state.ts';
import { EmailField } from '../calcFields/email/emailField.tsx';
import { FormEvent, useEffect } from 'react';

import styles from './detailsForm.module.css';
import { Form } from '@hubspot/cms-components';
declare global {
  interface Window {
    hbspt?: {
      forms?: {
        create: (opts: {
          portalId?: string;
          formId?: string;
          region?: string;
          target?: string;
          [key: string]: any;
        }) => void;
      };
      [key: string]: any;
    };
  }
}
const DetailsForm = ({ contactForm, dispatch, isSubmitDisabled }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isSubmitDisabled) {
      dispatch({ type: ActionTypes.SET_DETAILS_ADDED, payload: true });
    }
    console.log(e);
  };

   useEffect(() => {
    if (typeof window === 'undefined') return;

    const createForm = () => {
      window.hbspt?.forms?.create({
        portalId: '145170937',
        formId: contactForm.form_id,
        region: 'eu1',
        target: '#hubspot-form',
        onFormSubmitted: function() {
          console.log('HubSpot form successfully submitted! Unlocking results.');
          dispatch({ type: ActionTypes.SET_DETAILS_ADDED, payload: true });
        }
      });
    };

    // If script already loaded, just create the form
    if (window.hbspt && window.hbspt.forms) {
      createForm();
      return;
    }

    // Otherwise append the HubSpot script and create the form on load
    const script = document.createElement('script');
    script.src = '//js-eu1.hsforms.net/forms/embed/v2.js';
    script.async = true;
    script.onload = createForm;
    document.body.appendChild(script);

    return () => {
      // cleanup: remove form HTML so re-mounts don't duplicate
      const container = document.getElementById('hubspot-form');
      if (container) container.innerHTML = '';
      // optionally remove the script if you want:
      // document.body.removeChild(script);
    };
  }, []);

  console.log('contactForm', contactForm.form_id);
  return (
    <form>
      <div id="hubspot-form"></div>
    </form>
  );
};

export { DetailsForm };
