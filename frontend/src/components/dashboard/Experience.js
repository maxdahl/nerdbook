import React from "react";
import Moment from "react-moment";

const Experience = props => {
  const experience = props.experience.map(exp => {
    const to = exp.to ? <Moment format="YYYY/MM/DD">{exp.to}</Moment> : "Now";
    return (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {to}
        </td>
        <td>
          <button
            onClick={() => props.deleteExperience(exp._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

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
        </thead>
        <tbody>{experience}</tbody>
      </table>
    </div>
  );
};

export default Experience;
