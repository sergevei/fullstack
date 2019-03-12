import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import { withRouter } from 'react-router-dom';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
//import Modal from '@material-ui/core/Modal';
//import Axios from 'axios';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';


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
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  textErrors : {
    color: "#f50057",
    fontSize: 14
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends Component{

  
  state = {
    name : "",
    nickname: "",
    email : "",
    password1: "",
    password2: "",
    errors: {}
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({ errors : nextProps.errors});
    }
  }
  onChangeName (elem) {
    let value = elem.target.value;
    this.setState({name: value});
  }
  onChangeNickname (elem) {
    let value = elem.target.value;
    this.setState({nickname: value});
  }
  onChangeEmail (elem) {
    let value = elem.target.value;
    this.setState({email: value});
  }
  onChangePassword1 (elem) {
    let value = elem.target.value;
    this.setState({password1: value});
  }
  onChangePassword2 (elem) {
    let value = elem.target.value;
    this.setState({password2: value});
  }

  onSubmit(e){
    e.preventDefault();

        console.log(this.state);
  
    const newUser = {
      name: this.state.name,
      handle: this.state.nickname,
      email: this.state.email,
      password: this.state.password1,
      password2: this.state.password2,
      errors: {}
    };


    /*
    Axios
      .post("/api/users/register" , newUser)
      .then(res => console.log(res.data))
      .catch(err => {
        this.setState({ errors : err.response.data } );
      })
    */

      this.props.registerUser(newUser ,this.props.history);
  }


  render(){
    const { errors } = this.state;
    const { classes } = this.props;
    
    const { user } = this.props.auth;

    return (
      <main className={classes.main}>

        { user.name &&
          <p>{user.name}</p>
        }
  
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form}>

          <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Name</InputLabel>
              <Input id="username" name="username" autoComplete="username"  autoFocus value={this.state.name} onChange={this.onChangeName.bind(this)}/>
              { errors.name &&
                <label className={classes.textErrors}>{errors.name}</label>
              }
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="nickname">Nickname</InputLabel>
              <Input id="nickname" name="nickname" autoComplete="nickname" value={this.state.nickname} onChange={this.onChangeNickname.bind(this)}/>
              { errors.handle &&
                <label className={classes.textErrors}>{errors.handle}</label>
              }
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email"  value={this.state.email} onChange={this.onChangeEmail.bind(this)}/>
              { errors.email &&
                <label className={classes.textErrors}>{errors.email}</label>
              }
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" value={this.state.password1} onChange={this.onChangePassword1.bind(this)}/>
              { errors.password &&
                <label className={classes.textErrors}>{errors.password}</label>
              }
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password2">Confirm password</InputLabel>
              <Input name="password2" type="password" id="password2" autoComplete="current-password" value={this.state.password2} onChange={this.onChangePassword2.bind(this)}/>
              { errors.password2 &&
                <label className={classes.textErrors}>{errors.password2}</label>
              }
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onSubmit.bind(this)}
            >
              Register
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

SignIn.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(withStyles(styles)(SignIn)));