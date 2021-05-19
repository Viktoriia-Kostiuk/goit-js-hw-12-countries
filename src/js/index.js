import fetch from './fetchCountries.js'

import debounce from 'lodash.debounce';

import { error} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import countryTemplate from '../templates/country-template.hbs';
import countriesList from '../templates/countries-list.hbs';



const refs = {
    inputEl:document.querySelector('.country'),
    cardContainer:document.querySelector('.js-card-container'),
    listContainer:document.querySelector('.js-list-container')
}
  
let searchCountry='';

refs.inputEl.addEventListener(
    'input',
    debounce(() => {
        makeSearch();
    }, 1000),
);


const makeSearch= ()=> {
    searchCountry = refs.inputEl.value;
    console.log(searchCountry);
    fetch.fetchCountries(searchCountry).then(testNumberOfCountries).catch(onError);
}

function testNumberOfCountries(countries) {
    
    if (countries.length > 10) {
        clearCard();
        error({
            text: 'Too many countries found. Please enter a more specific quary'
        });
    } else if (countries.length === 1) {
        clearCard();
        renderCountryCard(countries[0]);
        console.log(countries)
    } else if (countries.length <= 10 && countries.length > 1) {
        clearCard();
        renderCountriesList(countries);
        console.log(countries)
    } else {
        clearCard();
        error({
            text: 'No result'
        });
        
    }
}


function renderCountryCard(countries) {
    clearCard();
    const countryCard = countryTemplate(countries);
     refs.cardContainer.innerHTML=countryCard;
    console.log('renderCountryCard');
    refs.inputEl.value = '';
 }

function renderCountriesList(countries) {
    clearCard();
    const list = countriesList(countries);
    refs.listContainer.innerHTML = list;
    console.log('renderCountriesList');
    
 }

const onError = (error) => {
    clearCard();
    console.log(error);
}

const clearCard = () => {
    refs.cardContainer.innerHTML = '';
    refs.listContainer.innerHTML = '';
}
