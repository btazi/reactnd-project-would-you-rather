import React from "react";
import { connect } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  leftCard: {
    margin: theme.spacing(4),
    display: "flex",
    minHeight: "250px",
  },
  details: {
    flex: "5",
    display: "flex",
    flexDirection: "column",
  },
  cover: {
    flex: "2",
  },
  cardTitle: {
    marginBottom: theme.spacing(4),
  },
  rightCard: {
    margin: theme.spacing(4),
    minHeight: "250px",
  },
  scoreBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  score: {
    transform: `scale(1.5)`,
  },
}));

const LeaderBoard = ({ users }) => {
  const classes = useStyles();
  return (
    <Grid item container xs={6} direction="row" justify="center">
      <Grid item xs={12}>
        <Typography align="center" variant="h2">
          Leader Board
        </Typography>
      </Grid>
      {users.map((user) => {
        const {
          totalScore,
          answeredQuestions,
          createdQuestions,
          name,
          avatarURL,
          id,
        } = user;
        return (
          <React.Fragment key={id}>
            <Grid item xs={8}>
              <Card className={classes.leftCard}>
                <CardMedia
                  className={classes.cover}
                  image={avatarURL}
                  title="t"
                ></CardMedia>
                <CardContent className={classes.details}>
                  <Typography variant="h5" className={classes.cardTitle}>
                    {name}
                  </Typography>
                  <Typography variant="subtitle1">
                    Answered questions: {answeredQuestions}
                  </Typography>
                  <Typography variant="subtitle1">
                    Created questions: {createdQuestions}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card className={classes.rightCard}>
                <CardContent>
                  <Typography variant="h5" className={classes.cardTitle}>
                    Score
                  </Typography>
                  <div className={classes.scoreBox}>
                    <Chip
                      color="secondary"
                      label={totalScore}
                      className={classes.score}
                    />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </React.Fragment>
        );
      })}
    </Grid>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users: Object.values(users)
      .map((user) => {
        const answeredQuestions = Object.keys(user.answers).length;
        const createdQuestions = user.questions.length;
        const totalScore = answeredQuestions + createdQuestions;
        return {
          answeredQuestions,
          createdQuestions,
          totalScore,
          name: user.name,
          avatarURL: user.avatarURL,
          id: user.id,
        };
      })
      .sort((a, b) => b.totalScore - a.totalScore),
  };
};

export default connect(mapStateToProps)(LeaderBoard);
