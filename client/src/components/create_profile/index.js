import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import {createCurrentProfile} from '../../actions/profileActions';
import { withRouter } from 'react-router-dom';
//import CssBaseline from '@material-ui/core/CssBaseline';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  textErrors : {
    color: "#f50057",
    fontSize: 14
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class CreateProfile extends Component {

    state={
        about: "",
        nickname: "",
        number: "",
        status: "",
        email: "",
        vk: "",
        facebook: "",
        instagram: "",
        github:"",
        defaultLinks: "display",
        errors: {}
    };

    componentWillReceiveProps(nextProps){
      if(nextProps.errors){
        this.setState({errors: nextProps.errors});
      }
    }

    onChangeEmail(elem){
      let value = elem.target.value;
      this.setState({email: value});
    }
    onChangeNickname(elem){
      let value = elem.target.value;
      this.setState({nickname: value});
    }
    onChangeNumber(elem){
      let value = elem.target.value;
      this.setState({number: value});
    }
    onChangeStatus(elem){
      let value = elem.target.value;
      this.setState({status: value});
    }
    onChangeAbout(elem){
      let value = elem.target.value;
      this.setState({about: value});
    }
    onChangeVK(elem){
      let value = elem.target.value;
      this.setState({vk: value});
    }
    onChangeFacebook(elem){
      let value = elem.target.value;
      this.setState({facebook: value});
    }
    onChangeInstagram(elem){
      let value = elem.target.value;
      this.setState({instagram: value});
    }
    onChangeGithub(elem){
      let value = elem.target.value;
      this.setState({github: value});
    }

    onSubmit(e){
      e.preventDefault();

      const createProfile = {
        aboutYourself: this.state.about,
        handle: this.state.nickname,
        contactNumber: this.state.number,
        status: this.state.status,
        contactEmail: this.state.email,
        vk: this.state.vk,
        facebook: this.state.facebook,
        instagram: this.state.instagram,
        github: this.state.github,
        display: "display"
      }

      //console.log(createProfile);
      this.props.createCurrentProfile(createProfile, this.props.history);
    }

  render() {

    const { classes } = this.props;
    //const { errors } = this.state;

    return (
      <div>
          <h1>Hello {this.props.auth.user.name}, you must to create your own profile</h1>
          <p>ID : {this.props.auth.user.id}</p>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <i className="material-icons">
                how_to_reg
              </i>
            </Avatar>
            <Typography component="h1" variant="h5">
              CreateProfile
            </Typography>

            <form className={classes.form}>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="about">About</InputLabel>
                <Input id="about" name="about" autoComplete="about" autoFocus value={this.state.about} onChange={this.onChangeAbout.bind(this)}/>
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="nickname">Nickname</InputLabel>
                <Input id="nickname" name="nickname" autoComplete="nickname" value={this.state.nickname} onChange={this.onChangeNickname.bind(this)}/>
                { this.props.errors.handle &&
                  <label style={{color: "#f50057"}}>{this.props.errors.handle}</label>
                }
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="number">Number</InputLabel>
                <Input id="number" name="number" autoComplete="number" value={this.state.number} onChange={this.onChangeNumber.bind(this)}/>
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="status">Status</InputLabel>
                <Input id="status" name="status" autoComplete="status" value={this.state.status} onChange={this.onChangeStatus.bind(this)}/>
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" name="email" autoComplete="email" value={this.state.email} onChange={this.onChangeEmail.bind(this)}/>
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="vk">VK</InputLabel>
                <Input id="vk" name="vk" autoComplete="vk" value={this.state.vk} onChange={this.onChangeVK.bind(this)}/>
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="facebook">Facebook</InputLabel>
                <Input id="facebook" name="facebook" autoComplete="facebook" value={this.state.facebook} onChange={this.onChangeFacebook.bind(this)}/>
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="instagram">Instagram</InputLabel>
                <Input id="instagram" name="instagram" autoComplete="instagram" value={this.state.instagram} onChange={this.onChangeInstagram.bind(this)}/>
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="github">Github</InputLabel>
                <Input id="github" name="github" autoComplete="github" value={this.state.github} onChange={this.onChangeGithub.bind(this)}/>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.onSubmit.bind(this)}
              >
                Create
              </Button>
            </form>
          </Paper>
      </div>
    )
  }
}

CreateProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    createCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps, {createCurrentProfile })(withRouter(withStyles(styles)(CreateProfile)));