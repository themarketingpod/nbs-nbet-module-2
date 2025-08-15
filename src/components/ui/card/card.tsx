import { ReactNode } from 'react';
import styles from './card.module.css';

interface CardProps {
  className?: string;
  children: ReactNode;
}

const Card = ({ className, children }: CardProps) => {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
};

export { Card };
