$(document).ready(function() {    
    $('.emoji').on('click', function() {
        $("#hid").css("display", "none");
        $("#hid2").css("display", "block");
    });
    $('#show').on('click', function() {
        $("#hid2").css("display", "none");
        $("#hid").css("display", "block");
    });
    $('.contain_ser').on('click', function() {
        $("#hid2").css("display", "none");
        $("#rev").css("display", "block");
    });
    $('#show1').on('click', function() {
        $("#rev").css("display", "none");
        $("#hid").css("display", "block");
    });
    $('#phone').on('click', function() {
        $('#textNumber').css("display", "block");
    })
        $('#phone').mask("(99) 999-99-99");

});
