import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useParams, withRouter } from "react-router-dom";
import { answerQuestion, handleAnswerQuestion } from "../actions/questions";
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  RadioGroup,
  FormControlLabel,
  Radio,
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
  id,
  authorAvatar,
  isAnswered,
  chosenAnswer,
}) => {
  const classes = useStyles();
  const selectRadio = (e) => {
    const answer = e.target.value;
    isAnswered
      ? alert("You have already voted for this question")
      : dispatch(handleAnswerQuestion(id, answer));
  };

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
        <RadioGroup
          aria-label="poll"
          name="poll"
          value={isAnswered ? chosenAnswer : null}
          onChange={selectRadio}
        >
          <FormControlLabel
            value={"optionOne"}
            control={<Radio />}
            label={poll.optionOne.text}
          />
          <FormControlLabel
            value={"optionTwo"}
            control={<Radio />}
            label={poll.optionTwo.text}
          />
        </RadioGroup>
        <Button to={`/questions/${poll.id}`} component={Link} color="primary">
          View Poll
        </Button>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = ({ questions, users }, props) => {
  const id = props.match.params.id || props.id;
  const poll = questions[id];
  const pollPage = props.match.path.includes("questions/");
  return {
    poll,
    authorAvatar: users[poll.author].avatarURL,
    pollPage,
    chosenAnswer: props.chosenAnswer,
  };
};

Poll.propTypes = {
  id: PropTypes.string.isRequired,
  isAnswered: PropTypes.bool,
  author: PropTypes.string.isRequired,
  chosenAnswer: PropTypes.string,
};

export default withRouter(connect(mapStateToProps)(Poll));
