import React from "react";
import Moment from "react-moment";

const Education = props => {
  const education = props.education.map(edu => {
    const to = edu.to ? <Moment format="YYYY/MM/DD">{edu.to}</Moment> : "Now";
    return (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>{edu.field}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {to}
        </td>
        <td>
          <button
            onClick={() => props.deleteEducation(edu._id)}
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
      <h4 className="mb-4">Education Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Field of Study</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{education}</tbody>
      </table>
    </div>
  );
};

export default Education;
