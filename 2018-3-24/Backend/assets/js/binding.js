/*
fileName:
description: process binding credit card
*/

$(document).ready(function () {

});

$('input[name="radio_caro_type"]').click(function () {
    switch($(this).val()){
        case "1":  // 提现成功
            $('#option_status').val('1');
            break;
        case "2":  // 提现失败
            $('#option_status').val('2');
            break;
    }
});

function  OnShowMessage() {
    var type = $('#option_status').val();

    switch (type){
        case '1':
            $('#alert_message').html('是否确认打款成功？');
            break;
        case '2':
            $('#alert_message').html('是否确认打款失败？');
            break;
    }

    $('#confirm_delete').show();
}
function onConfirm() {
    $('form').submit();
}