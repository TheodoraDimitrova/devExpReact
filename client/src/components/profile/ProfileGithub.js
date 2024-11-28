import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileGithub = ({ username }) => {
  const [repos, setRepos] = useState([]); // Инициализираме като масив
  const [clientId] = useState("26c196bacea7db10cf48");
  const [clientSecret] = useState("0885cb690e07d2a93a6afb0891fb552fd9f7aa53");
  const [count] = useState(5);
  const [sort] = useState("created: asc");
  const myRef = useRef(null);

  useEffect(() => {
    // Извършване на API заявка при монтиране на компонента
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Проверяваме дали данните са масив
        if (Array.isArray(data)) {
          // Обновяваме state с репозиторите, ако е масив
          if (myRef.current) {
            setRepos(data);
          }
        } else {
          // Ако не е масив, записваме празен масив или обработваме грешката
          setRepos([]);
        }
      })
      .catch((err) => console.log(err));
  }, [username, count, sort, clientId, clientSecret]);

  const repoItems =
    Array.isArray(repos) && repos.length > 0 ? (
      repos.map((repo) => (
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <Link to={repo.html_url} className="text-info" target="_blank">
                  {repo.name}
                </Link>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                Stars: {repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers: {repo.watchers_count}
              </span>
              <span className="badge badge-success">
                Forks: {repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No repositories found.</p>
    );

  return (
    <div ref={myRef}>
      <hr />
      <h3 className="mb-4">Latest Github Repos</h3>
      {repoItems}
    </div>
  );
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ProfileGithub;
