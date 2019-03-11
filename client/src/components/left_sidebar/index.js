import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '100%',
    //maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function SimpleList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <i className="material-icons">
                favorite
                </i>
          </ListItemIcon>
          <ListItemText primary="Popular news" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
          <i className="material-icons">
            place
            </i>
          </ListItemIcon>
          <ListItemText primary="Local news" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <i className="material-icons">
                zoom_out_map
                </i>
          </ListItemIcon>
          <ListItemText primary="World news" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <i className="material-icons">
                group
                </i>
          </ListItemIcon>
          <ListItemText primary="All users" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
          <i className="material-icons">
            record_voice_over
            </i>
          </ListItemIcon>
          <ListItemText primary="Find profile" />
        </ListItem>
      </List>
    </div>
  );
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);