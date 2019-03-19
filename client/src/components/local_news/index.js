import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getAllNews, likeNews} from '../../actions/profileActions';
import { connect } from 'react-redux';
import isEmpty from '../../validation/isEmpty';
import {Link} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
    card: {
        //maxWidth: 345,
        margin: 25
      },
      media: {
        height: 200,
      },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inline:{
    display: 'inline-flex'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      //width: 200,
    },
  }
});

class  MediaCard extends Component {

    state = {
        search: ""
    }
    
    componentDidMount(){
        this.props.getAllNews();
    }
    likeNews(id){
        this.props.likeNews(id);
    }
    onChangeSearch(elem){
        let value = elem.target.value;
        this.setState({search: value});
        //console.log(this.state.search);
    }

render(){
    const { classes } = this.props;
        return (
            <div className="main-content">
                <p style={{textAlign:"center"}}>Local news</p>

                <div style={{boxShadow:"0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)",padding:"15px 0", margin:"0 25px"}}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            onChange={this.onChangeSearch.bind(this)}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                              }}
                        />
                    </div>
                </div>

            {!isEmpty(this.props.news.news) &&
                <div>
                {
                    this.props.news.news.map((item,index)=>(          
                        <div key={index}>
                            { (!(item.title.indexOf(this.state.search) ===-1) && item.category ==="local") &&
                            <Card className={classes.card}>
                                <div className="row">
                                    <div className="col-md-5">
                                        <CardActionArea>
                                            <CardMedia
                                            className={classes.media}
                                            image="https://upload.wikimedia.org/wikipedia/commons/c/c2/Alexandria_Waterfront_%282347809660%29.jpg"
                                            //image={item.img}
                                            title="Contemplative Reptile"
                                            />
                                        </CardActionArea>
                                    </div>
                                    <div className="col-md-7">
                                        <CardActionArea>
                                            <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {item.title}
                                            </Typography>
                                            <Typography component="p" style={{color:"rgb(171, 171, 171)"}}>
                                                {item.category}
                                            </Typography>
                                            <Typography component="p">
                                                {item.desc}
                                            </Typography>
                                            <Typography component="h5">
                                                {item.author}
                                            </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                        <Button size="small" color="primary" onClick={this.likeNews.bind(this, item._id)}>
                                            { item.likes.length === 0 &&
                                                <i className="material-icons">
                                                    favorite_border
                                                </i>
                                            }
                                            { item.likes.length !== 0 &&
                                                <i className="material-icons">
                                                    favorite
                                                </i>
                                            }
                                            {
                                                item.likes.map((userLikes, key) => {
                                                    if(userLikes._id === this.props.auth.user.id){
                                                        return <i key={key} style={{color:"#f50057"}} className="material-icons">favorite</i>
                                                    }
                                                    return null;
                                                })
                                            }
                                            {item.likes.length}
                                        </Button>
                                        <Button size="small" color="primary">
                                            { item.comments.length === 0 &&
                                                <i className="material-icons">
                                                    chat_bubble_outline
                                                </i>
                                            }
                                            { item.comments.length !== 0 &&
                                                <i className="material-icons">
                                                    forum
                                                </i>
                                            }
                                            {item.comments.length}
                                        </Button>
                                        <Link to={"/single-news/"+item._id}>
                                            <Button size="small" color="primary">
                                                Read more
                                            </Button>
                                        </Link>
                                        </CardActions>
                                        </div>
                                    </div>
                                </Card>
                            }
                        </div>          
                    ))
                }
                </div>
            }
            </div>
        );
    }
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
    getAllNews : PropTypes.func.isRequired,
    likeNews : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired,
    news : PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    news: state.news
});

export default connect(mapStateToProps, { getAllNews ,likeNews })(withStyles(styles)(MediaCard));