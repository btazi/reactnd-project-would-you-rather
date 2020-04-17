import React from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import LeaderBoardCard from "./LeaderBoardCard";

const LeaderBoard = ({ users }) => {
  return (
    <Grid item container xs={6} direction="row" justify="center">
      <Grid item xs={12}>
        <Typography align="center" variant="h2">
          Leader Board
        </Typography>
      </Grid>
      {users.map((user) => {
        return <LeaderBoardCard user={user} key={user.id} />;
      })}
    </Grid>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users: Object.values(users)
      .map((user) => {
        const answeredQuestions = Object.keys(user.answers).length;
        const createdQuestions = user.questions.length;
        const totalScore = answeredQuestions + createdQuestions;
        return {
          answeredQuestions,
          createdQuestions,
          totalScore,
          name: user.name,
          avatarURL: user.avatarURL,
          id: user.id,
        };
      })
      .sort((a, b) => b.totalScore - a.totalScore),
  };
};

export default connect(mapStateToProps)(LeaderBoard);
