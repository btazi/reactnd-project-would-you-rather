import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/questions";
import PollResults from "./PollResults";
import PollForm from "./PollForm";
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Avatar,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2),
  },
  asks: {
    display: "flex",
    flexDirection: "row",
  },
  avatar: {
    marginRight: "5px",
  },
}));

const Poll = ({
  dispatch,
  poll,
  authorAvatar,
  isAnswered,
  pollPage,
  authedUser,
}) => {
  const classes = useStyles();
  const selectRadio = (e) => {
    const answer = e.target.value;
    isAnswered
      ? alert("You have already voted for this question")
      : dispatch(handleAnswerQuestion(poll.id, answer));
  };

  if (typeof poll === "undefined") {
    return <Redirect to="/404" />;
  }

  const chosenAnswer = poll.optionOne.votes.includes(authedUser)
    ? "optionOne"
    : "optionTwo";
  return (
    <Card className={classes.card}>
      <CardContent className="content">
        <div className={classes.asks}>
          <Avatar
            alt="logged_user"
            src={authorAvatar}
            className={classes.avatar}
          />
          <Typography variant="h6">{poll.author} asks</Typography>
        </div>
        <Typography variant="h5">Would You Rather:</Typography>
        {(!pollPage || (pollPage && !isAnswered)) && (
          <PollForm
            poll={poll}
            chosenAnswer={chosenAnswer}
            isAnswered={isAnswered}
            onRadioSelect={selectRadio}
          />
        )}
        {pollPage && isAnswered && (
          <PollResults
            poll={poll}
            authedUser={authedUser}
            chosenAnswer={chosenAnswer}
          />
        )}
        {!pollPage && (
          <Button to={`/questions/${poll.id}`} component={Link} color="primary">
            View Poll
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const id = props.match.params.question_id || props.id;
  const poll = questions[id];
  const pollPage = props.match.path.includes("questions/");
  return {
    poll,
    authorAvatar: users[poll.author].avatarURL,
    pollPage,
    isAnswered: [...poll.optionOne.votes, ...poll.optionTwo.votes].includes(
      authedUser
    ),
    authedUser,
  };
};

Poll.propTypes = {
  poll: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps)(Poll));
