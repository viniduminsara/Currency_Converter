import {country_list} from './country_list.js';

const droplist = $('form select');
const fromCurrency = $('.drop-list .from select').eq(0);
const toCurrency = $('.drop-list .to select').eq(0);
const formButton = $('form button').eq(0);
const amount = $('form input').eq(0);
const fromRate = $('.rates .from').eq(0);
const toRate = $('.rates .to').eq(0);

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

$(document).ready(function () {
    getExchangeRates();
});

formButton.on('click', (e) => {
    e.preventDefault();
    getExchangeRates();
})

function loadflag(element){
    for(let country in country_list){
        if(country === element.value){
            let imgTag = $(element).parent().find("img")[0];
            imgTag.src = `https://flagcdn.com/12x12/${country_list[country].toLowerCase()}.png`;
        }
    }
}

function getExchangeRates(){
    let amountVal = parseInt(amount.val()) || 1;
    const url = `https://v6.exchangerate-api.com/v6/3759abf04bc8630a81f3a7dd/latest/${fromCurrency.val()}`;

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(result){
            let exRate = result.conversion_rates[toCurrency.val()];
            let totalAmount = (amountVal * exRate).toFixed(2);
            fromRate.text(`${amountVal} ${fromCurrency.val()}`);
            toRate.text(`${totalAmount} ${toCurrency.val()}`);
        },
        error: function(err){
            alert('Something went wrong 😔');
        }
    })
}