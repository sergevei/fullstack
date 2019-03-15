import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
      }
});

class ProfileActions extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Link to="/edit-profile">
            <Button variant="contained" color="primary" className={classes.button}>
                <i className="material-icons">
                    create
                </i>
                Edit Profile   
            </Button>
        </Link>
        <br></br>
        <Link to="/add-new-news">
            <Button variant="contained" color="primary" className={classes.button}>
                <i className="material-icons">
                    add
                </i>
                Create new NEWS
            </Button>
        </Link>
      </div>
    )
  }
}

ProfileActions.propTypes = {
    classes : PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileActions);