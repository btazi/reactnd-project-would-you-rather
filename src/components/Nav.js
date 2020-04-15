import React from "react";
import { makeStyles, AppBar, Toolbar, Button, Avatar } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authedUser";

const useStyles = makeStyles((theme) => ({
  leftNav: {
    flex: 4,
  },
  rightNav: {
    flex: 1,
  },
  toolbar: {
    justifyContent: "space-between",
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
}));

const Nav = ({ dispatch, authedUser, authedUserDetails }) => {
  const handleLogout = () => {
    dispatch(logout());
    return <Redirect to="/login" />;
  };
  const classes = useStyles();
  const logedIn = authedUser !== "not_connected";
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <div className={classes.leftNav}>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button to="/new_poll" component={Link} color="inherit">
            New Question
          </Button>
          <Button to="/leaderboard" component={Link} color="inherit">
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
            <Button onClick={handleLogout} color="inherit">
              <Avatar
                alt="logged_user"
                src={authedUserDetails.avatarURL}
                className={classes.avatar}
              />
              Log Out
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    authedUserDetails: Object.values(users).find(
      (user) => user.id === authedUser
    ),
  };
}

export default connect(mapStateToProps)(Nav);
