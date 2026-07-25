import "./PasswordStrength.css";
export const PasswordCritieria = ({ password }) => {
  const criterias = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <>
      <div className="password-criteria">
        {criterias.map((criteria, index) => {
          return (
            <div
              className={`criteria-item ${criteria.met ? "met" : "not-met"}`}
              key={criteria.label + index}
            >
              <div className="criteria-icon">{criteria.met ? "✓" : "✕"}</div>
              <span className="criteria-text">{criteria.label}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};
