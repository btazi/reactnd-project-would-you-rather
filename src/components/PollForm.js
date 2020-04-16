import React from "react";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

const PollForm = ({ poll, chosenAnswer, isAnswered, onRadioSelect }) => {
  return (
    <RadioGroup
      aria-label="poll"
      name="poll"
      value={isAnswered ? chosenAnswer : null}
      onChange={onRadioSelect}
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
  );
};

export default PollForm;
