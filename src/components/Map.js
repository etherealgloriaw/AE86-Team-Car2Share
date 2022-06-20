import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles({
    card: {
      display: 'flex',
      height: 300,
    },
  });

export default function Map(props) {
    const classes = useStyles();
    const { post } = props;
  
    return (
      <Grid item xs={12} md={6}>
        <CardActionArea component="a" href="#">
          <Card className={classes.card}>
              This is the map section
          </Card>
        </CardActionArea>
      </Grid>
    );
}

Map.propTypes = {
    post: PropTypes.object,
};