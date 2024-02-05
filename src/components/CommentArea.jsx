import { Component } from "react";
// import CommentList from "./CommentList";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
// import Loading from "./Loading";
import Error from "./Error";

class CommentArea extends Component {
  state = {
    comments: [],
  };

  retrieveComments = () => {
    fetch(
      "https://striveschool-api.herokuapp.com/api/comments/" + this.props.asin,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJiOGZhNDViMjYxNTAwMTk4YTY5MzEiLCJpYXQiOjE3MDY3OTA4MjAsImV4cCI6MTcwODAwMDQyMH0.fYFlw9pK82L37PnqUapOfqDBqs9q4EWfZMiz029nFaE",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero dei commenti");
        }
      })
      .then((arrayOfComments) => {
        console.log(arrayOfComments);
        this.setState({
          comments: arrayOfComments,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.retrieveComments();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.asin !== this.props.asin) {
      this.retrieveComments();
    }
  }

  render() {
    return (
      <div>
        <CommentList commentsToShow={this.state.comments} />
        <AddComment asin={this.props.asin} />
      </div>
    );
  }
}
export default CommentArea;
