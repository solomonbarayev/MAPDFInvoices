import React from "react";

const Status = ({ existingNums }) => {
  return (
    <>
      {existingNums.length > 0 && (
        <div className="form__valid-msg form__valid-msg_type_success form__status">
          {existingNums.length > 1 ? (
            <p>
              מספרי חשבון החוזה הבאים קיימים במערכת - לפיכך עודכנו רק מספרי
              האיזור:
            </p>
          ) : (
            <p>מספר חשבון החוזה הבא קיים במערכת לפיכך עודכן רק מספר האיזור:</p>
          )}
          {existingNums.map((num) => (
            <p key={num.contractNum}>
              <span style={{ fontWeight: 700 }}>חשבון חוזה</span>:{" "}
              {num.contractNum} <span style={{ fontWeight: 700 }}>- אזור</span>:{" "}
              {num.ezorNum}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default Status;
