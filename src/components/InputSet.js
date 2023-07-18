import React from "react";
import { BsPlusSquare } from "react-icons/bs";
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi";

const InputSet = ({ setContractSets, id, randId, contractSets }) => {
  const [errors, setErrors] = React.useState({
    contractNum: "",
    ezorNum: "",
  });

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

    validateLengths(e);

    setContractSets((prev) => {
      const newContractSets = [...prev];
      const contractSet = newContractSets.find((set) => set.id === id);
      contractSet[name] = value;
      return newContractSets;
    });
  }

  function validateLengths(e) {
    const { name, value } = e.target;

    if (name === "contractNum") {
      if (value.length < 8 && value.length > 0) {
        setErrors((prev) => ({ ...prev, contractNum: "אנא הכנס 8 ספרות" }));
      } else {
        setErrors((prev) => ({ ...prev, contractNum: "" }));
      }
    }
    if (name === "ezorNum" && value.length > 0) {
      if (value.length < 2) {
        setErrors((prev) => ({ ...prev, ezorNum: "אנא הכנס 2 ספרות" }));
      } else {
        setErrors((prev) => ({ ...prev, ezorNum: "" }));
      }
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
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9\b]/g, "");
            }}
          />
          {/* {!contractNumValid && (
            <span className="form__input-error">אנא הכנס מספרים בלבד</span>
          )} */}
          {errors.contractNum != "" && (
            <span className="form__input-error">{errors.contractNum}</span>
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
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9\b]/g, "");
            }}
          />
          {errors.ezorNum != "" && (
            // <span className="form__input-error">אנא הכנס מספרים בלבד</span>
            <span className="form__input-error">{errors.ezorNum}</span>
          )}
        </div>
      </div>
      <div className="form__btn-container">
        <button className="form__btn" type="button" onClick={addSet}>
          <FiPlusSquare color="#2779c3" className="form__icon-btn" />
        </button>
        {contractSets.length >= 2 ? (
          <button
            className="form__btn"
            type="button"
            onClick={() => removeSet(id)}
          >
            <FiMinusSquare color="#2779c3" className="form__icon-btn" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default InputSet;
