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