import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import Spinner from "../common/Spinner";
import {
  getProfileByHandle,
  clearCurrentProfile,
} from "../../actions/profileActions";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handle } = useParams();
  const { profile, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(clearCurrentProfile());
    if (handle) {
      dispatch(getProfileByHandle(handle));
    }
  }, [dispatch, handle]);

  if (!loading && profile === null) {
    return (
      <div className="not-found">
        <h1>Page Not Found</h1>
        <p>Sorry, this profile does not exist.</p>
      </div>
    );
  }

  if (loading || profile === null) {
    return <Spinner />;
  }

  const profileContent = (
    <div>
      <div className="row">
        <div className="col-md-6">
          <Link to="/profiles" className="btn btn-light mb-3 float-left">
            Back To Profiles
          </Link>
        </div>
        <div className="col-md-6" />
      </div>
      <ProfileHeader profile={profile} />
      <ProfileAbout profile={profile} />
      <ProfileCreds
        education={profile.education}
        experience={profile.experience}
      />
      {profile.githubusername && (
        <ProfileGithub username={profile.githubusername} />
      )}
    </div>
  );

  return (
    <div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-md-12">{profileContent}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
