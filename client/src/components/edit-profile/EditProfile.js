import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, loading } = useSelector((state) => state.profile);
  const { errors } = useSelector((state) => state.errors) || {}; // Добавена защита

  const [formData, setFormData] = useState({
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
    displaySocialInputs: false,
  });

  const {
    handle,
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
    displaySocialInputs,
  } = formData;

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      const profileData = profile;

      const skillsCSV = profileData.skills.join(",");

      setFormData({
        ...formData,
        handle: profileData.handle || "",
        company: profileData.company || "",
        website: profileData.website || "",
        location: profileData.location || "",
        status: profileData.status || "",
        skills: skillsCSV || "",
        githubusername: profileData.githubusername || "",
        bio: profileData.bio || "",
        twitter: profileData.social ? profileData.social.twitter : "",
        facebook: profileData.social ? profileData.social.facebook : "",
        linkedin: profileData.social ? profileData.social.linkedin : "",
        youtube: profileData.social ? profileData.social.youtube : "",
        instagram: profileData.social ? profileData.social.instagram : "",
      });
    }
  }, [profile]);

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedProfileData = {
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
    };

    dispatch(createProfile(updatedProfileData, navigate));
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleSocialInputs = () => {
    setFormData({ ...formData, displaySocialInputs: !displaySocialInputs });
  };

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

  if (loading || !profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Edit Profile</h1>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Profile Handle"
                name="handle"
                value={handle}
                onChange={onChange}
                error={errors?.handle} // Защитена проверка
                info="A unique handle for your profile URL. Your full name, company name, nickname"
              />
              <SelectListGroup
                placeholder="Status"
                name="status"
                value={status}
                onChange={onChange}
                options={options}
                error={errors?.status} // Защитена проверка
                info="Give us an idea of where you are at in your career"
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={company}
                onChange={onChange}
                error={errors?.company} // Защитена проверка
                info="Could be your own company or one you work for"
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={website}
                onChange={onChange}
                error={errors?.website} // Защитена проверка
                info="Could be your own website or a company one"
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={location}
                onChange={onChange}
                error={errors?.location} // Защитена проверка
                info="City or city & state suggested (eg. Boston, MA)"
              />
              <TextFieldGroup
                placeholder="* Skills"
                name="skills"
                value={skills}
                onChange={onChange}
                error={errors?.skills} // Защитена проверка
                info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
              />
              <TextFieldGroup
                placeholder="Github Username"
                name="githubusername"
                value={githubusername}
                onChange={onChange}
                error={errors?.githubusername} // Защитена проверка
                info="If you want your latest repos and a Github link, include your username"
              />
              <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={bio}
                onChange={onChange}
                error={errors?.bio} // Защитена проверка
                info="Tell us a little about yourself"
              />
              <div className="mb-3">
                <button
                  type="button"
                  onClick={toggleSocialInputs}
                  className="btn btn-light"
                >
                  Add Social Network Links
                </button>
                <span className="text-muted">Optional</span>
              </div>
              {displaySocialInputs && (
                <div>{/* Добавяне на социални мрежи */}</div>
              )}
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
