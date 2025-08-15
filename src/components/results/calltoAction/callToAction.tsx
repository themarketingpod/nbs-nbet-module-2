import { Card } from '../../ui/card/card.tsx';

import styles from './callToAction.module.css';
import buttonstyles from '../../detailsForm/detailsForm.module.css';
import nbetcalcIllustration from '../../../assets/nbetcalcIllustration.png';
const CallToAction = () => {
  return (
    <Card className={styles.cta}>
      <div className={styles.ctaText}>
        <h2>Limit your cost exposure</h2>
        <p>
          Connect with our energy specialists to learn the best strategies to
          reduce the impact of rising non-commodity charges on your business.
        </p>
        <a href="">
          <button
            className={
              buttonstyles.nbsButton + ' ' + buttonstyles.nbsButton__primary
            }
          >
            Explore Solutions
          </button>
        </a>
      </div>
      <div>
        <img src={nbetcalcIllustration} alt="Share on LinkedIn" />
      </div>
    </Card>
  );
};

export { CallToAction };
