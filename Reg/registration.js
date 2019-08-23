$('.content_link').on('click', function () {
    var $elem = $(".content_link");
    $elem.text().trim() === 'Log in' ? $elem.text('Join') : $elem.text('Log in'); 
    var $elem = $(".content_text");
    $elem.text().trim() === 'Already have an account?' ? $elem.text('Don\'t have an account?') : $elem.text('Already have an account?'); 
    var $elem = $(".logo_name");
    $elem.text().trim() === 'Join Revizor' ? $elem.text('Log in to Revizor') : $elem.text('Join Revizor'); 
    $('.rev').toggle();

});
function myFunction() {
    var x = document.getElementById("myInput");
    var y = document.getElementById("hide1");
    var z = document.getElementById("hide2");

    if(x.type === 'password'){
        x.type = 'text';
        y.style.display = 'block';
        z.style.display = 'none';
    }   else{
        x.type = 'password';
        y.style.display = 'none';
        z.style.display = 'block';
    }
    
}