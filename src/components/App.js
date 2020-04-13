import React, { useState } from "react";
import Nav from "./Nav";
import Login from "../components/Login";

import {
  Grid,
  Paper,
  Typography,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  select: {
    margin: theme.spacing(2),
    minWidth: 150,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid item xs={12}>
          <Nav />
        </Grid>
        <Grid item container xs={12}>
          <Login />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
