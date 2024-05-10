import axios from 'axios'
const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const getAllCountries = ()=>{
    return axios.get(`${countriesUrl}api/all`)
}
const getCountryInfo = (name)=>{
    return axios.get(`${countriesUrl}api/name/${name}`)
}

export default {
    getAllCountries,
    getCountryInfo
}