import React from 'react';

// A reusable Button component that takes props to customize its behavior and style.
const Button = ({ onClick, label, isPrimary = true, type = "button", disabled = false }) => {
  // Use conditional classes to change the button's style based on the isPrimary prop.
  const primaryClasses = "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500";
  const secondaryClasses = "text-indigo-600 bg-white border-2 border-indigo-600 hover:bg-indigo-50 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

  const buttonClasses = `w-1/2 flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium focus:outline-none ${
    disabled
    ? 'bg-gray-400 cursor-not-allowed'
    : isPrimary ? primaryClasses : secondaryClasses
  }`;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={buttonClasses}
    >
      {label}
    </button>
  );
};

export default Button;
