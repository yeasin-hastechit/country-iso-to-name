import '../css/style.css'
import equals from '../images/equals.svg';

import Country from 'country-list-js';

const App = document.getElementById('app');


App.innerHTML = `
  <div class="container max-w-screen-xl mx-auto py-24">
    <div class="flex flex-wrap gap-6">
      <div class="flex-1">
        <h2 class="text-2xl mb-3">Input</h2>
        <textarea id="input_field" class=" border border-gray-300 resize-none w-full h-80 px-5 py-4" placeholder="Type your Country ISO code here."></textarea>
        <p class="text-gray-500">Please use <b>iso2</b> or <b>iso3</b> country code. You can also use both <b>iso2</b> and <b>iso3</b> code. Each country code need to be in a new line.</p>
      </div>
      <div class="w-10 flex justify-center items-center"><img src="${equals}" class=" w-5" /></div>
      <div class="flex-1">
        <h2 class="text-2xl mb-3">Output</h2>
        <textarea id="output_field" class=" border border-gray-300 resize-none w-full h-80 px-5 py-4" placeholder="Country name output."></textarea>
        <p id="error_field" class="text-red-500"></p>
      </div>
    </div>
  </div>
`

const inputField = App.querySelector('#input_field');
const outputField = App.querySelector('#output_field');
const errorField = App.querySelector('#error_field');

inputField.addEventListener('input', function() {
  let invalidCodes = [];
  if(this.value === '') {
    return outputField.value = '';
  }
  const countryNames = this.value.trim().split('\n').map(item => {
    const code = item.trim()
    let country
    if(code.length === 3) {
      country = Country.findByIso3(code.toUpperCase())
    }
    if(code.length === 2) {
      country = Country.findByIso2(code.toUpperCase())
    }
    if(country === undefined && code !== '') {
      invalidCodes.push(code);
      // return `${code} is not a valid iso2 or iso3 country code`;
    }
    if (country !== undefined && code !== '') {
      return country.name
    }
    return false;
  })
  const uniqueCountry = [...new Set(countryNames)].filter(name => name !== false).map(name => {
    const count = countryNames.filter(country => country === name).length
    if(count > 1) {
      return `${name} (${count})`
    }
    return name
  }).join('\n');
  outputField.value = uniqueCountry;
  if(invalidCodes.length > 0) {
    errorField.innerHTML = `${invalidCodes.join(', ')}  is not valid iso2 or iso3 country code`;
  } else {
    errorField.innerHTML = '';
  }
})
