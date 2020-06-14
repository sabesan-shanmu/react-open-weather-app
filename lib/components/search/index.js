import React,{useState,useRef,useEffect,useCallback} from 'react';
import {Grid,TextField} from '@material-ui/core'
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
                    style={{ width: 230,margin:'auto' }}
                    onChange={(e,newValue)=>{props.onCityChangeHandler(newValue)}}
                    renderInput={params => {
                        return (
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
                        );
                    }}
                />
            </Grid>
        </Grid>
    );

}




export default Search