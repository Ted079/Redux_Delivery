import React from 'react';
import styles from "./StatusBarMessage.module.css";

const StatusBarMessages = ({status, title, message}) => {
  let statusClasses = "";

  if (status === "error"){
    statusClasses = styles.error;
  };

  if(status === "success"){
    statusClasses = styles.success;
  };

  const messageClasses = `${styles.message} ${statusClasses}`

  return (
    <section className={messageClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
};

export default StatusBarMessages;


