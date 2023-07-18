import React, { useEffect, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import InputSet from "./InputSet";
import Status from "./Status";
import SendStatus from "./SendStatus";

const Form = () => {
  const [formValid, setFormValid] = useState();
  const [fetchErr, setFetchErr] = useState();
  const [success, setSuccess] = useState();
  const [existingNums, setExistingNums] = useState([]);

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

  useEffect(() => {
    //switch to success to false after 2 seconds
    if (success == true) {
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
  }, [success]);

  function handleSubmitForm(e) {
    e.preventDefault();
    if (validateForm() === true) {
      fetch(`/api/addToReceivePDF`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contractSets),
      })
        .then((res) => {
          if (res.ok && res.status !== 204) {
            return res.json();
          }
        })
        .then((data) => {
          setFetchErr(false);
          setSuccess(true);
          setContractSets([{ id: randId(), contractNum: "", ezorNum: "" }]);
          //this controls the message that shows the user that the contract number already exists in the system
          console.log(data);
          data != undefined
            ? setExistingNums(JSON.parse(data.nums))
            : setExistingNums([]);
        })
        .catch((err) => {
          setSuccess(false);
          console.log(err);
          setFetchErr(true);
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

      <SendStatus
        formValid={formValid}
        fetchErr={fetchErr}
        success={success}
      ></SendStatus>

      <Status existingNums={existingNums}></Status>
    </form>
  );
};

export default Form;
