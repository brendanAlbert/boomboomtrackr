import "./Form.css";
import { useState } from "react";

function Form({ update, setLoading }) {
  const [year_month, setYearMonth] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [input, setInput] = useState("");
  const apiurl = import.meta.env.VITE_POST_BOOM_URL;

  const logChange = (event) => {
    // may need to manipulate datetime string before setting
    let ymraw = event.target.value.split("-"); // ['2022', '01', '24T22:56']
    let ym = ymraw[0] + "/" + ymraw[1];
    setYearMonth(ym);

    let daytimesplit = ymraw[2].split("T");
    let day = daytimesplit[0];
    setDay(day);

    let time = daytimesplit[1];
    setTime(time);

    setInput(event.target.value);
  };

  async function submitBoomBoom(event) {
    event.preventDefault();
    await fetch(apiurl, {
      method: "post",
      body: JSON.stringify({
        year_month,
        day,
        time,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    update();
    setLoading(true);
    setInput("");
  }

  const datepicker = (
    <div className="col-md-12 mt-4">
      <label htmlFor="date" className="form-label">
        Date
      </label>
      <input
        type="datetime-local"
        className="form-control"
        id="date"
        required
        value={input}
        onChange={(event) => logChange(event)}
      />
      <div className="valid-feedback">Looks good!</div>
    </div>
  );

  const submitbtn = (
    <div className="col-12 mt-4 mb-4">
      <button className="btn btn-lg submit-btn col-12" type="submit">
        Enter
      </button>
    </div>
  );
  return (
    <div className="col-12 col-lg-4 col-xl-4 col-md-8">
      <form
        onSubmit={submitBoomBoom}
        className="row g-3 needs-validation d-flex justify-content-center"
      >
        {datepicker}
        {submitbtn}
      </form>
    </div>
  );
}

export default Form;
