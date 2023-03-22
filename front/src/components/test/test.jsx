import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { TextareaAutosize } from "@mui/material";


export default function VerticalStepper() {
  const [inputValues, setInputValues] = useState(['']);

  const handleInputChange = (index, value) => {
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);
  };

  const handleAddInput = () => {
    setInputValues([...inputValues, '']);
  };

  const handleSaveValues = () => {
    // console.log('Input values:', inputValues);
  };

  const isLastInputValid = inputValues[inputValues.length - 1].length >= 5;

  return (
    <div>
      <Stepper orientation="vertical">
        {inputValues.map((value, index) => (
          <Step key={index}>
            <StepLabel>Step {index + 1}</StepLabel>
            <TextareaAutosize
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </Step>
        ))}
      </Stepper>
      <Button onClick={handleAddInput} disabled={!isLastInputValid}>
        Add input
      </Button>
      <Button onClick={handleSaveValues}>Save values</Button>
    </div>
  );
}
