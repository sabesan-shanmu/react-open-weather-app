import React,{Fragment,useState,useRef,useEffect,useCallback} from 'react';
import { Grid, makeStyles,Card,CardHeader,CardContent,Avatar } from '@material-ui/core'
import {Client} from '../../services/API'; 
import WeatherCard from './weathercard/index.js'
import VisibilityIcon from '@material-ui/icons/Visibility';
import moment from 'moment'

const getForecastWeather = async(url)=>{
    const result = await Client.get(url);
    return result;
}
const useStyles = makeStyles({
    root: {
        background:'transparent',
        textAlign:'center',
        marginTop:'2px'
    },
    avatar:{
        backgroundColor:'black'
    },
    header: {
        textAlign:'left'   
    },
    content:{
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX:'auto'
    }
});


const mapToForecastWeather = (result)=>{

    return {
        currentTemp: Math.round(result.currentTemp),
        description: result.description,
        feelsLikeTemp: Math.round(result.feelsLikeTemp),
        humidityInPercentage: result.humidityInPercentage,
        maxTemp: Math.round(result.maxTemp),
        minTemp: Math.round(result.minTemp),
        name: result.name,
        pressureInHpa: result.pressureInHpa,
        weatherIcon: `/images/weathericons/${result.weatherIcon}.svg`,
        windDeg: result.windDeg,
        windSpeed: result.windSpeed,
        forecastedTime: moment(new Date(result.forecastedTime)).format("dd MMM DD YYYY h:mm:ss A")
    };
}


const Forecast = ({selectedCity}) => {

    const url = selectedCity.links.cityforecast;
    const [forecastWeather, setForecastWeather] = useState([]);
   
    useEffect(() => {
        getForecastWeather(url).then((result)=>{
            setForecastWeather(result.data.map((w)=>{return mapToForecastWeather(w)}));
        }).catch((result)=>{
            console.log(result.response.data);
        });
    },[]);
    const classes = useStyles();
    return (
        <Card className={classes.root} variant="outlined">
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>
                        <VisibilityIcon/>
                    </Avatar>
                }
                titleTypographyProps={{variant:'h4' }}
                className={classes.header}
                title='5 Day / 3 Hour Forecast'
            />
            <CardContent className={classes.content}>
                {forecastWeather && forecastWeather.map((weather,key)=>
                    <WeatherCard key={key} weather={weather} /> 
                )}         
            </CardContent>   
        </Card>
    );
}

export default Forecast