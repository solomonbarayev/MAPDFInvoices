import React from "react";

const SendStatus = ({ formValid, fetchErr, success }) => {
  return (
    <>
      {formValid == false && (
        <span className="form__valid-msg">הטופס אינו תקין</span>
      )}
      {fetchErr == true && (
        <span className="form__valid-msg">
          הייתה שגיאת מערכת. אנא צור קשר עם אורדע.
        </span>
      )}
      {success == true && (
        <span className="form__valid-msg form__valid-msg_type_success">
          הטופס נשלח בהצלחה
        </span>
      )}
    </>
  );
};

export default SendStatus;
