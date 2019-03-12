import React ,{ Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
//import Axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

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



class SignIn extends Component {

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push("/");
    }
  }

  state = {
    email: "",
    password: "",
    errors : {}
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      this.props.history.push("/");
    }

    if(nextProps.errors){
      this.setState({errors:nextProps.errors});
    }
  }

  onChangeEmail(elem){
    let value = elem.target.value;
    this.setState({email: value});
  }
  onChangePassword(elem){
    let value = elem.target.value;
    this.setState({password: value});
  }

  onSubmit(e){
    e.preventDefault();

    const checkUser = {
      email : this.state.email,
      password : this.state.password
    }
    /*
    Axios
      .post("api/users/login" , checkUser)
      .then(res => console.log(res.data))
      .catch(err => {
        this.setState({ errors : err.response.data } );
      })*/
    
    this.props.loginUser(checkUser);
  }

  render(){
    const {errors} = this.state;
    const { classes } = this.props;
  

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus value={this.state.email} onChange={this.onChangeEmail.bind(this)}/>
            { errors.email &&
              <label className={classes.textErrors}>{errors.email}</label>
            }
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" value={this.state.password} onChange={this.onChangePassword.bind(this)}/>
            { errors.password &&
              <label className={classes.textErrors}>{errors.password}</label>
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
            Sign in
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
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { loginUser } )(withStyles(styles)(SignIn));