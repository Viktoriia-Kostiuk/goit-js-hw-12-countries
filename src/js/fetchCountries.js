const BASE_URL = 'https://restcountries.eu/rest/v2/name';
const fetchCountries = country => fetch(BASE_URL+`/${country}`).then(response => response.json());

export default { fetchCountries };