function checkForm(form) {
  if (form.name.value == "") {
    alert("enter your name please")
    form.name.focus()
    return false
  }

  if(form.email.value == "") {
    alert("enter your email please")
    form.email.focus()
    return false
  }

  if(form.phone.value == "") {
    alert("enter your phone number please")
    form.phone.focus()
    return false
  }

  if(!form.email.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
    alert("enter a valid email please")
    form.email.focus()
    return false
  }

  let badNumber = ['1234567890', '0987654321', '9876543210', '0123456789', '0101010101', '1010101010'];

  let number = cleanNumber(form.phone.value)

  if(badNumber.includes(number) || number.match(/^(0{3,}|1{3,}|2{3,}|3{3,}|4{3,}|5{3,}|6{3,}|7{3,}|8{3,}|9{3,})/)|| number.length < 10 || number.length > 15) {
    alert("enter a valid phone number please")
    form.phone.focus()
    return false
  }
  return true
}

document.querySelector('.contactForm').addEventListener('submit', (event) => {
  
  if (!checkForm(event.target)) {
    event.preventDefault()
  }
})


// cleanNumber()
function cleanNumber(number) {
  return number.replace(/[^0-9]/g, "")
}
