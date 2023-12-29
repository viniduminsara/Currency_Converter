import {country_list} from './country_list.js';

const droplist = $('form select');
const fromCurrency = $('.drop-list .from select')[0];
const toCurrency = $('.drop-list .to select')[0];
const formButton = $('form button')[0];

console.log(droplist);
console.log(fromCurrency);
console.log(toCurrency);
console.log(formButton);

for(let i = 0; i < droplist.length; i++){

    for(let currency_code in country_list){
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "LKR" ? "selected" : "";

        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;

        droplist[i].insertAdjacentHTML('beforeend', optionTag);
    }

    droplist.eq(i).on('change', (e) => {
        loadflag(e.target);
    });
}

function loadflag(element){
    console.log(element.value);
}