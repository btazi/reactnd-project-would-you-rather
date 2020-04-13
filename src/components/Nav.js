import React from "react";
import { makeStyles, AppBar, Toolbar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  leftNav: {
    flex: 9,
  },
  rightNav: {
    flex: 1,
  },
  toolbar: {
    justifyContent: "space-between",
  },
}));

const Nav = ({ authedUser }) => {
  const classes = useStyles();
  const logedIn = authedUser !== "not_connected";
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <div className={classes.leftNav}>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button to="/" color="inherit">
            New Question
          </Button>
          <Button to="/" color="inherit">
            LeaderBoard
          </Button>
        </div>
        <div className={classes.rightNav}>
          {!logedIn && (
            <Button component={Link} to="/login" color="inherit">
              Log In
            </Button>
          )}
          {logedIn && (
            <Button component={Link} to="#" color="inherit">
              Log Out
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(Nav);
