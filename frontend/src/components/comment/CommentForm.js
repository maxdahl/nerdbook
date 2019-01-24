import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addComment } from "../../actions/postActions";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onInputChange = e => {
    this.setState({ text: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();

    const comment = {
      text: this.state.text
    };

    this.props.addComment(comment, this.props.post.post._id);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onFormSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  name="text"
                  placeholder="Write a comment"
                  value={this.state.text}
                  onChange={this.onInputChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  addComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    post: state.post,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
