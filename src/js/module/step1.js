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