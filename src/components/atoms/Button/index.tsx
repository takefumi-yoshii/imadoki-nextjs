import React from "react";
import styles from "./styles.module.css";
// ___________________________________________________________________________
//
type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
// ___________________________________________________________________________
//
export const Button: React.FC<Props> = ({ className = "", ...props }) => (
  <button {...props} className={`${className} ${styles.button}`} />
);
