$(document).ready(function(){
  $("#phone").change(function(){
    var val = $(this).val();
    var num = val.match(/\d/g);

    if(num != null){
      num = num.join("");

      if(num.length >= 10 && num.length <= 15){
        $(this).css('color','lime');
        var areaCode = num.substring(num.length-10,num.length - 7);
        var first3 = num.substring(num.length-7,num.length - 4);
        var last4 = num.substring(num.length - 4);
        var allTen = areaCode + first3 + last4;

        var forbiddenAreaCodes = [
          '000','111','222','333','444','555','666','777','888','999'
        ];

        var forbiddenPhoneNumbers = [
          '1234567890',
          '0987654321',
          '9876543210',
          '0123456789',
          '0101010101',
          '1010101010'
        ]

        for(var i = 0; i < forbiddenAreaCodes.length; i++){
          if(forbiddenAreaCodes[i] == areaCode){
            $(this).css('color','red');
          }
        }

        for(var j = 0; j < forbiddenPhoneNumbers.length; j++){
          if(forbiddenPhoneNumbers[j] == allTen){
            $(this).css('color','red');
          }
        }
      }else{
        $(this).css('color','red');
      }
    }
  });
});
