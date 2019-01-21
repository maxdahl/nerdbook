import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

import { addPost } from "../../actions/postActions";

class PostForm extends Component {
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

  onTextChange = event => {
    this.setState({ text: event.target.value });
  };

  onPostSubmit = event => {
    event.preventDefault();

    const postData = {
      text: this.state.text
    };

    this.props.addPost(postData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onPostSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onTextChange}
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

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors,
    post: state.post
  };
};

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
