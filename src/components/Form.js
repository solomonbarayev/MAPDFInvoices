import React from "react";
import InputSet from "./InputSet";
const Form = () => {
  return (
    <form className="form">
      <h1 className="form__title">הוספת לקוח לקבלת חשבונית כצרופה</h1>
      <InputSet />
      <button className="form__submit-btn" type="submit">
        שלח
      </button>
    </form>
  );
};

export default Form;
