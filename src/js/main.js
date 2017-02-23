
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






