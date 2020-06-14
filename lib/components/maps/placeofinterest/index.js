
import React,{useState,useRef,useEffect,useCallback} from 'react';
import { Grid} from '@material-ui/core'
import { Card,CardHeader, CardContent, Typography, makeStyles,Button  } from '@material-ui/core'




const useStyles = makeStyles({
    root:{
        flex:'0 0 auto',
        backgroundColor:'transparent',
    },
    icon:{
        height:'20px',
        width:'20px'
    },
    header:{
        textAlign:'left'
    },
    rating:{
        justifyContent: 'left',
        float:'left'
    }
})





const PlaceOfInterest = ({place,showLocation}) =>{

    const classes = useStyles();


    return (
        <Card className={classes.root} >
            <CardHeader
                avatar={
                    <img src={place.icon} className={classes.icon}></img>
                }
                titleTypographyProps={{variant:'h6' }}
                className={classes.header}
                title={place.name}
            />
            <CardContent>
                {place.vicinity}
                <Typography variant="body1">Rating:{place.rating}</Typography>
                <Button variant="outlined" onClick={()=>showLocation(place)} >Locate</Button>
             </CardContent>
            
        </Card>

    );

};


export default PlaceOfInterest;