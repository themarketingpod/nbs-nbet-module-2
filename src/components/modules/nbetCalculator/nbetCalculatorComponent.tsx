import { Island } from '@hubspot/cms-components';
import NbetCalculatorIsland from '../../islands/nbetCalculator/nbetCalculator.tsx?island';
export const Component = ({ fieldValues }) => {
  const {
    contactForm
  } = fieldValues;
  return (
    <div>
      <Island module={NbetCalculatorIsland} contactForm={contactForm} />
    </div>
  );
};
