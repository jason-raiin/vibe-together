import React from 'react';

export default function ThemePicker() {
  return (
    <>
      <form className="color-picker" action="">
        <fieldset>
          <input type="radio" name="theme" id="blue" defaultChecked={true} />
          <input type="radio" name="theme" id="green" />
          <input type="radio" name="theme" id="black" />
        </fieldset>
      </form>
    </>
  );
}
