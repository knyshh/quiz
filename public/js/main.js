(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var maxlength = require("./module/maxlen-input");
var step1= require("./module/step1.js");
var step2 = require("./module/country-city.js");
var social = require("./module/socialnework.js");
var step4 = require("./module/checkcats.js");
var checkemail = require("./module/check-email.js");
var topnav = require("./module/top-nav.js");

$('.survey__input').maxLength();

$('.js-next').click(function(e) {
    goToNextStep(e);
});

$('.js-prev').click(function() {
    goToPrevStep();
});

$('.js-again').click(function() {
    clearState();
});

$('input[type="email"]').on('change input paste', function() {
    checkemail.checkEmail($(this));
});



/*---- step 2 ---------------------------------------------------------------------------- */
//get city  - county on step2
step2.getCities();
step2.getCountries();

/*---- step 3 --------------------------------------------------------------------------- */
//for step3 handlers
$('.js-social').on("click", social.showTextArea);
$('.js-social').on("click", social.checkEmptyCheckbox);
$('.js-input-social').on('change input',function(){
    social.checkEmptySocial();
});
$('.select').on('change',function(){
    step1.checkEmpty.call($(this));
});

/*---- step 4  ------------------------------------------------------------------------ */
//for step4 handler
step4.switchPet();

/*-------   write data from forms ---------------------------------------------------  */
var name = '';
var mail = '';
var country='';
var city='';
var facebook = '';
var vk = '';
var twitter = '';
var classmate = '';
var img = '';

function writeDataStep1() {
    name = $('#name').val();
    mail = $('#email').val();
};
function writeDataStep2(){
    country = $( "#country option:selected").html();
    city = $( "#city option:selected").html();
};

function writeDataStep3(){
    facebook = $('#fb-input').val();
    vk = $('#vk-input').val();
    twitter = $('#twitter-input').val();
    classmate= $('#classmate-input').val();
};
function writeDataStep4(){
    img = 'pets__item--'+$('.pets__item.active').data('img');
};

/*-------   clear state when restart survey  ----------------------------------------- */

function clearState() {

    $('.js-prev').show();
    $('.js-next').show();
    $('.js-again').hide();
    $('.top-navigation').show();
    showSlide(1);
    $('.js-prev').attr("disabled", true);
    country='';
    city='';
    facebook = '';
    vk = '';
    twitter = '';
    classmate = '';
    name = '';
    mail = '';
    $('.js-input-social').removeClass('show-inline').addClass('hide');

    $('.form').each(function(index) {
        $(this)[0].reset();
    });

    $('.pets__item').removeClass('active');
    $('.pets').removeClass('valid');
    $('.error-step4').hide();
    $('.top-navigation__btn').removeClass('finished');
    $('.js-next').text('Следующий').removeClass('orange-btn');
    topnav.topNavigation();
}

/*------- get result ------------------------------------------------------------ */
function getResult() {
    $('.info__name').html(name);
    $('.info__email').html(mail);
    $('.info__address').html(country + ', ' + city);
    $('.info__socialwrap').html(renderSocialList);
    $('.result-img').addClass(''+img+'');

}
function showResult() {
    $('.js-prev').hide();
    $('.js-next').hide();
    $('.js-again').show();
    $('.top-navigation').hide();
    getResult();
}
function renderSocialList() {
    var socialList = '';

    if (facebook) socialList += "<p class='info__socialurl'><span class='info__socialname'>Facebook: </span>" + facebook+ "</p>";
    if (vk) socialList += "<p class='info__socialurl'><span class='info__socialname'>Vkontakte: </span>" + vk + "</p>";
    if (twitter) socialList += "<p class='info__socialurl'><span class='info__socialname'>Twitter: </span>" + twitter + "</p>";
    if (classmate) socialList += "<p class='info__socialurl'><span class='info__socialname'>Odnoklassniki: </span>" + classmate+ "</p>";

    return socialList;
}


/*-------   navigation  -------------------------------------------------------- */

$('.top-navigation__btn').on('click',function () {
    goToPrevStep();
});

function showSlide(index) {
    $('.survey__item').each(function(i) {
        if(i+1 == index) {
            if(index > 1 ) {
                $('.js-prev').attr("disabled", false);
            }
            else {
                $('.js-prev').attr("disabled", true);
            }
            $(this).removeClass('hide').addClass('active');
        }
        else {
            $(this).removeClass('active').addClass('hide');
        }
    });
};

var stepNumber = 1;
function goToNextStep(e) {
    e.preventDefault();
    checkInputs();

    if (isValid()) {
        var index = ++stepNumber;
        if( stepNumber <= ($('.survey__item').length)) {
            showSlide(index);
            if(stepNumber === ($('.survey__item').length-1)) {
                $('.js-next').text('Завершить').addClass('orange-btn');
            }
        }
        topnav.topNavigation();
        if (stepNumber === $('.survey__item').length) {
            showResult();
            stepNumber=0;
        }
    }
    else {
    }
}

function goToPrevStep() {
    var index = --stepNumber;
    if( stepNumber > 0 && stepNumber <= ($('.survey__item').length) ) {
        $('.js-prev').attr("disabled", false);
        showSlide(index);
    }
    topnav.topNavigation();
}
/*-------   function  checked all steps before go to next step  ----------------------*/

function checkInputs(){

    let question = $('.survey__item.active').data('active-question');
    let inputs = $('.survey__item.active').find('input');
    let select = $('.survey__item.active').find('select');
    let email = $('.survey__item.active').find('input[type="email"]');

    if(question==1) {
        inputs.each(function() {

            if($(this).attr('type') == 'email') {
                checkemail.checkEmail.call($(this), $(this));
            }
            else {
                step1.checkEmpty.call($(this));
            }

            $(this).on('input paste',function(){

                if($(this).attr('type') == 'email') {
                    checkemail.checkEmail.call($(this), $(this));
                }
                else {
                    step1.checkEmpty.call($(this));
                }

            });
        });
    }
    else if (question == 2 ) {
        select.each(function() {
            step1.checkEmpty.call($(this));
        });
    }

    else if (question == 3 ) {
        inputs.each(function() {
            social.checkEmptyCheckbox.call($(this));
        });
    }

    else if (question == 4 ) {
        step4.checkifEmptyStep4();
    }
}

function isValid(){

    let input = $('.survey__item.active .survey__input').length;
    let validInputs = $('.survey__item.active .survey__input.valid').length;

    let check =  $('.survey__item.active .survey__formgroup.active').length;
    let checkValid=  $('.survey__item.active .survey__formgroup.active.valid').length;

    let question = $('.survey__item.active').data('active-question');

    if( (question == 1) || (question == 2)){

        if((input>0) && (validInputs>0) && (input === validInputs)) {
            if (question == 1) {
                writeDataStep1();
            }
            else {
                writeDataStep2();
            }
            return true;
        }
        else  {
            return false;
        }
    }
    if (question == 3) {
        if((check>0) && (checkValid>0) && (check === checkValid)) {
            writeDataStep3();
            return true;
        }
        else {
            social.checkEmptySocial();
            return false;
        }
    }
    if (question == 4) {
        if ($('.pets').hasClass('valid')) {
            writeDataStep4();
            return true;
        }
        else {
            return false;
        }
    }
}







},{"./module/check-email.js":2,"./module/checkcats.js":3,"./module/country-city.js":4,"./module/maxlen-input":5,"./module/socialnework.js":6,"./module/step1.js":7,"./module/top-nav.js":8}],2:[function(require,module,exports){
function isEmail(email) {
    var regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*(\.[a-zA-Z]{2,6})$/
    return regex.test(email);
}

function checkEmail(email) {
    if(email.val().length > 0) {
        if (isEmail(email.val())) {
            $(this).addClass('valid');
            $(this).removeClass('invalid');
            $('.error-email').hide();
        }
        else {
            $(this).addClass('invalid');
            $('.error-email').text('формат: test@test.com').show();
        }
    }
    else  {
        $(this).addClass('invalid');
        $('.error-email').text('Заполните поле email').show();
    }
}


module.exports = {
    isEmail: isEmail,
    checkEmail: checkEmail
}
},{}],3:[function(require,module,exports){
function switchPet() {
    $('.pets__item').on('click', function() {
        $('.pets__item').removeClass('active');
        $('.pets').removeClass('valid');
        if ( ($(this).hasClass("js-dog"))) {
            $(this).addClass("active");
            $('.pets').removeClass('valid');
            $('.error-step4').text('Вы выбрали собачку а нужно котика!').show();
        }
        else if($(this).hasClass("js-cat")) {
            $(this).addClass("active");
            $('.error-step4').hide();
            $('.pets').addClass('valid');
        }
    });
}

//validation for pets
function checkifEmptyStep4() {
    if($('.pet').hasClass('active')){
        $('.error-step4').hide();
    }
    else {
        $('.error-step4').text('Bыберите одного котика').show();
    }
}

module.exports = {
    switchPet: switchPet,
    checkifEmptyStep4: checkifEmptyStep4
}
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
//if set attr maxlength user can't input more  then maxlength
(function ( $ ) {
    $.fn.maxLength = function() {
        return this.each(function()
        {
            var _this = $(this);
            _this.on('keyup paste',function(){
                if (_this.val().length > Number(_this.attr("maxlength"))) {
                    val = _this.val().slice(0, _this.attr("maxlength"));
                    _this.val(val);
                }
                else {
                }
            });
        });
    };
}( jQuery ));
},{}],6:[function(require,module,exports){
//validation

function checkEmptyCheckbox(){
    if($('.checkbox').is(':checked')>0){
        $('.error-step3').hide();
    }
    else {
        $('.error-step3').text('Выберите хотя бы одну соц сеть').show();
    }
}

// hadle for checkboxes and inputs

function showTextArea(){
    let textinput = $(this).closest('.survey__formgroup').find('.js-input-social');
    let check = $(this).find('.checkbox');
    let formgroup =  $(this).closest('.survey__formgroup');
    let error = $(this).closest('.survey__formgroup').find('.error-social');

    if(check.is(':checked') ) {
        textinput.removeClass('hide').addClass('show-inline');
        formgroup.addClass('active');

        if(textinput.val().length > 0){
            formgroup.addClass('valid');
            error.hide();
        }
        else {
            formgroup.removeClass('valid');
        }
    }
    else {
        error.hide();
        textinput.removeClass('show-inline').addClass('hide');
        formgroup.removeClass('active');
        formgroup.removeClass('valid');
    }
}



// check if empty - show error

function checkEmptySocial(){

    $('.js-input-social:visible').each(function() {
        let error = $(this).closest('.survey__formgroup').find('.error-social');

        if($(this).val().length > 0){
            $(this).closest('.survey__formgroup').addClass('valid');
            error.hide();
        }
        else {
            $(this).closest('.survey__formgroup').removeClass('valid');
            error.text('заполните поле').show();
        }
    });
}



module.exports = {
    checkEmptySocial: checkEmptySocial,
    showTextArea: showTextArea,
    checkEmptyCheckbox: checkEmptyCheckbox
}
},{}],7:[function(require,module,exports){
/* ---- validation --------------------------------------------------- */

function setError(input) {

    var text = $(this).attr("data-error");
    $(this).addClass('invalid');

    if ($(this).parent().find('.error.error_show').length) {
        return false;
    }
    else {
        var span = document.createElement("span");
        span.innerText = text;
        span.className = "error error_show";
        $(this).parent().append(span);
    }
}

function clearError(input) {
    $(this).removeClass('invalid');
    $(this).parent().find('.error.error_show').remove();
}

function checkEmpty(){
    if(!$(this).val()){
        setError.call($(this));
        $(this).removeClass('valid');
    }
    else {
        clearError.call($(this));
        $(this).addClass('valid');
    }
}

module.exports = {
    setError: setError,
    clearError:  clearError,
    checkEmpty: checkEmpty
}
},{}],8:[function(require,module,exports){
function topNavigation() {
    var stepActive = $('.survey__item.active').data('active-question');

    if (stepActive < ($('.survey__item').length)){
        $('.top-navigation__btn').removeClass('active');
        $('.top-navigation__btn').eq(stepActive-1).addClass('active');

        $('.top-navigation__btn').removeClass('finished');

        $('.top-navigation__btn').each(function(index){

            if((stepActive-1) >= 1 && (index) < (stepActive-1)) {
                $('.top-navigation__btn').eq((index)).addClass('finished');
            }
            else {
                return false;
            }
        });
    }
}

module.exports = {
    topNavigation: topNavigation
}
},{}]},{},[1])