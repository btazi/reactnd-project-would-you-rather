import React from "react";
import { Typography, Divider, LinearProgress } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { green } from "@material-ui/core/colors";

const PollResults = ({ poll, authedUser, chosenAnswer }) => {
  const optionOneVotes = poll.optionOne.votes.length;
  const optionTwoVotes = poll.optionTwo.votes.length;
  const totalVotes = [...poll.optionOne.votes, ...poll.optionTwo.votes].length;
  const optionOnePerc = Math.floor((optionOneVotes / totalVotes) * 100);
  const optionTwoPerc = Math.floor((optionTwoVotes / totalVotes) * 100);
  return (
    <>
      <Typography variant="h6">
        {chosenAnswer === "optionOne" && (
          <CheckCircleOutlineIcon style={{ color: green[500] }} />
        )}
        {poll.optionOne.text} ({optionOnePerc}%)
      </Typography>
      <LinearProgress variant="determinate" value={optionOnePerc} />
      <Typography variant="subtitle2">
        {optionOneVotes} out of {totalVotes} votes
      </Typography>
      <Divider />
      <Typography variant="h6">
        {chosenAnswer === "optionTwo" && (
          <CheckCircleOutlineIcon style={{ color: green[500] }} />
        )}
        {poll.optionTwo.text} ({optionTwoPerc}%)
      </Typography>
      <LinearProgress variant="determinate" value={optionTwoPerc} />
      <Typography variant="subtitle2">
        {optionTwoVotes} out of {totalVotes} votes
      </Typography>
    </>
  );
};

export default PollResults;
