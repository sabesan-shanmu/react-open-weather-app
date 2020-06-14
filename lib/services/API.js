import {get} from './APIClient'

export const CitySearchService = {
    get:(searchText)=> get(`/searchcity/?q=${searchText}`)
}

export const Client = {
    get:(url) => get(url)
}


