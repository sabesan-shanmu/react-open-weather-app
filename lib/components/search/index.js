import React,{useState,Fragment} from 'react';
import {Grid,TextField,Typography} from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab';
import { makeStyles  } from '@material-ui/core/styles';
import debounce from 'lodash/debounce'
import {CitySearchService} from '../../services/API'


const searchCityByName = async(searchText)=>{
    const response = await CitySearchService.get(searchText);
    return response.data;
}

const useStyles = makeStyles({
    root:{
        marginTop:'5px'
    }
})

const Search = (props) => {

    const [options, setOptions] = useState([]);

    const debounceSearchCity = debounce((searchText)=>{
            searchCityByName(searchText)
                .then((list)=>{
                    if(list)
                        setOptions(list);
                }) 
    },200);

    const classes = useStyles();
    return (
        <Grid container  
            direction="row"
            className={classes.root}>
            <Grid item xs={12}  >
                <Autocomplete
                    id="city-autocomplete"
                    options={options}
                    getOptionLabel={(option) => `${option.name},${option.state} ${option.country}`}
                    style={{ width: 300,margin:'auto' }}
                    onChange={(e,newValue)=>{props.onCityChangeHandler(newValue)}}
                    renderInput={params => {
                        return (
                            <Fragment>
                            <TextField
                                {...params}
                                label="Search City"
                                variant="outlined"
                                onChange={(e)=>{
                                    debounceSearchCity(e.target.value);
                                }}
                                onBlur={(e)=>{
                                    setOptions([]);
                                }}
                                fullWidth
                            />
                            <Typography variant="caption">Disclaimer:Search is limited to the following countries:Canada,
                                Switzerland,Japan & Argentina
                            </Typography>
                            </Fragment>
                        );
                    }}
                />
            </Grid>
        </Grid>
    );

}




export default Search