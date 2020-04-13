import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Nav from "./Nav";
import Login from "../components/Login";
import HomeScreen from "../components/HomeScreen";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

function App({ authedUser }) {
  const loggedIn = authedUser !== "not_connected";
  return (
    <BrowserRouter>
      <Grid container direction="column">
        <Grid item container>
          <Grid item xs={12}>
            <Nav />
          </Grid>
          <Grid item container xs={12}>
            <Switch>
              <Route exact path="/login">
                {loggedIn ? <Redirect to="/" /> : <Login />}
              </Route>
              <Route exact path="/">
                {!loggedIn ? <Redirect to="/login" /> : <HomeScreen />}
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
