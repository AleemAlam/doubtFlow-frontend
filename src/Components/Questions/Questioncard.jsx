import React from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: '3%',
    background: '#f1f1f1'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Questioncard({ title, desciption,creator, id }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          Question:
        </Typography>
        <Typography variant='h5' component='h2'>
          {title}
        </Typography>

        <Typography variant='body2' component='p'>
          {desciption}
        </Typography>
      </CardContent>
      <Grid container>
        <Grid item xs={12}>
          <CardActions>
            <Button
              size='small'
              onClick={() => history.push(`/questions/${id}`)}
            >
              See Answer
            </Button>
          </CardActions>
          <Typography className={classes.pos} color="textSecondary">
              Asked by : {creator}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
