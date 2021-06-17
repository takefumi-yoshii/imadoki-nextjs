import React from "react";
import styles from "./styles.module.css";
// ___________________________________________________________________________
//
type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
// ___________________________________________________________________________
//
export const InputText: React.FC<Props> = ({
  className = "",
  type = "text",
  ...props
}) => (
  <input {...props} type={type} className={`${className} ${styles.input}`} />
);
