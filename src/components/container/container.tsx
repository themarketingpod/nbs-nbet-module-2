import { ReactNode } from 'react';

import styles from './container.module.css';

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

const Container = ({ children, className }: ContainerProps) => {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
};

export { Container };
