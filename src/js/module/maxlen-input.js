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