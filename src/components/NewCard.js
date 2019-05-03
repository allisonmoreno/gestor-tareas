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


class NewCard extends React.Component {
  

   state = {
    // The first commit of Material-UI
    date1: new Date(),
    date2: new Date(),
    title: '',
    description: '',
    label: ''
  };

  handleDate1Change = date => {
    this.setState({ date1: date });
  };

  handleDate2Change = date => {
    this.setState({ date2: date });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleAddClick = event => {
    this.props.onAdd(this.state)
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

        <TextField
          id="label"
          label="Etiqueta"
          className={classes.textField}
          value={this.state.label}
          onChange={this.handleChange('label')}
          margin="normal"
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
         <DatePicker
            margin="normal"
            label="Fecha Inicio"
            className={classes.textField}
            value={this.state.date1}
            onChange={this.handleDate1Change}
            minDate={new Date()}
          format="yyyy-MM-dd"
          />
          <br/>
          <DatePicker
            margin="normal"
            label="Fecha Fin"
            className={classes.textField}
            value={this.state.date2}
            onChange={this.handleDate2Change}
            minDate={this.state.date1}
          format="yyyy-MM-dd"
          />
        </MuiPickersUtilsProvider>
        <TextField
          id="standard-multiline-flexible"
          label="Descripcion"
          multiline
          rowsMax="4"
          value={this.state.description}
          onChange={this.handleChange('description')}
          className={classes.textField}
          margin="normal"
        />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={this.props.onCancel}>
          Cancelar
        </Button>
        <Button size="small" color="primary" onClick={this.handleAddClick}>
          Agregar
        </Button>
      </CardActions>
    </Card>
  );
}
}

NewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewCard);