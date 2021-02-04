import React from 'react';
import './FaceRecognition.css';

export default function FaceRecognition({ imageUrl, boxes }) {
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
        {boxes.map(({ topRow, rightCol, bottomRow, leftCol }, index) => {
          return (
            <div
              key={index}
              className="bounding-box"
              style={{
                top: topRow,
                right: rightCol,
                bottom: bottomRow,
                left: leftCol,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
