import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import dayjs from "dayjs"; // Импортиране на dayjs
import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const experience = this.props.experience.map((exp) => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          {/* Използваме dayjs за форматиране на датата */}
          <span>{dayjs(exp.from).format("YYYY/MM/DD")}</span> -
          {exp.to === null ? (
            " Now"
          ) : (
            <span>{dayjs(exp.to).format("YYYY/MM/DD")}</span>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, exp._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
