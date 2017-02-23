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