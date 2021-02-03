import React from 'react';
import './ImageLinkForm.css';

export default function ImageLinkForm({
  value,
  onInputChange,
  onButtonSubmit,
}) {
  const handleChange = ({ target }) => {
    onInputChange(target.value);
  };

  const handleClick = () => {
    onButtonSubmit();
  };

  return (
    <div>
      <p className="f3">
        {
          'This app will detect faces in the pictures that you provide. Give it a try! '
        }
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            onChange={handleChange}
            value={value}
            className="f4 pa2 w-70 center"
            type="text"
          />
          <button
            onClick={handleClick}
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}
