import React, {Fragment,useState, useRef, useEffect, useCallback } from 'react';
import { Client } from '../../services/API';
import { Card,CardHeader, CardMedia, CardContent, Typography, makeStyles,Avatar,withStyles  } from '@material-ui/core'
import { Grid,Table,TableBody,TableCell,TableContainer,TableHead,TableRow  } from '@material-ui/core'
import TodayIcon from '@material-ui/icons/Today';
import moment from 'moment'
import {Constants} from '../../services/constants'

const getCurrentWeather = async (url) => {
    const result = await Client.get(url);
    return result;
}
const useStyles = makeStyles({
    root: {
        background:'transparent',
        textAlign:'center',
        height: '760px'
    },
    avatar:{
        backgroundColor:'black'
    },
    header: {
        textAlign:'left'   
    },
    mainIcon:{
        height:'200px',
        width:'200px'
    },
    icon:{
        height:'80px',
        width:'80px',
        textAlign:'center'
    },
    thheader:{
        borderStyle:'none',
        textAlign:'center'
    }
});



const maptoDailyWeather = (result)=>{
    return {
        currentTemp: Math.round(result.data.currentTemp),
        description: result.data.description,
        feelsLikeTemp: Math.round(result.data.feelsLikeTemp),
        humidityInPercentage: result.data.humidityInPercentage,
        maxTemp: Math.round(result.data.maxTemp),
        minTemp: Math.round(result.data.minTemp),
        name: result.data.name,
        pressureInHpa: result.data.pressureInHpa,
        sunriseTimestamp: moment(new Date(result.data.sunriseTimestamp)).utcOffset(result.data.timezoneShiftInHours).format("h:mm:ss A"),
        sunsetTimestamp:  moment(new Date(result.data.sunsetTimestamp)).utcOffset(result.data.timezoneShiftInHours).format("h:mm:ss A"),
        weatherIcon: `/images/weathericons/${result.data.weatherIcon}.svg`,
        windDeg: result.data.windDeg,
        windSpeed: result.data.windSpeed,
        currentLocalTime:`Local Time:${moment(new Date().getTime()).utcOffset(result.data.timezoneShiftInHours).format("dd MMM DD YYYY h:mm:ss A")}`
    };
}

const CurrentWeather = ({ selectedCity }) => {

    const url = selectedCity.links.cityweather;
    const [dailyWeather, setDailyWeather] = useState(null);

    useEffect(() => {
        getCurrentWeather(url).then((result) => {

            setDailyWeather(maptoDailyWeather(result));
        }).catch((result) => {
            console.log(result.response.data);
        });
    },[]);
    
    const classes = useStyles();
    return (
        <Fragment>
        {dailyWeather && 
        <Card className={classes.root} variant="outlined">
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>
                        <TodayIcon/>
                    </Avatar>
                }
                titleTypographyProps={{variant:'h4' }}
                className={classes.header}
                title='Current Weather'
                subheader={dailyWeather.currentLocalTime}
            />
            <CardContent>
                <Grid container 
                    direction="row" 
                    justify="space-evenly"
                    alignItems="center">
                    <Grid item xs={6}   > 
                        <img src="/images/sunrise.png" title="Sunrise"/>
                        <Typography variant="h6">{dailyWeather.sunriseTimestamp}</Typography>
                    </Grid>
                    <Grid item xs={6} >
                        <img src="/images/sunset.png" title="Sunset"/>
                        <Typography variant="h6">{dailyWeather.sunsetTimestamp}</Typography>
                    </Grid>
                </Grid> 
            </CardContent>
            <CardMedia 
                className={classes.media} >
                <Typography variant="h4">{dailyWeather.currentTemp}&#730;{Constants.UnitofTemperature}</Typography>
                <img src={dailyWeather.weatherIcon} className={classes.mainIcon} />
                <Typography variant="h6">{dailyWeather.minTemp}&#730;/{dailyWeather.maxTemp}&#730; feels like {dailyWeather.feelsLikeTemp}&#730;{Constants.UnitofTemperature}</Typography>
                <Typography variant="h6">{dailyWeather.description}</Typography>
            </CardMedia>
            <CardContent>
                <Grid container 
                    direction="row" 
                    justify="space-evenly"
                    alignItems="center">
                    <Grid item xs={3}   > 
                       <img className={classes.icon} src="/images/thermometer.svg" title="Atmospheric pressure"/>
                       <Typography variant="h6">{dailyWeather.pressureInHpa}&#32;{Constants.UnitOfPressure}</Typography>
                    </Grid>
                    <Grid item xs={3} >
                        <img className={classes.icon} src="/images/breeze.svg" title="Wind Speed" />
                        <Typography variant="h6">{dailyWeather.windSpeed}&#32;{Constants.UnitOfSpeed}</Typography>
                    </Grid>
                    <Grid item xs={3} >
                        <img className={classes.icon} src="/images/water.svg" title="Humidity"/>
                        <Typography variant="h6">{dailyWeather.humidityInPercentage}%</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        }
        </Fragment>


    );
}

export default CurrentWeather