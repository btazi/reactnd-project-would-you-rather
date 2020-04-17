import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getInitialData } from "../actions/shared";
import { login } from "../actions/authedUser";
import { Grid, Paper, Typography, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  select: {
    minWidth: 150,
    margin: theme.spacing(2),
  },
  paper: {
    marginTop: "60px",
    padding: "40px",
  },
}));

const Login = ({ dispatch, users, authedUser, fromPath }) => {
  const classes = useStyles();

  const handleUserSelect = (e) => {
    const user = e.target.value;
    dispatch(login(user));
    if (fromPath !== null) {
      return <Redirect to={fromPath} />;
    }
  };

  useEffect(() => {
    dispatch(getInitialData());
  }, [dispatch]);

  return (
    <Grid item xs={4}>
      <Paper elevation={1} className={classes.paper}>
        <Typography variant="h4" align="center">
          Would You Rather App
        </Typography>
        <Typography variant="subtitle1" align="center">
          Select a user to get started:
        </Typography>
        <Select
          autoWidth
          value={authedUser}
          className={classes.select}
          onChange={handleUserSelect}
          placeholder="Please select a user"
        >
          <MenuItem value={authedUser || "not_selected"}>
            Please Select a user
          </MenuItem>
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </Paper>
    </Grid>
  );
};

function mapStateToProps({ users, authedUser }) {
  return {
    users: Object.values(users),
    authedUser,
  };
}

export default connect(mapStateToProps)(Login);
