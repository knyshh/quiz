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