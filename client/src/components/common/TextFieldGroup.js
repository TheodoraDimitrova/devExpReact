import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  name,
  placeholder = "",
  value,
  label,
  error = "",
  info = "",
  type = "text", // Default value is "text", no longer marked as required
  onChange,
  disabled = "",
}) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}{" "}
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}{" "}
      {error && <div className="invalid-feedback">{error}</div>}{" "}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired, // Still required
  placeholder: PropTypes.string, // Optional
  value: PropTypes.string.isRequired, // Still required
  info: PropTypes.string, // Optional
  error: PropTypes.string, // Optional
  type: PropTypes.string, // Not required anymore, has a default value
  onChange: PropTypes.func.isRequired, // Still required
  disabled: PropTypes.string, // Optional
};

export default TextFieldGroup;
