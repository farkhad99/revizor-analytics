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


// TIMER


// Using jQuery (but could use pure JS with cross-browser event handlers):
// var idleSeconds = 10;

// $(function(){
//   var idleTimer;
//   function resetTimer(){
//     clearTimeout(idleTimer);
//     idleTimer = setTimeout(whenUserIdle,idleSeconds*1000);
//   }
//   $(document.body).bind('mousemove keydown click',resetTimer); //space separated events list that we want to monitor
//   resetTimer(); // Start the timer when the page loads
// });

// function whenUserIdle(){
//   if(window.top==window) {
//     // You're not in a frame, so you reload the site.
//     window.setTimeout('location.reload()', 10000); //Reloads after 10 seconds
//     }
//     else {
//         //You're inside a frame, so you stop reloading.
//     }
// }

    
