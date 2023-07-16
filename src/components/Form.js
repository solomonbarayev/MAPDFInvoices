import React, { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import InputSet from "./InputSet";
const Form = () => {
  const [formValid, setFormValid] = useState();

  const [contractSets, setContractSets] = useState([
    { id: randId(), contractNum: "", ezorNum: "" },
  ]);

  function randId() {
    return Math.floor(Math.random() * 100000);
  }

  function validateForm() {
    const contractNumValid = contractSets.every(
      (set) => set.contractNum !== ""
    );
    const ezorNumValid = contractSets.every((set) => set.ezorNum !== "");
    const lengthsValid = contractSets.every(
      (set) => set.contractNum.length == 8 && set.ezorNum.length == 2
    );
    const regex = /^[0-9\b]+$/;
    const onlyNumbers = contractSets.every(
      (set) => regex.test(set.contractNum) && regex.test(set.ezorNum)
    );

    const bool =
      contractNumValid && ezorNumValid && lengthsValid && onlyNumbers;
    console.log(bool);
    setFormValid(bool);
    return bool;
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    if (validateForm() === true) {
      fetch("https://ol-dev-app1:30600/rest/api/submit-job/addToReceivePDF", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contractSets),
      });
    } else {
      console.log("form not valid");
    }
  }

  const arrOfSets = contractSets.map((set) => set.id);
  return (
    <form className="form" onSubmit={handleSubmitForm}>
      <h1 className="form__title">הוספת לקוח לקבלת חשבונית כצרופה</h1>
      <p className="form__note">
        <FiAlertCircle className="form__note-icon" />
        נא לשים לב בהזנת מספר חשבון חוזה שכבר קיים במערכת מספר האיזור יתעדכן
      </p>
      {arrOfSets.map((id) => (
        <InputSet
          key={id}
          setContractSets={setContractSets}
          id={id}
          randId={randId}
          contractSets={contractSets}
        />
      ))}
      <button className="form__submit-btn" type="submit">
        שלח
      </button>
      {formValid == false && (
        <span className="form__valid-msg">הטופס אינו תקין</span>
      )}
    </form>
  );
};

export default Form;
