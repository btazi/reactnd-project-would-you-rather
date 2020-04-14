import React, { useState } from "react";
import { connect } from "react-redux";
import { Grid, ButtonGroup, Button, makeStyles } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import Poll from "./Poll";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(2),
  },
  pollGrid: {
    justify: "center",
    alignItems: "center",
  },
}));

const HomeScreen = ({ authedUser, questions }) => {
  const [displayedQuestions, setDisplayedQuestions] = useState("answered");
  const classes = useStyles();
  const answeredQuestions = Object.values(questions).filter((question) => {
    return (
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser)
    );
  });
  const unansweredQuestions = Object.values(questions).filter((question) => {
    return !answeredQuestions.map((q) => q.id).includes(question.id);
  });
  const selectedQuestions =
    displayedQuestions === "answered" ? answeredQuestions : unansweredQuestions;
  console.log(unansweredQuestions);
  return (
    <>
      <Grid
        item
        container
        xs={12}
        className={classes.mainGrid}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <ButtonGroup
          size="large"
          color="inherit"
          aria-label="primary button group"
          variant="contained"
        >
          <Button
            startIcon={<CheckCircleOutlineIcon />}
            color={displayedQuestions === "answered" && "primary"}
            onClick={() => setDisplayedQuestions("answered")}
          >
            Answered Questions
          </Button>
          <Button
            startIcon={<RadioButtonUncheckedIcon />}
            color={displayedQuestions === "unanswered" && "primary"}
            onClick={() => setDisplayedQuestions("unanswered")}
          >
            Unanswered Questions
          </Button>
        </ButtonGroup>
        {/* Polls List */}
        <Grid item xs={6}>
          {selectedQuestions.map((poll) => (
            <Poll
              key={poll.id}
              id={poll.id}
              isAnswered={displayedQuestions === "answered"}
              chosenAnswer={
                poll.optionOne.votes.includes(authedUser)
                  ? "optionOne"
                  : "optionTwo"
              }
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

function mapStateToProps({ questions, authedUser }) {
  return {
    authedUser,
    questions,
  };
}

export default connect(mapStateToProps)(HomeScreen);
