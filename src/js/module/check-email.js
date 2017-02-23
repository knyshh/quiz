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