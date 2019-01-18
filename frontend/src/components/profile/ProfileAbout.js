import React from "react";

const ProfileAbout = ({ profile }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">About me</h3>
          <p className="lead">{profile.bio && profile.bio}</p>
          <hr />
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {profile.skills.map((skill, i) => {
                return (
                  <div key={i} className="p-3">
                    <i className="fa fa-check" />
                    {skill}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAbout;
