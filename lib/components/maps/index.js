import React,{useRef,useEffect, useState} from 'react';
import { Card,CardHeader,CardContent,makeStyles,Avatar,Button } from '@material-ui/core'
import LocationOnSharpIcon from '@material-ui/icons/LocationOnSharp';
import PlacesOfInterest from './placeofinterest/index.js'


const useStyles = makeStyles({
    root: {
        background:'transparent',
        textAlign:'left',
        height: '760px',
        paddingBottom:'0',
    },
    avatar:{
        backgroundColor:'black'
    },
    map:{
        height:'340px',
        width:'100%'
    },
    attraction:{
        paddingBottom: '0',
        paddingTop:'0'
    },
    content:{
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX:'auto'
    },
    subheading:{
        display:'flex'
    },
    reset:{
        height:'36px'
    }
});


const mapPlacesOfInterest = (places) =>{
    return places.map((place)=>{
        return {
            name:place.name,
            icon:place.icon,
            placeId:place.place_id,
            rating:place.rating,
            vicinity:place.vicinity,
            geometry:place.geometry
        };
    });
}

var map, currentMarker;
const Maps = ({selectedCity}) =>{

    const googleMapsRef = useRef(null);
    const [placesOfInterest,setPlacesOfInterest] = useState([])
    const location = `${selectedCity.name},${selectedCity.country}`
    const subheader = `Near ${location}`;
    const coordinates ={
        lat: parseFloat(selectedCity.latitude),
        lng: parseFloat(selectedCity.longitude),
    }
  
    useEffect(()=>{
       
        map = new google.maps.Map(googleMapsRef.current, {
            center: coordinates,
            zoom: 11
          }); 
        //putting marker on the map
        currentMarker = new google.maps.Marker({position: coordinates, map: map});
        var service = new google.maps.places.PlacesService(map);
        var request = {
            location:coordinates,
            radius:'5000',
            type: ['tourist_attraction']    
        };
        service.nearbySearch(request,(results,status)=>{
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                setPlacesOfInterest(mapPlacesOfInterest(results));           
            }
            else{
                console.log(status);
            }
        });
    },[])


    const showLocation = (place=null) =>{
        currentMarker.setMap(null);
        const zoomLevel = place?13:11;
        currentMarker = new google.maps.Marker({
            map: map,
            position: place?place.geometry.location:coordinates
        });
        map.panTo(currentMarker.getPosition());
        map.setZoom(zoomLevel);  
    }
    
    const classes = useStyles();
    return(
        <Card className={classes.root} variant="outlined" >
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>
                        <LocationOnSharpIcon/>
                    </Avatar>
                }
                titleTypographyProps={{variant:'h4' }}
                title={location}
            />
            <CardContent>
                <div id="google-maps" 
                    className={classes.map}
                    ref={googleMapsRef}  />
            </CardContent>
            <div className={classes.subheading}>
                <CardHeader
                    className={classes.attraction}
                    titleTypographyProps={{variant:'h6' }}
                    title='Tourist Attractions'
                    subheader={subheader}
                />
                <Button variant="outlined" onClick={()=>showLocation()} className={classes.reset} >Reset Map</Button>
            </div>
            <CardContent className={classes.content}>
                {placesOfInterest.map((place,key)=>
                    <PlacesOfInterest key={key} place={place} showLocation={showLocation} /> 
                )}         
            </CardContent>   
        </Card>
    );

}



export default Maps