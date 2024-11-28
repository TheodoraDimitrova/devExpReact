import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    errors: {},
  });

  const { errors, displaySocialInputs } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessages = useSelector((state) => state.errors);

  useEffect(() => {
    if (errorMessages) {
      setFormData((prevState) => ({
        ...prevState,
        errors: errorMessages,
      }));
    }
  }, [errorMessages]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      handle: formData.handle,
      company: formData.company,
      website: formData.website,
      location: formData.location,
      status: formData.status,
      skills: formData.skills,
      githubusername: formData.githubusername,
      bio: formData.bio,
      twitter: formData.twitter,
      facebook: formData.facebook,
      linkedin: formData.linkedin,
      youtube: formData.youtube,
      instagram: formData.instagram,
    };

    // Директно извикваш action за създаване на профил
    dispatch(createProfile(profileData, navigate)); // Използваме navigate директно тук
  };

  const socialInputs = displaySocialInputs && (
    <div>
      <InputGroup
        placeholder="Twitter Profile URL"
        name="twitter"
        icon="fab fa-twitter"
        value={formData.twitter}
        onChange={onChange}
        error={errors.twitter}
      />
      <InputGroup
        placeholder="Facebook Page URL"
        name="facebook"
        icon="fab fa-facebook"
        value={formData.facebook}
        onChange={onChange}
        error={errors.facebook}
      />
      <InputGroup
        placeholder="Linkedin Profile URL"
        name="linkedin"
        icon="fab fa-linkedin"
        value={formData.linkedin}
        onChange={onChange}
        error={errors.linkedin}
      />
      <InputGroup
        placeholder="YouTube Channel URL"
        name="youtube"
        icon="fab fa-youtube"
        value={formData.youtube}
        onChange={onChange}
        error={errors.youtube}
      />
      <InputGroup
        placeholder="Instagram Page URL"
        name="instagram"
        icon="fab fa-instagram"
        value={formData.instagram}
        onChange={onChange}
        error={errors.instagram}
      />
    </div>
  );

  const options = [
    { label: "* Select Professional Status", value: 0 },
    { label: "Developer", value: "Developer" },
    { label: "Junior Developer", value: "Junior Developer" },
    { label: "Senior Developer", value: "Senior Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Student or Learning", value: "Student or Learning" },
    { label: "Instructor or Teacher", value: "Instructor or Teacher" },
    { label: "Intern", value: "Intern" },
    { label: "Other", value: "Other" },
  ];

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create Your Profile</h1>
            <p className="lead text-center">
              Let's get some information to make your profile stand out
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Profile Handle"
                name="handle"
                value={formData.handle}
                onChange={onChange}
                error={errors.handle}
                info="A unique handle for your profile URL. Your full name, company name, nickname"
              />
              <SelectListGroup
                placeholder="Status"
                name="status"
                value={formData.status}
                onChange={onChange}
                options={options}
                error={errors.status}
                info="Give us an idea of where you are at in your career"
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={formData.company}
                onChange={onChange}
                error={errors.company}
                info="Could be your own company or one you work for"
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={formData.website}
                onChange={onChange}
                error={errors.website}
                info="Could be your own website or a company one"
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={formData.location}
                onChange={onChange}
                error={errors.location}
                info="City or city & state suggested (eg. Boston, MA)"
              />
              <TextFieldGroup
                placeholder="* Skills"
                name="skills"
                value={formData.skills}
                onChange={onChange}
                error={errors.skills}
                info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
              />
              <TextFieldGroup
                placeholder="Github Username"
                name="githubusername"
                value={formData.githubusername}
                onChange={onChange}
                error={errors.githubusername}
                info="If you want your latest repos and a Github link, include your username"
              />
              <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={formData.bio}
                onChange={onChange}
                error={errors.bio}
                info="Tell us a little about yourself"
              />

              <div className="mb-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prevState) => ({
                      ...prevState,
                      displaySocialInputs: !prevState.displaySocialInputs,
                    }))
                  }
                  className="btn btn-light"
                >
                  Add Social Network Links
                </button>
                <span className="text-muted">Optional</span>
              </div>
              {socialInputs}
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

export default CreateProfile;
