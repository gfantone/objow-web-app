import React, { useEffect, useState } from "react";
import Sketch from "@uiw/react-color-sketch";

const ColorPicker = ({ initialHex, name, onChange }) => {
  const [color, setColor] = useState(initialHex);

  useEffect(() => {
    setColor(initialHex);
  }, []);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    onChange(newColor.hex);
  };

  return (
    <>
      <Sketch
        color={color}
        disableAlpha={true}
        name={name}
        onChange={handleColorChange}
      />
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <div
          style={{
            backgroundColor: color,
            width: 30,
            height: 30,
            display: "inline-block",
          }}
        ></div>
        <span style={{ marginLeft: 10 }}>{color}</span>
      </div>
    </>
  );
};

export default ColorPicker;
