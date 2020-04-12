import React from "react";
import Nav from "./Nav";
import { Grid } from "@material-ui/core";

function App() {
  return (
    <Grid container direction="column">
      <Nav />
      <Grid item container>
        <Grid item xs={6}>
          test
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
