import "./Form.css";
import { useState } from "react";

function Form() {
  const [year_month, setYearMonth] = useState("")
  const [day, setDay] = useState("")
  const [time, setTime] = useState("")
  const apiurl = import.meta.env.VITE_POST_BOOM_URL;

  const logChange = (event) => {
    console.log(event.target.value);
    // may need to manipulate datetime string before setting
    let ymraw = event.target.value.split('-') // ['2022', '01', '24T22:56']
    let ym = ymraw[0] + "/" + ymraw[1]
    setYearMonth(ym);
    
    let daytimesplit = ymraw[2].split('T');
    let day = daytimesplit[0];
    setDay(day);

    let time = daytimesplit[1];
    setTime(time);
  };

  async function submitBoomBoom(event) {
    // event.preventDefault();
    let result = await fetch(apiurl, {
      method: 'post',
      body: JSON.stringify({
        year_month,
        day,
        time
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    console.log('result')
    console.log(result)
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
        onChange={logChange}
      />
      <div className="valid-feedback">Looks good!</div>
    </div>
  );

  const submitbtn = (
    <div className="col-12 mt-4">
      <button className="btn btn-lg submit-btn col-12" type="submit">
        Enter
      </button>
    </div>
  );
  return (
    <div>
      <form onSubmit={submitBoomBoom}
      className="row g-3 needs-validation d-flex justify-content-center">
        {datepicker}
        {submitbtn}
      </form>
    </div>
  );
}

export default Form;
