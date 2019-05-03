import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';


const styles = {
  mainTitle: {
    fontSize: 14,
    fontWeight: 400,
    textTransform: 'uppercase'
  },
  mainSubtitle: {
    fontSize: 12,
    fontWeight: 400
  },
};


class LaneHeader extends React.Component {
  state = {
    anchorEl: null,
    openModal: false,
  };


  handleModalClose = () => {
    this.setState({ openModal: false });
  };

  handleLaneDelete = () => {
    this.setState({ openModal: false });
    //TODO
    this.props.actions.removeLane({laneId: this.props.id})
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleRemove = () => {
    this.setState({ openModal: true });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;
    return (
      <div className="LaneHeader">
      <CardHeader
        classes={{
            title: classes.mainTitle,
            subheader: classes.mainSubtitle
          }}
          action={
            <div>
              <IconButton
                aria-label="More"
                aria-owns={open ? 'long-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={this.handleClose}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: 200,
                  },
                }}
              >
                  <MenuItem onClick={this.handleRemove}>
                    Eliminar
                  </MenuItem>
              </Menu>
            </div>
          }
          title={this.props.title}
          subheader={this.props.label}
          style={{
            padding: 0,
          }}
        />
        <Dialog
          fullScreen={false}
          open={this.state.openModal}
          onClose={this.handleModalClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">¿Realmente deseas eliminar esta lista?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Al hacerlo también estarás eliminando las tareas que esten dentro de ella, esta acción no se puede deshacer.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleModalClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleLaneDelete} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
        
      </div>
    );
  }
}

export default withStyles(styles)(LaneHeader);