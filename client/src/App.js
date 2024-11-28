import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute"; // Променяме реда на импортиране на PrivateRoute

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import NotFound from "./components/not-found/NotFound";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/profile/:handle" element={<Profile />} />
              <Route path="/not-found" element={<NotFound />} />

              {/* Защитени маршрути */}
              <Route
                path="/dashboard"
                element={<PrivateRoute element={Dashboard} />}
              />
              <Route
                path="/create-profile"
                element={<PrivateRoute element={CreateProfile} />}
              />
              <Route
                path="/edit-profile"
                element={<PrivateRoute element={EditProfile} />}
              />
              <Route
                path="/add-experience"
                element={<PrivateRoute element={AddExperience} />}
              />
              <Route
                path="/add-education"
                element={<PrivateRoute element={AddEducation} />}
              />
              <Route path="/feed" element={<PrivateRoute element={Posts} />} />
              <Route
                path="/post/:id"
                element={<PrivateRoute element={Post} />}
              />
            </Routes>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
