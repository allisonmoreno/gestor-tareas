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
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

import TextField from '@material-ui/core/TextField';


const styles = {
  card: {
    maxWidth: '250px',
  },
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
  textField: {
    width: '100%',
  },
};


class NewLane extends React.Component {
  

   state = {
    title: '',
  };


  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  
  render() {
   const { classes } = this.props;
  return (
    <Card className={classes.card}>
      {console.log(this.props)}
      <CardContent>
      <TextField
          id="title"
          label="Título"
          className={classes.textField}
          value={this.state.title}
          onChange={this.handleChange('title')}
          margin="normal"
        />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={this.props.onCancel}>
          Cancelar
        </Button>
        <Button size="small" color="primary" onClick={this.props.onAdd}>
          Agregar
        </Button>
      </CardActions>
    </Card>
  );
}
}

NewLane.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewLane);