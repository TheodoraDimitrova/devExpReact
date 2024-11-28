import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { getCurrentProfile } from "../../actions/profileActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const errors = useSelector((state) => state.errors); // Грешки от глобалния state

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (profile === null) {
        dispatch(getCurrentProfile());
      } else if (profile && Object.keys(profile).length > 0) {
        navigate("/dashboard");
      } else {
        navigate("/create-profile");
      }
    }
  }, [auth.isAuthenticated, profile, dispatch, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(loginUser(userData)); // Изпраща потребителските данни за логин
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">
              Sign in to your DEV Experience account
            </p>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={onChange}
                error={errors.email} // Грешка от Redux
              />

              <TextFieldGroup
                placeholder="Password"
                name="password"
                type="password"
                value={password}
                onChange={onChange}
                error={errors.password} // Грешка от Redux
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
