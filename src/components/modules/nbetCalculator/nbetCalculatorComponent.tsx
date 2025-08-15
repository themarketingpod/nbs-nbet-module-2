import { Island } from '@hubspot/cms-components';
import NbetCalculatorIsland from '../../islands/nbetCalculator/nbetCalculator.tsx?island';
export const Component = () => {
  return (
    <div>
      <Island module={NbetCalculatorIsland} />
    </div>
  );
};
