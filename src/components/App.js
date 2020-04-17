import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import Login from "../components/Login";
import HomeScreen from "../components/HomeScreen";
import Poll from "../components/Poll";
import NewPoll from "../components/NewPoll";
import LeaderBoard from "../components/LeaderBoard";
import NotFound from "../components/NotFound";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { getInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading-bar";

function App({ authedUser, dispatch, location }) {
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
            <LoadingBar />
            {!loggedIn && (
              <Switch>
                <Route
                  path=""
                  render={({ location }) => (
                    <Login fromPath={location.pathname} />
                  )}
                />
              </Switch>
            )}
            {loggedIn && (
              <Switch>
                <Route exact path="/" component={HomeScreen} />
                <Route exact path="/questions/:question_id" component={Poll} />
                <Route exact path="/add" component={NewPoll} />
                <Route exact path="/leaderboard" component={LeaderBoard} />
                <Route component={NotFound} />
              </Switch>
            )}
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
