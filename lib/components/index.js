import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React,{Fragment,useState, useEffect} from 'react';
import {AppBar,Toolbar,Grid,makeStyles,IconButton} from '@material-ui/core'
import ReactDOM from 'react-dom';
import Search from './search/index.js';
import CurrentWeather from './currentweather/index.js';
import Forecast from './forecast/index.js';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import {ApiKey} from '../services/constants'

import './style.css';
import Maps from './maps/index.js';


const useStyles = makeStyles({
    header:{
        backgroundColor:'#05668d'
    },
    toolbar:{
        minHeight: '35px'
    },
    leftToolbar:{
        width:'50%',
        marginLeft:'5px',
        justifyContent: 'left',
        alignItems: 'center',
        float:'left'
    },
    rightToolbar: {
        textAlign:'right',
        width:'50%',
        color:'black'
    },
    img:{
        height:'20px'
    },
    row_2: {
        marginTop:'2%'
    },
    row_3:{
        overflowX:'auto',
        flexWrap:'nowrap'
    }
});


const loadMaps = ()=>{
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey.MapsApiKey}&libraries=places`;
    script.async = true;
    document.body.appendChild(script);
}



const App = () => {

    const [selectedCity, setSelectedCity] = useState(null);

    const onCityChangeHandler =(value)=>{
        setSelectedCity(value);
    }
    
    useEffect(()=>{
        loadMaps();
    },[])

    const classes = useStyles();
    return (   
        <Fragment>
        <AppBar position="fixed" className={classes.header}>
            <Toolbar className={classes.toolbar} >
                <div className={classes.leftToolbar}>
                    <span>Icons made from </span>
                    <a href="https://www.flaticon.com/authors/freepik">
                        <img src="images/flaticon.svg" className={classes.img}></img>
                    </a>
                </div>
                <div className={classes.rightToolbar}>
                    <IconButton onClick={() => { location.href="https://github.com/sabesan-shanmu" }} >
                        <GitHubIcon />  
                    </IconButton>
                    &#32;
                    <IconButton onClick={() => { location.href="https://linkedin.com/in/sabesan-shanmugabhavananthan-86a18272" }} >
                        <LinkedInIcon />  
                    </IconButton>
                </div> 
            </Toolbar>
        </AppBar> 
        <Toolbar /> 
        <Search onCityChangeHandler={onCityChangeHandler} />
        {selectedCity &&
        <Fragment>
            <Grid container 
                className={classes.row_2}
                direction="row" 
                justify="flex-start"
                alignItems="center">
                <Grid item xs={12} sm={6} >
                    <CurrentWeather selectedCity={selectedCity}  />  
                </Grid>
                <Grid item xs={12} sm={6} >
                    <Maps selectedCity={selectedCity}  /> 
                </Grid>
            </Grid> 
            <Grid container direction="row" className={classes.row_3} >
                <Forecast selectedCity={selectedCity} />  
            </Grid>
        </Fragment>
        }               
        </Fragment> 
    );

}



ReactDOM.render(
    <App/>,
    document.getElementById('root')
)
