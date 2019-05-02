import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withSnackbar } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import EditButton from '@material-ui/icons/Edit';
import AddButton from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import Board from 'react-trello'
import Card from '../components/Card'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LaneHeader from '../components/LaneHeader';


const data = {
  lanes: [
    {
      id: 'lane1',
      title: 'Por Realizar',
      label: '',
      cards: [
        {id: 'Card1', title: 'Diseño', description: 'Realizar todo lo relacionado con el front ', label: '6 hrs', usuario: {id: 1, nombre: 'Allison Roberto Moreno Preciado', puesto: 'Desarrollador Web'}},
        {id: 'Card2', title: 'Servicios', description: 'Hacer el back', label: '5 hrs', usuario: {id: 1, nombre: 'Allison Roberto Moreno Preciado', puesto: 'Desarrollador Web'}}
      ]
    },
    {
      id: 'lane2',
      title: 'En Revisión',
      label: '',
      cards: []
    },
    {
      id: 'lane3',
      title: 'Terminadas',
      label: '',
      cards: []
    }
  ]
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  hide: {
    display: 'none',
  },
  button: {
    margin: theme.spacing.unit,
  },
  addButton: {
    float: 'right',
    background: '#4caf50'
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  root: {
    flexGrow: 1,
  },
  boardContainer:{
        background: 'transparent'
  }
});


class Index extends React.Component {
  
  state = {
    error: null,
    isLoaded: false,
    items: [],
    open: false,
    menuOpen: true
  };


  onLaneAdd = () => {
  };

   handleCancel = () => {
    window.location.href= "/"
  };

  componentDidMount() {
    fetch("http://localhost/tareas/api/getTareas")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { classes } = this.props;
    const { error, isLoaded, items } = this.state;
    
    return (<React.Fragment>
        <Board 
          data={data} 
          customCardLayout 
          editable
          canAddLanes
          draggable
          onLaneAdd={this.onLaneAdd}
          className={classes.boardContainer}
          addCardLink={<CustomButton />}
          customLaneHeader={<LaneHeader />}
          addLaneTitle="AGREGAR"
          >
            <Card />

        </Board>
    </React.Fragment>)
  }
}

const CustomButton = props => {
  return (
    <Button variant="contained" size="medium" color="primary" style={{
          width: '100%',
        }}>
          AGREGAR TAREA...
        </Button>
        )
}


export default withStyles(styles)(
    withSnackbar(Index),
);