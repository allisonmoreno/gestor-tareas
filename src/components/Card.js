import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import ProgressStepper from './ProgressStepper';

const styles = {
  title: {
    fontSize: 14,
  },
  pos: {
    margin: '12px 0',
  },
  header:{
    padding: 0
  },
  mainTitle: {
    lineHeight: 1.3,
  },
  mainSubtitle: {
    fontSize: 12,
    fontWeight: 400
  },
};


function SimpleCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <CardHeader
          className={classes.header}
          classes={{
          title: classes.mainTitle,
          subheader: classes.mainSubtitle
        }}
          avatar={
            <Avatar aria-label="Recipe" className={classes.orangeAvatar}>
              R
            </Avatar>
          }
          title={props.usuario ? props.usuario.nombre : "Sin Asignar"}
          subheader={props.usuario ? props.usuario.puesto : ""}
        />
        <Typography className={classes.pos}  variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.subTitle}
        </Typography>
        <Typography component="p">
          {props.description}
        </Typography>
        <Typography component="p">
          {props.label}
        </Typography>
      </CardContent>
      <CardActions>
        <ProgressStepper />
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);