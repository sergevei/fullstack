import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import {createNews} from '../../actions/profileActions';
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

class AddNewNews extends Component {

    state={
        img: "",
        desc: "",
        allText: "",
        category: "",
        title:"",
        errors: {}
    };

    onChangeImg(elem){
      let value = elem.target.value;
      this.setState({img: value});
    }
    onChangeDesc(elem){
        let value = elem.target.value;
        this.setState({desc: value});
      }
    onChangeText(elem){
        let value = elem.target.value;
        this.setState({allText: value});
    }
    onChangeCategory(elem){
        let value = elem.target.value;
        this.setState({category: value});
    }
    onChangeTitle(elem){
        let value = elem.target.value;
        this.setState({title: value});
    }

    onSubmit(e){
      e.preventDefault();

      const createNews = {
        img: this.state.img,
        desc: this.state.desc,
        allText: this.state.allText,
        category: this.state.category,
        title:this.state.title
      }

      this.props.createNews(createNews, this.props.history);
    }

  render() {

    const { classes } = this.props;
    const { errors } = this.state;

    return (
      <div>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <i className="material-icons">
                how_to_reg
              </i>
            </Avatar>
            <Typography component="h1" variant="h5">
              Create news
            </Typography>

            <form className={classes.form}>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="title">Title</InputLabel>
                <Input id="title" name="title" autoComplete="title" autoFocus value={this.state.title} onChange={this.onChangeTitle.bind(this)}/>
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="image">Image</InputLabel>
                <Input id="image" name="image" autoComplete="image"  value={this.state.img} onChange={this.onChangeImg.bind(this)}/>
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="description">Description</InputLabel>
                <Input id="description" name="description" autoComplete="description"  value={this.state.desc} onChange={this.onChangeDesc.bind(this)}/>
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="text">Text</InputLabel>
                <Input id="text" name="text" autoComplete="text"  value={this.state.allText} onChange={this.onChangeText.bind(this)}/>
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="category">Category</InputLabel>
                <Input id="category" name="category" autoComplete="category"  value={this.state.category} onChange={this.onChangeCategory.bind(this)}/>
              </FormControl>

              

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.onSubmit.bind(this)}
              >
                add news
              </Button>
            </form>
          </Paper>
      </div>
    )
  }
}

AddNewNews.propTypes = {
    classes: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    createNews: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps, {createNews })(withRouter(withStyles(styles)(AddNewNews)));