import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";

const PostItem = ({
  post,
  auth,
  showActions = true, // default value directly in destructuring
  deletePost,
  addLike,
  removeLike,
}) => {
  // Check if the user has liked the post
  const findUserLike = (likes) =>
    likes.some((like) => like.user === auth.user.id);

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt={post.name}
            />
          </a>
          <br />
          <p className="text-center">{post.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{post.text}</p>

          {showActions && (
            <>
              {/* Like button */}
              <button
                onClick={() => addLike(post._id)}
                type="button"
                className="btn btn-light mr-1"
              >
                <i
                  className={classnames("fas fa-thumbs-up", {
                    "text-info": findUserLike(post.likes),
                  })}
                />
                <span className="badge badge-light">{post.likes.length}</span>
              </button>

              {/* Unlike button */}
              <button
                onClick={() => removeLike(post._id)}
                type="button"
                className="btn btn-light mr-1"
              >
                <i className="text-secondary fas fa-thumbs-down" />
              </button>

              {/* Comments link */}
              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments
              </Link>

              {/* Delete button */}
              {post.user === auth.user.id && (
                <button
                  onClick={() => deletePost(post._id)}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
