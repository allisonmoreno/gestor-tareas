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
import NewCard from '../components/NewCard';
import NewLane from '../components/NewLane';

const data = {
  lanes: [
    {
      id: 'lane1',
      title: 'Por Realizar',
      label: '',
      cards: [
        {id: 'Card1', title: 'Diseño', description: 'Realizar todo lo relacionado con el front ', label: '6 hrs', user: {id: 1, name: 'Allison Roberto Moreno Preciado', title: 'Desarrollador Web'}},
        {id: 'Card2', title: 'Servicios', description: 'Hacer el back', label: '5 hrs', user: {id: 1, name: 'Allison Roberto Moreno Preciado', title: 'Desarrollador Web'}}
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
    modalOpen: false,
    menuOpen: true
  };


  onLaneAdd = () => {
    console.log('onLaneAdd');
  };
  
  onCardClick = (cardId, metadata, laneId) => {
      console.log("onCardClick",cardId, metadata, laneId);
            this.setState((prevState) => {
                 return {modalOpen: !prevState.modalOpen}
            });
          };

   handleCancel = () => {
    window.location.href= "/"
  };

  onDragEnd = (cardId, sourceLandId, targetLaneId) => {
    console.log('Calling onDragENd', cardId, sourceLandId, targetLaneId)

    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: JSON.stringify({cardId: cardId, laneId: targetLaneId}),
      url: 'http://localhost/tareas/api/setCardLane'
    };

    axios(options).then(res => {
      //console.log(res);
      if (!res.data.success){
        this.setState({ modalProcess: false});
        this.props.enqueueSnackbar(res.data.message);
      }

        
    });
  }
  componentDidMount() {
    fetch("http://localhost/tareas/api/getLanes")
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
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Cargando Datos...</div>;
    } else {
    
    return (<React.Fragment>
        <Board 
          data={this.state.items} 
          customCardLayout 
          editable
          canAddLanes
          draggable
          onLaneAdd={this.onLaneAdd}
          className={classes.boardContainer}
          addCardLink={<CustomButton />}
          customLaneHeader={<LaneHeader />}
          addLaneTitle="AGREGAR"
          newCardTemplate={<NewCard />}
          newLaneTemplate={<NewLane />}
          onCardClick={this.onCardClick}
          handleDragEnd={this.onDragEnd}
          >
            <Card />

        </Board>
    </React.Fragment>)
  }
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