import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profileActions";

const AddExperience = ({ addExperience, errors }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
    disabled: false,
    errors: {},
  });

  const {
    company,
    title,
    location,
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
      setFormData((prevState) => ({
        ...prevState,
        errors,
      }));
    }
  }, [errors]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onCheck = () => {
    setFormData((prevState) => ({
      ...prevState,
      disabled: !prevState.disabled,
      current: !prevState.current,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!company) errors.company = "Company is required";
    if (!title) errors.title = "Job Title is required";
    if (!from) errors.from = "From date is required";
    return errors;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    setFormData((prevState) => ({ ...prevState, errors: formErrors }));

    if (Object.keys(formErrors).length === 0) {
      const expData = {
        company,
        title,
        location,
        from,
        to,
        current,
        description,
      };

      addExperience(expData);
      navigate("/dashboard");
    }
  };

  return (
    <div className="add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Experience</h1>
            <p className="lead text-center">
              Add any job or position that you have had in the past or current
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Company"
                name="company"
                value={company}
                onChange={onChange}
                error={formErrors?.company}
              />
              <TextFieldGroup
                placeholder="* Job Title"
                name="title"
                value={title}
                onChange={onChange}
                error={formErrors?.title}
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={location}
                onChange={onChange}
                error={formErrors?.location}
              />
              <h6>From Date</h6>
              <TextFieldGroup
                name="from"
                type="date"
                value={from}
                onChange={onChange}
                error={formErrors?.from}
              />
              <h6>To Date</h6>
              <TextFieldGroup
                name="to"
                type="date"
                value={to}
                onChange={onChange}
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
                  onChange={onCheck}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                  Current Job
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder="Job Description"
                name="description"
                value={description}
                onChange={onChange}
                error={formErrors?.description}
                info="Tell us about the position"
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

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { addExperience })(AddExperience);
