import React from 'react';
import './FaceRecognition.css';

export default function FaceRecognition({ imageUrl, box }) {
  const { topRow, rightCol, bottomRow, leftCol } = box;
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          src={imageUrl}
          alt=""
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: topRow,
            right: rightCol,
            bottom: bottomRow,
            left: leftCol,
          }}
        ></div>
      </div>
    </div>
  );
}
