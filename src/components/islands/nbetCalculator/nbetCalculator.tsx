import { useEffect, useMemo, useReducer } from 'react';

import { getYearsForDropdown } from '../../../lib/getYearsForDropdown.ts';
import linkedInIcon from '../../../assets/linkedInIcon.png';
// Constants
import { REGIONS } from '../../../constants/regions.ts';
import { TARIFFS } from '../../../constants/tariffs.ts';

// Components
import { Container } from '../../container/container.tsx';

// Calculator
import { calculator } from '../../../lib/calculator/calculator.ts';

// Form Fields
import { SelectField } from '../../calcFields/select/selectField.tsx';
import { NumberField } from '../../calcFields/number/numberField.tsx';

// Charts
import { DoughnutChart } from '../../charts/doughnutChart/doughnutChart.tsx';

// Helpers
import { getDates } from '../../../lib/dates/getDates.ts';

// Styles
import styles from './nbetCalculator.module.css';
import buttonstyles from '../../detailsForm/detailsForm.module.css';

import { CalcResultsDoughnuts } from '../../results/calcResultsDoughnuts.tsx';
import { ForecastChart } from '../../results/forecastChart/forecastChart.tsx';

// State
import {
  ActionTypes,
  calcReducer,
  initialCalcState,
} from '../../../state/calculator/calculator.state.ts';
import { CalculatorForm } from '../../calculatorForm/calculatorForm.tsx';
import { DetailsForm } from '../../detailsForm/detailsForm.tsx';
import { Charges } from '../../results/charges/charges.tsx';
import { CallToAction } from '../../results/calltoAction/callToAction.tsx';

const dates = getDates();
const yearDropdowns = getYearsForDropdown();

const getEmptyResults = () => {
  const startYear = new Date().getFullYear();
  const results = [];
  for (let i = 0; i < 6; i++) {
    results.push({
      fiscalYear: `${startYear + i}-${startYear + i + 1}`,
      totals: {
        systemTotal: 0,
        systemPercentage: 0,
        policyTotal: 0,
        policyPercentage: 0,
        networkTotal: 0,
        networkPercentage: 0,
        total: 0,
      },
    });
  }
  return results;
};

const EMPTY_RESULTS = getEmptyResults();

const NbetCalculatorIsland = () => {
  const [state, dispatch] = useReducer(calcReducer, initialCalcState);

  // TODO: Get query string params to populate form values
  useEffect(() => {
    // Create a params object from the current URL's query string
    const params = new URLSearchParams(window.location.search);

    // Get each value by its key
    const region = params.get('region');
    const tariff = params.get('tariff');
    const mwh = params.get('mwh');
    const kw = params.get('kw');

    // Dispatch actions to update the state if a value was found in the URL
    if (region) dispatch({ type: ActionTypes.SET_REGION, payload: region });
    if (tariff) dispatch({ type: ActionTypes.SET_TARIFF, payload: tariff });
    if (mwh) dispatch({ type: ActionTypes.SET_VOLUME_MWH, payload: mwh });
    if (kw) dispatch({ type: ActionTypes.SET_VOLUME_KW, payload: kw });
    // Add other fields as needed...
  }, []); // The empty array [] ensures this only runs once on page load

  const calculatorValues = useMemo(() => {
    const calculatedValues = calculator(state);

    if (!state.detailsAdded) {
      return EMPTY_RESULTS;
    }
    return calculatedValues;
  }, [state, state.detailsAdded]);
  console.log(state.detailsAdded);

  //Memoized validation for the first form (calculator inputs)
  const isCalculatorFormValid = useMemo(() => {
    const {
      selectedRegion,
      selectedTariff,
      volumeMwh,
      volumeKw,
    } = state;
    return (
      selectedRegion &&
      selectedTariff &&
      (volumeMwh || volumeKw)
    );
  }, [state]);

  //Memoized validation for the second form (user details)
  const isDetailsFormValid = useMemo(() => {
    const { firstName, lastName, email } = state;
    return firstName && lastName && email;
  }, [state]);

  const handleCopyUrl = async (action?: 'linkedin' | 'copy') => {
    // This part is the same: it builds the URL from the current state
    const params = new URLSearchParams();
    if (state.selectedRegion) params.append('region', state.selectedRegion);
    if (state.selectedTariff) params.append('tariff', state.selectedTariff);
    if (state.volumeMwh) params.append('mwh', state.volumeMwh);
    if (state.volumeKw) params.append('kw', state.volumeKw);

    const newUrl = `${window.location.origin}${
      window.location.pathname
    }?${params.toString()}`;

    // This part changes: it decides what to do based on the 'action'
    if (action === 'linkedin') {
      const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        newUrl,
      )}`;
      window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
    } else {
      // Default action is to copy to clipboard
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(newUrl);
      } else {
        // Fallback logic
        const textArea = document.createElement('textarea');
        textArea.value = newUrl;
        textArea.style.position = 'absolute';
        textArea.style.left = '-999999px';
        document.body.prepend(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
        } finally {
          textArea.remove();
        }
      }
      alert('URL copied to clipboard!');
    }
  };

  return (
    <section className={styles.calculatorWrapper}>
      <Container>
        <div className={styles.calculator}>
          <div>
            <h2>Calculate your costs</h2>
            <p>
              Tell us a little about your business to get your personalised cost
              forecast.
            </p>

            <CalculatorForm state={state} dispatch={dispatch} />

            {isCalculatorFormValid && !state.detailsAdded && (
              <DetailsForm
                state={state}
                dispatch={dispatch}
                isSubmitDisabled={!isDetailsFormValid}
              />
            )}

            {state.detailsAdded && (
              <div className={styles.shareContainer}>
                <h4>Share your results:</h4>
                <div className={styles.shareButtonsContainer}>
                  <button
                    className={styles.linkedinButton}
                    onClick={() => handleCopyUrl('linkedin')}
                  >
                    <img src={linkedInIcon} alt="Share on LinkedIn" />
                  </button>
                  <button
                    className={`${buttonstyles.nbsButton} ${buttonstyles.nbsButton__outline}`}
                    onClick={() => handleCopyUrl()}
                  >
                    Copy URL link
                  </button>
                </div>
              </div>
            )}
            <p className={styles.disclaimer}>
              <span>* Please note:</span> This figure is an indicative view
              based on the information you provide and the latest industry
              knowledge and scientific understanding. This includes data and
              modelling from nBS' Optimisation Desk and Cornwall Insight’s
              Business Energy Cost Forecast (GB).
            </p>
          </div>

          <div
            className={`${styles.results} ${
              state.detailsAdded ? '' : styles.resultsDisabled
            }`}
          >
            <Charges results={calculatorValues} />
            <CallToAction />
            <CalcResultsDoughnuts results={calculatorValues} />
            <ForecastChart results={calculatorValues} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NbetCalculatorIsland;
