import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../actions/profileActions";

const AddEducation = ({ addEducation, errors }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
    disabled: false,
    errors: {},
  });

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
    disabled,
    errors: formErrors,
  } = formData;

  const navigate = useNavigate();

  useEffect(() => {
    if (errors) {
      setFormData((prevState) => ({ ...prevState, errors }));
    }
  }, [errors]);

  // Обновяване на стойностите в състоянието
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Обработване на чекбокса
  const handleCheckboxChange = () => {
    setFormData((prevState) => ({
      ...prevState,
      disabled: !prevState.disabled,
      current: !prevState.current,
    }));
  };

  // Валидация на формата
  const validateForm = () => {
    const errors = {};
    if (!school) errors.school = "School is required";
    if (!degree) errors.degree = "Degree is required";
    if (!fieldofstudy) errors.fieldofstudy = "Field of Study is required";
    if (!from) errors.from = "From date is required";
    return errors;
  };

  // Обработване на подаването на формата
  const handleSubmit = (e) => {
    e.preventDefault();

    // Извършваме валидиране на формата
    const formErrors = validateForm();
    setFormData((prevState) => ({ ...prevState, errors: formErrors }));

    // Ако няма грешки, преминаваме към добавяне на данни и навигация
    if (Object.keys(formErrors).length === 0) {
      const eduData = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
      };

      addEducation(eduData); // Добавяме образованието
      navigate("/dashboard"); // Навигиране към таблото
    }
  };

  return (
    <div className="add-education">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">
              Add any school, bootcamp, etc. that you have attended
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={handleSubmit}>
              <TextFieldGroup
                placeholder="* School"
                name="school"
                value={school}
                onChange={handleInputChange}
                error={formErrors?.school}
              />
              <TextFieldGroup
                placeholder="* Degree or Certification"
                name="degree"
                value={degree}
                onChange={handleInputChange}
                error={formErrors?.degree}
              />
              <TextFieldGroup
                placeholder="* Field of Study"
                name="fieldofstudy"
                value={fieldofstudy}
                onChange={handleInputChange}
                error={formErrors?.fieldofstudy}
              />
              <h6>From Date</h6>
              <TextFieldGroup
                name="from"
                type="date"
                value={from}
                onChange={handleInputChange}
                error={formErrors?.from}
              />
              <h6>To Date</h6>
              <TextFieldGroup
                name="to"
                type="date"
                value={to}
                onChange={handleInputChange}
                error={formErrors?.to}
                disabled={disabled ? "disabled" : ""}
              />
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={current}
                  checked={current}
                  onChange={handleCheckboxChange}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                  Current Education
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder="Program Description"
                name="description"
                value={description}
                onChange={handleInputChange}
                error={formErrors?.description}
                info="Tell us about the program you were in"
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { addEducation })(AddEducation);
