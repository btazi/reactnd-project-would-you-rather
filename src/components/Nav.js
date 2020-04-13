import React from "react";
import { makeStyles, AppBar, Toolbar, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  leftNav: {
    flex: 12,
  },
  rightNav: {
    flex: 1,
  },
  toolbar: {
    justifyContent: "space-between",
  },
}));

const Nav = (props) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <div className={classes.leftNav}>
          <Button to="/" color="inherit">
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
          <Button to="/" color="inherit">
            Log In
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
