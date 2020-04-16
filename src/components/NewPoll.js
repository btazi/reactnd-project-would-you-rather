import React, { useState } from "react";
import {
  FormControl,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Divider,
  Button,
  makeStyles,
} from "@material-ui/core";
import { connect } from "react-redux";
import { handleSaveQuestion } from "../actions/questions";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
    mainCard: {
      width: "100%",
      marginTop: theme.spacing(2),
    },
    form: {
      margin: theme.spacing(2),
      width: "100%",
    },
  };
});

const NewPoll = ({ history, dispatch }) => {
  const classes = useStyles();
  const [options, setOptions] = useState({
    optionOneText: "",
    optionTwoText: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOptions({ ...options, [name]: value });
  };

  const handleSubmit = (e) => {
    dispatch(handleSaveQuestion(options))
      .then(
        setOptions({
          optionOneText: "",
          optionTwoText: "",
        })
      )
      .then(history.push("/"));
  };

  const submitDisabled =
    options.optionOneText.length < 6 || options.optionTwoText.length < 6;

  return (
    <Grid item container xs={4}>
      <Card className={classes.mainCard}>
        <CardContent>
          <FormControl className={classes.form}>
            <Typography variant="h4" align="center">
              New Question
            </Typography>
            <Divider />
            <TextField
              label="Would you rather..."
              required
              name="optionOneText"
              value={options.optionOneText}
              onChange={handleChange}
            />
            <TextField
              label="or..."
              required
              name="optionTwoText"
              value={options.optionTwoText}
              onChange={handleChange}
            />
            <Button
              disabled={submitDisabled}
              color="primary"
              onClick={handleSubmit}
            >
              Save Question
            </Button>
          </FormControl>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default withRouter(connect()(NewPoll));
