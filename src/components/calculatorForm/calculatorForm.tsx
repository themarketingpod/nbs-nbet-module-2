import { SelectField } from '../calcFields/select/selectField.tsx';
import { NumberField } from '../calcFields/number/numberField.tsx';
import { ActionTypes } from '../../state/calculator/calculator.state.ts';

import { REGIONS } from '../../constants/regions.ts';
import { TARIFFS } from '../../constants/tariffs.ts';
import { SECTORS } from '../../constants/sectors.ts';

import styles from './calculatorForm.module.css';

const CalculatorForm = ({ state, dispatch }) => {
  return (
    <form className={styles.calculatorForm}>
      <SelectField
        placeholder="Select"
        name="sectors"
        label="Your business sector"
        options={SECTORS}
        value={state.selectedSector}
        onChange={(value) =>
          dispatch({ type: ActionTypes.SET_SECTOR, payload: value })
        }
        required
      />
      <SelectField
        placeholder="Select"
        name="regions"
        label="Location of main operations"
        options={REGIONS}
        value={state.selectedRegion}
        onChange={(value) =>
          dispatch({ type: ActionTypes.SET_REGION, payload: value })
        }
        required
      />
      <SelectField
        placeholder="Select"
        name="tariffs"
        label="Your grid connection voltage"
        options={TARIFFS}
        value={state.selectedTariff}
        onChange={(value) =>
          dispatch({ type: ActionTypes.SET_TARIFF, payload: value })
        }
        required
      />
      <NumberField
        value={state.volumeMwh}
        name="consumption-mwh"
        label="Your estimated annual consumption (MWh per year)"
        placeholder="Enter number"
        onChange={(value) =>
          dispatch({ type: ActionTypes.SET_VOLUME_MWH, payload: value })
        }
      />
      <NumberField
        value={state.volumeKw}
        name="consumption-kw"
        label="Your estimated annual consumption (kW per year)"
        placeholder="Enter number"
        onChange={(value) =>
          dispatch({ type: ActionTypes.SET_VOLUME_KW, payload: value })
        }
      />
    </form>
  );
};

export { CalculatorForm };
