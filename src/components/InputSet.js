import React from "react";
import { BsPlusSquare } from "react-icons/bs";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";

const InputSet = ({ setContractSets, id, randId, contractSets }) => {
  const [contractNumValid, setContractNumValid] = React.useState(true);
  const [ezorNumValid, setEzorNumValid] = React.useState(true);

  function addSet() {
    setContractSets((prev) => [
      ...prev,
      { id: randId(), contractNum: "", ezorNum: "" },
    ]);
  }

  function removeSet(id) {
    setContractSets((prev) => {
      return prev.filter((set) => set.id !== id).length === 0
        ? [...prev]
        : prev.filter((set) => set.id !== id);
    });
  }

  function onChange(e) {
    const { name, value } = e.target;

    validateOnlyNumbers(e);

    setContractSets((prev) => {
      const newContractSets = [...prev];
      const contractSet = newContractSets.find((set) => set.id === id);
      contractSet[name] = value;
      return newContractSets;
    });
  }

  function validateOnlyNumbers(e) {
    const { value } = e.target;
    const regex = /^[0-9\b]+$/;
    // console.log(value === "" || regex.test(value));
    if (value === "" || regex.test(value)) {
      if (e.target.name === "contractNum") setContractNumValid(true);
      if (e.target.name === "ezorNum") setEzorNumValid(true);
    } else {
      if (e.target.name === "contractNum") setContractNumValid(false);
      if (e.target.name === "ezorNum") setEzorNumValid(false);
    }
  }

  const contractSet = contractSets.find((set) => set.id === id);

  return (
    <div className="form__row-set">
      <div className="form__input-set">
        <div className="form__input-group">
          <label className="form__label" htmlFor="contractNum">
            מספר חשבון חוזה
          </label>
          <input
            className="form__input"
            type="text"
            id="contractNum"
            name="contractNum"
            value={contractSet.contractNum}
            onChange={onChange}
            maxLength={8}
          />
          {!contractNumValid && (
            <span className="form__input-error">אנא הכנס מספרים בלבד</span>
          )}
        </div>
        <div className="form__input-group">
          <label className="form__label" htmlFor="ezorNum">
            מספר האזור
          </label>
          <input
            className="form__input form__input_type_ezorNum"
            type="text"
            id="ezorNum"
            name="ezorNum"
            value={contractSet.ezorNum}
            maxLength={2}
            onChange={onChange}
          />
          {!ezorNumValid && (
            <span className="form__input-error">אנא הכנס מספרים בלבד</span>
          )}
        </div>
      </div>
      <div className="form__btn-container">
        <button className="form__btn" type="button" onClick={addSet}>
          <FiPlusSquare color="#2779c3" />
        </button>
        {contractSets.length >= 2 ? (
          <button
            className="form__btn"
            type="button"
            onClick={() => removeSet(id)}
          >
            <FiMinusSquare color="#2779c3" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default InputSet;
