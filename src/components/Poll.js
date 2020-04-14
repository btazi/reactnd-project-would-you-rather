import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useParams, withRouter } from "react-router-dom";
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
const Poll = ({ poll, id, authorAvatar, isAnswered, chosenAnswer }) => {
  const classes = useStyles();
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
        {/* if Poll is answered show radio buttons with selected choice */}
        <RadioGroup
          aria-label="poll"
          name="poll"
          value={isAnswered ? chosenAnswer : null}
        >
          <FormControlLabel
            value={poll.optionOne.text}
            control={<Radio />}
            label={poll.optionOne.text}
          />
          <FormControlLabel
            value={poll.optionTwo.text}
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
  return {
    poll,
    authorAvatar: users[poll.author].avatarURL,
  };
};

Poll.propTypes = {
  id: PropTypes.string.isRequired,
  isAnswered: PropTypes.bool,
  author: PropTypes.string.isRequired,
  chosenAnswer: PropTypes.string,
};

export default withRouter(connect(mapStateToProps)(Poll));
