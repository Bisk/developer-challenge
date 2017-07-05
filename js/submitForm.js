var name = getElementById('name');
var email = getElementById('email');
var phone = getElementById('phone');

if(!name.checkValidity() || !email.checkValidity() || !phone.checkValidity()){
  console.log("Something isn't valid");
}else if(phone.css('color','red')){
  console.log("Phone Number Not Valid");
}else{
  console.log("Success! Your Form Was Submit!");
}
