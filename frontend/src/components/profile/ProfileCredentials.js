import React from "react";
import Moment from "react-moment";

const ProfileCredentials = ({ education, experience }) => {
  const experienceItems = experience.map((exp, i) => {
    const to = exp.to ? <Moment format="MMMM YYYY">{exp.to}</Moment> : "Now";

    return (
      <li key={`exp-${i}`} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="MMMM YYYY">{exp.from}</Moment> - {to}
        </p>
        <p>
          <strong>Position:</strong> {exp.title}
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {exp.description ? exp.description : "No description available"}
        </p>
      </li>
    );
  });

  const educationItems = education.map((edu, i) => {
    const to = edu.to ? <Moment format="MMMM YYYY">{edu.to}</Moment> : "Now";

    return (
      <li key="edu-{i}" className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="MMMM YYYY">{edu.from}</Moment> - {to}
        </p>
        <p>
          <strong>Degree:</strong> {edu.degree}
        </p>
        <p>
          <strong>Field Of Study: </strong>
          {edu.field}
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {edu.description ? edu.description : "No description available"}
        </p>
      </li>
    );
  });

  return (
    <div className="row">
      <div className="col-md-6">
        <h3 className="text-center text-info">Experience</h3>
        <ul className="list-group">{experienceItems}</ul>
      </div>
      <div className="col-md-6">
        <h3 className="text-center text-info">Education</h3>
        <ul className="list-group">{educationItems}</ul>
      </div>
    </div>
  );
};

export default ProfileCredentials;
