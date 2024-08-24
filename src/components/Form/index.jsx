import { useState } from "react";

const Form = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isHover, setIsHover] = useState(false);

  return (
    <form className="d-flex justify-content-center align-items-center gap-3 mb-5">
      <input
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        type="checkbox"
        id="terms"
        className="form-check-input"
      />
      <div className="wrapper">
        <p style={{ opacity: isHover ? 1 : 0 }}>
          size gerçekten bir şey teslim etmeyeceğiz
        </p>
        <label htmlFor="terms"> Koşulları okudum ve kabul ediyorum</label>
      </div>

      <button
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        disabled={!isChecked}
        className="btn btn-primary"
      >
        Siparişi Onayla
      </button>
    </form>
  );
};

export default Form;
