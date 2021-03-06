import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

function CategoryItem(props) {
  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

  const CategoryClickHandle = () => {
    let selected = props.type;
    console.log("ClickReached");
    props.addCategoryData(selected);
  };

  const classes = useStyles();
  
  return (
    <div class="card card-body" style={{ width: "250px" }}>
      <Link  to={{pathname: '/categorylanding',data:props}}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.url}
            title="Contemplative Reptile"
            onClick={CategoryClickHandle}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ textAlign: "center" }}
            >
              {props.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </div>
  );
}



const mapDispatchToProps = (dispatch) => {
  return {
    addCategoryData: (selected) => { dispatch({type: 'ADD_Category_DATA', selected: selected} )}
  }
}

export default connect(null, mapDispatchToProps)(CategoryItem);