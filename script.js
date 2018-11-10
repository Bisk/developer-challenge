$(function(){
  $("#e-mail").blur(function(){
    var val = this.value;
    var emailRe = new RegExp('[a-zA-z].*@[a-zA-z]{2,}.[a-zA-z]{2,}');
    if(!emailRe.test(val)){
      $("#emailHelp").text("Invalid E-Mail address");
    }else{
      $("#emailHelp").text("E-Mail Accepted");
    }
    
  });
  $("#phone").blur(function(){
    var val = this.value.replace(/\D/g,'');;
    var phoneRe = new RegExp('((\d)\2{2}\d+|(0?1234567890?|0?9876543210?)|((01)+0?|(10)+1?))');
    if(phoneRe.test(val)||val.length<10||val.length>15){
      $("#phoneHelp").text("Invalid Phone Number");
    }else{
      $("#phoneHelp").text("Phone Number Accepted");
    }
  });
});