import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";

const Nav = (props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button to="/" color="inherit">
          Home
        </Button>
        <Button to="/" color="inherit">
          New Question
        </Button>
        <Button to="/" color="inherit">
          LeaderBoard
        </Button>
        <Button to="/" color="inherit">
          Log In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
