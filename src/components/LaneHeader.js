import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

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
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;


    return (
      <div className="LaneHeader">
      {console.log(this)}
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
                  <MenuItem onClick={this.handleClose}>
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
        
      </div>
    );
  }
}

export default withStyles(styles)(LaneHeader);