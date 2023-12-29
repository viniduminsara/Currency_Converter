import {country_list} from './country_list.js';

const fromInput = $('#fromInput').eq(0);
const toInput = $('#toInput').eq(0);
const fromSuggestionList = $('#fromsuggestList').eq(0);
const toSuggestionList = $('#toSuggestList').eq(0);
const formButton = $('form button').eq(0);
const amount = $('form input').eq(0);
const fromRate = $('.rates .from').eq(0);
const toRate = $('.rates .to').eq(0);

const suggestions = Object.keys(country_list);
fromInput.val('USD');
toInput.val('LKR');

$(document).ready(function () {
    // getExchangeRates();
});

fromInput.on('input', () => {
    const inputValue = fromInput.val().toUpperCase().trim();
    const filteredSuggestions = suggestions.filter(suggestion => suggestion.toUpperCase().includes(inputValue));

    if(inputValue){
        displaySuggestions(filteredSuggestions, fromSuggestionList);
    }else{
        hideSuggestions(fromSuggestionList);
    }
});

toInput.on('input', () => {
    const inputValue = toInput.val().toUpperCase().trim();
    const filteredSuggestions = suggestions.filter(suggestion => suggestion.toUpperCase().includes(inputValue));

    if(inputValue){
        displaySuggestions(filteredSuggestions, toSuggestionList)
    }else{
        hideSuggestions(toSuggestionList)
    }
});

//suggestion click
fromSuggestionList.on('click', 'li', function(){
    const selectedValue = $(this).text();
    fromInput.val(selectedValue);
    hideSuggestions(fromSuggestionList);
    loadflag(selectedValue, fromInput)
});

toSuggestionList.on('click', 'li', function(){
    const selectedValue = $(this).text();
    toInput.val(selectedValue);
    hideSuggestions(toSuggestionList);
    loadflag(selectedValue, toInput)
});

formButton.on('click', (e) => {
    e.preventDefault();
    // getExchangeRates();
});

// Function to display suggestions
function displaySuggestions(suggestionsArray, list) {
    list.empty();
    suggestionsArray.forEach(suggestion => {
        list.append(`<li><img src="https://flagcdn.com/48x36/${country_list[suggestion].toLowerCase()}.png">${suggestion}</li>`);
    });
    list.show();
}

// Function to hide suggestions
function hideSuggestions(list){
    list.hide();
}

function loadflag(name, element){
    for(let country in country_list){
        if(country === name){
            let imgTag = element.parent().find("img")[0];
            imgTag.src = `https://flagcdn.com/48x36/${country_list[country].toLowerCase()}.png`;
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