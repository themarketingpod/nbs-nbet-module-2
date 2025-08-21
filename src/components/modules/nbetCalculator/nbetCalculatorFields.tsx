import { ModuleFields, TextField, FormField } from '@hubspot/cms-components/fields';

export const fields = (
  <ModuleFields>
    <TextField name="nbetCalcTitle" label="Title" default="Title!" />
    <FormField
      name='contactForm'
      label='Submission Form'
    />
  </ModuleFields>
);
