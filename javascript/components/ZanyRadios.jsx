
import React from 'react'
export default function ZanyRadios() {
  return (
    <section className="zany-radios">
      <ul className="zany-radios-list">
        <li className="list__item first">
          <input type="radio" className="circle-radio" name="dia" id="rad1" />
          <div className="header">Type 2 Diabetes</div>
          <br />
          <label
            className="label--radio hide-til-hov"
            for="rad1"
            data-tooltip="off"
          >
            None
          </label>
        </li>
        <li className="list__item spacer">
          <input type="radio" className="radio" checked name="dia" id="rad2" />
          <label className="label--radio" for="rad2">
            Mild
        </label>
        </li>
        <li className="list__item">
          <input type="radio" className="radio" name="dia" id="rad3" />
          <label className="label--radio" for="rad3">
            Moderate
          </label>
        </li>
        <li className="list__item">
          <input type="radio" className="radio" name="dia" id="rad4" />
          <label className="label--radio" for="rad4">
            Severe
          </label>
        </li>
      </ul>
    </section>
  );
}