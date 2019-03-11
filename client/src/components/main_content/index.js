import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    //maxWidth: 345,
    margin: 25
  },
  media: {
    height: 200,
  },
};

function MediaCard(props) {
  const { classes } = props;
  return (
      <div className="main-content">
      <Card className={classes.card}>
        <div className="row">
            <div className="col-md-5">
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                    />
                </CardActionArea>
            </div>
            <div className="col-md-7">
                <CardActionArea>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Lizard
                    </Typography>
                    <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                <Button size="small" color="primary">
                        <i class="material-icons">
                            favorite
                        </i>
                    </Button>
                    <Button size="small" color="primary">
                    Learn More
                    </Button>
                </CardActions>
                </div>
            </div>
        </Card>
        <Card className={classes.card}>
        <div className="row">
            <div className="col-md-5">
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image="https://material-ui.com/static/images/cards/paella.jpg"
                    title="Contemplative Reptile"
                    />
                </CardActionArea>
            </div>
            <div className="col-md-7">
                <CardActionArea>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Pizza
                    </Typography>
                    <Typography component="p">
                        across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                <Button size="small" color="primary">
                        <i class="material-icons">
                            favorite
                        </i>
                    </Button>
                    <Button size="small" color="primary">
                    Learn More
                    </Button>
                </CardActions>
                </div>
            </div>
        </Card><Card className={classes.card}>
        <div className="row">
            <div className="col-md-5">
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image="https://raw.githubusercontent.com/it-shark-pro/web-school-lectures/master/docs/images/news.png"
                    title="Contemplative Reptile"
                    />
                </CardActionArea>
            </div>
            <div className="col-md-7">
                <CardActionArea>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Google news project by Serge
                    </Typography>
                    <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                <Button size="small" color="primary">
                        <i class="material-icons">
                            favorite
                        </i>
                    </Button>
                    <Button size="small" color="primary">
                    Learn More
                    </Button>
                </CardActions>
                </div>
            </div>
        </Card><Card className={classes.card}>
        <div className="row">
            <div className="col-md-5">
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                    />
                </CardActionArea>
            </div>
            <div className="col-md-7">
                <CardActionArea>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Lizard
                    </Typography>
                    <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                <Button size="small" color="primary">
                        <i class="material-icons">
                            favorite
                        </i>
                    </Button>
                    <Button size="small" color="primary">
                    Learn More
                    </Button>
                </CardActions>
                </div>
            </div>
        </Card>
      </div>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);