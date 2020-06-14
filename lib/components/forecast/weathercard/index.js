import React,{useState,useRef,useEffect,useCallback} from 'react';
import { Grid} from '@material-ui/core'
import { Card,CardHeader, CardMedia, CardContent, Typography, makeStyles,Avatar,withStyles  } from '@material-ui/core'
import {Constants} from '../../../services/constants'

const useStyles = makeStyles({
    root:{
        flex:'0 0 auto',
        backgroundColor:'transparent',
        width:'400px'
    },
    mainIcon:{
        height:'100px',
        width:'100px'
    },
    icon:{
        height:'50px',
        width:'50px',
        textAlign:'center'
    }
})

const WeatherCard = ({weather}) =>{

   const classes = useStyles();
    
    return (
        <Card className={classes.root} >
            <CardHeader
                titleTypographyProps={{variant:'h6' }}
                title={weather.forecastedTime}
            />
            <CardMedia 
                className={classes.media} >
                <Typography variant="h4">{weather.currentTemp}&#730;{Constants.UnitofTemperature}</Typography>
                <img src={weather.weatherIcon} className={classes.mainIcon} />
                <Typography variant="h6">{weather.minTemp}&#730;/{weather.maxTemp}&#730; feels like {weather.feelsLikeTemp}&#730;{Constants.UnitofTemperature}</Typography>
                <Typography variant="h6">{weather.description}</Typography>
            </CardMedia>
            <CardContent>
                <Grid container 
                    direction="row" 
                    justify="space-evenly"
                    alignItems="center">
                    <Grid item xs={3}   > 
                       <img className={classes.icon} src="/images/thermometer.svg" title="Atmospheric pressure"/>
                       <Typography variant="h6">{weather.pressureInHpa}&#32;{Constants.UnitOfPressure}</Typography>
                    </Grid>
                    <Grid item xs={3} >
                        <img className={classes.icon} src="/images/breeze.svg" title="Wind Speed" />
                        <Typography variant="h6">{weather.windSpeed}&#32;{Constants.UnitOfSpeed}</Typography>
                    </Grid>
                    <Grid item xs={3} >
                        <img className={classes.icon} src="/images/water.svg" title="Humidity"/>
                        <Typography variant="h6">{weather.humidityInPercentage}%</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    ); 
}

export default WeatherCard