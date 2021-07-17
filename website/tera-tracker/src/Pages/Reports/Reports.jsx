import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Card, Grid, CardMedia, CardContent, Typography } from '@material-ui/core';

const img = require('./testimage.jpg')

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  textStyle1: {
    color: theme.palette.primary.main,
    fontSize: "2rem", //1rem -> 16px
    textAlign: "left",
  },
  paper_style:{
    width: "40%",
    padding: theme.spacing(5),
    margin: theme.spacing(3),
  },
  paper_style2:{
    width: "88.5%",
    padding: theme.spacing(15),
    margin: theme.spacing(3),
  },
  media: {
    height: "250px",
  },
}));


/*
  This is the component class

*/

const members = [

  {
    name: "Kristian",
    img: "https://scontent.fmnl4-6.fna.fbcdn.net/v/t1.6435-9/60486607_2298806363475276_5422133896072396800_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=GZPGU7KWAdcAX8VM5ZM&_nc_ht=scontent.fmnl4-6.fna&oh=dc7985bda5ff91dbed81b646de9d0aa9&oe=60F6FAED",
    description: `"ang saya po magbasa ng research paper tapos hindi ko rin naman naintindihan yung formula na ginamit nila" - data researcher and analyzer`
  },
  {
    name: "JP",
    img: "https://scontent.fmnl4-2.fna.fbcdn.net/v/t1.6435-1/p320x320/47153712_1918097138287002_7657779092216872960_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=7206a8&_nc_ohc=1AMhEhtu6iMAX-LiTKC&_nc_ht=scontent.fmnl4-2.fna&oh=dcc1464af4c31583096a26ecca17f5c9&oe=60F68232",
    description: `"sheeesh" - UI Designer and Coder`
  },
  {
    name: 'Dane',
    img: "https://scontent.fmnl4-6.fna.fbcdn.net/v/t1.6435-1/p320x320/204102857_4142638599162698_6680627595354653115_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=7206a8&_nc_ohc=O7dVUsH91hoAX_pMO_K&_nc_ht=scontent.fmnl4-6.fna&oh=26c346d45631c402d98e4a01d0b1443f&oe=60F6B537",
    description: `"Pasensya na ha, Godbless" - UI Designer and Coder`
  },
  {
    name: "Paul",
    img: "https://scontent.fmnl4-5.fna.fbcdn.net/v/t1.6435-9/30688952_1844285865622644_6883410696499888128_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=M-EiQOg_quUAX98Lpns&_nc_ht=scontent.fmnl4-5.fna&oh=bb4c2f7f4ad849fb7014df6743e37cf9&oe=60F76FC1",
    description: `"Thank you for letting me be a part of this valuable... joke lang. Awit. Awts gege." - Backend server coder`
  },
  {
    name: "Leo",
    img: "https://scontent.fmnl4-5.fna.fbcdn.net/v/t1.6435-9/169092385_3040872312704286_8677581998299229930_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=730e14&_nc_ohc=EHd6AUIaBh0AX_dXkfz&_nc_ht=scontent.fmnl4-5.fna&oh=2ed96bca02cddc4ddc5ad3f5e8077125&oe=60F74E02",
    description: `"tatlong oras po namin sinuyo yung flask server kasi akala namin mag mamachine learning kami hahaha" - coder`
  },


]

function P_REPORTS() {

  const classes = useStyles();

  return (
    <Container maxWidth="xl" >
      <p className={classes.textStyle1} >Developers</p>
      <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {
            members.map((e) => (
              <Card className={classes.paper_style}>
                <CardMedia
                  className={classes.media}
                  image={`${e.img}`}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h4" component="h2">
                    {e.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {e.description}
                  </Typography>
                </CardContent>
              </Card>    
            ))
          }
            

      </Grid>
      
    </Container>
  );
  
}

export default P_REPORTS;
