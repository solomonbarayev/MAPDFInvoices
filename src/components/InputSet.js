import React from "react";

const InputSet = () => {
  return (
    <div className="form__input-set">
      <div className="form__input-group">
        <label className="form__label" htmlFor="contractNum">
          מספר חשבון חוזה
        </label>
        <input className="form__input" type="text" id="contractNum" />
      </div>
      <div className="form__input-group">
        <label className="form__label" htmlFor="ezorNum">
          מספר האזור
        </label>
        <input className="form__input" type="text" id="ezorNum" />
      </div>
      <div className="form__add">
        <button className="form__add-btn" type="button">
          +
        </button>
      </div>
    </div>
  );
};

export default InputSet;
