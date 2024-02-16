import React, { Component } from 'react';

class CommentClass extends Component {
  _handleDelete = (event) => {
    event.preventDefault();
    if (window.confirm('Are you sure?')) {
      this.props.onDelete(this.props.comment);
    }
  };

  render() {
    return (
      <div className="comment well">
        <p className="comment-header">
          <strong>{this.props.author}</strong>
        </p>
        <p className="comment-body">{this.props.body}</p>
        <div className="comment-footer">
          <a
            href="#"
            className="comment-footer-delete"
            onClick={this._handleDelete}
          >
            Delete comment
          </a>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div
        className="comment well"
        style={{
          backgroundColor: '#3490dc',
          color: 'white',
          padding: '10px',
          marginBottom: '10px',
        }}
      >
        <p className="comment-header">
          <strong>{this.props.author}</strong>
        </p>
        <p className="comment-body">{this.props.body}</p>
        <div className="comment-footer">
          <a
            href="#"
            className="comment-footer-delete"
            onClick={this._handleDelete}
            style={{
              backgroundColor: '#1a4a73',
              color: 'white',
              padding: '2px',
              borderRadius: '4px',
            }}
          >
            Delete comment
          </a>
        </div>
      </div>
    );
  }
}

class CommentSection extends Component {
  state = {
    showComments: false,
    comments: [
      {
        id: 1,
        author: 'Sai Sir',
        body: 'Chandan tera project',
      },
      {
        id: 2,
        author: 'Ashish Sir',
        body: 'Chandan sir guide and tumlog ka',
      },
    ],
  };

  _fetchComments() {
    // Simulated fetch comments function
    // Use this function in a real application to fetch comments via AJAX
    // and update the state
    // Example:
    // fetch('/api/comments')
    //   .then(response => response.json())
    //   .then(comments => this.setState({ comments }));
  }

  componentWillMount() {
    // Uncomment the line below to start fetching comments on mount
    // this.timer = setInterval(() => this._fetchComments(), 5000);
  }

  componentWillUnmount() {
    // Uncomment the line below to clear the interval when component unmounts
    // clearInterval(this.timer);
  }

  _addComment = (author, body) => {
    const comment = {
      id: this.state.comments.length + 1,
      author,
      body,
    };

    this.setState({
      comments: [...this.state.comments, comment],
    });
  };

  _deleteComment = (comment) => {
    const updatedComments = this.state.comments.filter(
      (c) => c.id !== comment.id
    );
    this.setState({
      comments: updatedComments,
    });
  };

  _handleClick = () => {
    this.setState((prevState) => ({
      showComments: !prevState.showComments,
    }));
  };

  _getComments = () => {
    return this.state.comments.map((comment) => (
      <CommentClass
        key={comment.id}
        author={comment.author}
        body={comment.body}
        onDelete={this._deleteComment}
      />
    ));
  };

  _getCommentsTitle = (commentCount) => {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`;
    }
  };

  render() {
    const comments = this._getComments();
    const buttonText = this.state.showComments
      ? 'Hide comments'
      : 'Show comments';

    return (
      <div className="comment-box box ">
        <h3 className="text-lg">Comments</h3>
        <h4 className="comment-count text-lg">
          {this._getCommentsTitle(comments.length)}
        </h4>
        <button className="btn btn-lg btn-primary" onClick={this._handleClick}>
          {buttonText}
        </button>
        <br />
        <br />
        {this.state.showComments && (
          <div className="comment-list">{comments}</div>
        )}
        <CommentForm addComment={this._addComment} />
      </div>
    );
  }
}

class CommentForm extends Component {
  state = {
    author: '',
    body: '',
  };

  _handleSubmit = (event) => {
    event.preventDefault();
    this.props.addComment(this.state.author, this.state.body);
    this.setState({
      author: '',
      body: '',
    });
  };

  render() {
    return (
      <form className="comment-form well text-lg" onSubmit={this._handleSubmit}>
        <label className="h4 col-form-label text-lg">Join the discussion</label>
        <div className="comment-form-fields">
          <textarea
            className="form-control p-3"
            placeholder="Comment:"
            value={this.state.body}
            onChange={(e) => this.setState({ body: e.target.value })}
            style={{ width: '100%' }} // Set inline style for full width
          />
        </div>
        <div className="comment-form-actions">
          <button
            className="mr-2 rounded-full bg-primary px-2 py-1 text-xs text-white hover:bg-opacity-90"
            type="submit"
          >
            Post comment
          </button>
        </div>
      </form>
    );
  }
}

export default CommentSection;
