import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Nav from "./Nav";
import Login from "../components/Login";
import HomeScreen from "../components/HomeScreen";
import Poll from "../components/Poll";
import NewPoll from "../components/NewPoll";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { getInitialData } from "../actions/shared";

function App({ authedUser, dispatch }) {
  const loggedIn = authedUser !== "not_connected";
  useEffect(() => {
    dispatch(getInitialData());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Grid container direction="column">
        <Grid item container>
          <Grid item xs={12}>
            <Nav />
          </Grid>
          <Grid item container xs={12} justify="center">
            <Switch>
              <Route exact path="/login">
                {loggedIn ? <Redirect to="/" /> : <Login />}
              </Route>
              <Route exact path="/">
                {!loggedIn ? <Redirect to="/login" /> : <HomeScreen />}
              </Route>
              <Route exact path="/questions/:id">
                {!loggedIn ? <Redirect to="/login" /> : <Poll />}
              </Route>
              <Route exact path="/new_poll">
                {!loggedIn ? <Redirect to="/login" /> : <NewPoll />}
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
