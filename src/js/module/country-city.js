function changeCountry(cities){
    $('#country').on("change", function(){
        var val = $("#country option:selected").val();
        var text = $("#country option:selected").html();

        $( "#city option").remove();
        $('#city').append($("<option disabled selected hidden></option>").html("Город"));

        for (var key in cities) {
            if (cities[key].country == val ) {
                $('#city').append($("<option></option>").val(key).html(cities[key].name));
            }
        }
    });
}

function getCities() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', './json/cities.json');
    xhr.onload = function(evt) {
        var src = evt.srcElement || evt.target;
        var cities = JSON.parse(src.response);
        showCities(cities);
        changeCountry(cities)
    }
    xhr.send();
}

function getCountries() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', './json/countries.json');
    xhr.onload = function(evt) {
        var src = evt.srcElement || evt.target;
        var countries = JSON.parse(src.response);
        showCountries(countries);
    }
    xhr.send();
}
function showCountries(countries) {
    for (var name in countries) {
        $('#country').append($("<option></option>").val(name).html(countries[name]));
    }
}

function showCities(cities) {
    for (var key in cities) {
        $('#city').append($("<option></option>").val(key).html(cities[key].name));
    }
}

module.exports = {
    getCountries: getCountries,
    getCities: getCities
}