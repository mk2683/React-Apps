import React, { useState } from "react";

import "./Stepper.css";

const StepperHeader = ({ stepperData, currentStep }) => {
  return (
    <>
      {stepperData.map((stepper, index) => {
        return (
          <button
            key={stepper.label}
            className={
              currentStep === index
                ? "stepper-button stepper-button-active"
                : "stepper-button"
            }
          >
            {stepper.label}
          </button>
        );
      })}
    </>
  );
};

const StepperContent = ({ data, formData, handleFormChange }) => {
  // const [error, setError] = useState(false);
  return (
    <div className="stepper-content">
      {data.inputs.map((input, index) => (
        <div key={index}>
          <label>{input.label}</label>
          <input
            type={input.type}
            placeholder={input.placeholder}
            value={formData[input.label] || ""}
            onChange={(e) => handleFormChange(input.label, e.target.value)}
            required={input.validations.includes("required")}
          />
          {formData[input.label] === "" && (
            <span className="error-msg">{input.error_msg}</span>
          )}
        </div>
      ))}
    </div>
  );
};

const StepperFooter = ({
  dataLength,
  step,
  handleNext,
  handlePrev,
  handleSubmit,
}) => {
  const renderButtons = () => {
    if (step < dataLength - 1) {
      return (
        <>
          <button onClick={handlePrev} disabled={step === 0 ? true : false}>
            Previous
          </button>
          <button onClick={handleNext}>Next</button>
        </>
      );
    } else if (step === dataLength - 1) {
      return (
        <>
          <button onClick={handlePrev}>Previous</button>
          <button onClick={handleSubmit}>Submit</button>
        </>
      );
    } else {
      return <button onClick={handleNext}>Submit</button>;
    }
  };

  return <div className="stepper-footer">{renderButtons()}</div>;
};

const Stepper = ({ data, stepperData }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    console.log("handle next");
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleFormChange = (inputName, inputValue) => {
    setFormData({ ...formData, [inputName]: inputValue });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="stepper">
      <StepperHeader stepperData={stepperData} currentStep={step} />
      <StepperContent
        data={data[step]}
        formData={formData}
        handleFormChange={handleFormChange}
      />
      <StepperFooter
        dataLength={data.length}
        step={step}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Stepper;
