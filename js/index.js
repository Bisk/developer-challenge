var app = new Vue({
  el: '#app',
  data: {
    name: '',
    name_error: false,
    email: '',
    email_error: false,
    phone: '',
    invalid_phone: false,
    validation: {
      email: {
        not_empty: false,
        letters: false,
        atmark: false,
        domain: false,
        extension: false,
        domain_length: false,
        extension_length: false
      },
      phone: {
        not_empty: false,
        valid_number: false,
        digit_minimum: false,
        digit_below_max: false,
        non_repeating_digits: false,
        pattern_check_clear: false
      }
    }
  },
  methods: {
    trim: function(string) {
      return string.replace(/^\s+|\s+$/, '');
    },
    verify_email: function(email) {

    },
    verify_phone: function(phone) {
      const prohibited_numbers = [
        '1234567890',
        '0987654321',
        '9876543210',
        '0123456789',
        '0101010101',
        '1010101010'
      ]
      let stripped = phone.replace(/[\(\)\.\-\ ]/g);

      if (phone != '') {
        this.validation.phone.not_empty = true;
      } else {
        this.validation.phone.not_empty = false;
      }
      if (!(isNaN(parseInt(stripped)))) {
        this.validation.phone.valid_number = true;
      } else {
        this.validation.phone.valid_number = false;
      }

      if (stripped.length < 15) {
        this.validation.phone.digit_below_max = true;
      } else {
        this.validation.phone.digit_below_max = false;
      }
      if (stripped.length >= 10) {
        this.validation.phone.digit_minimum = true;
        for (let i = 0, l = prohibited_numbers.length; i < l; i++) {
          if (this.phone.includes(prohibited_numbers[i])) {
            this.validation.phone.pattern_check_clear = false;
            break;
          } else {
            this.validation.phone.pattern_check_clear = true;
          }
        }
      } else {
        this.validation.phone.digit_minimum = false;
        this.validation.phone.pattern_check_clear = false;
      }
      let phone_slice = this.phone.split('', 3);
      if (phone_slice[0] === phone_slice[1] && phone_slice[1] === phone_slice[2]) {
        this.validation.phone.non_repeating_digits = false;
      } else {
        this.validation.phone.non_repeating_digits = true;
      }
    }
  },
  watch: {
    phone: _.debounce(function() {
      let self = this;
      self.invalid_phone = false;
      self.verify_phone(this.phone);
      _.forIn(this.validation.phone, function(v, k) {
        if (v === false) {
          self.invalid_phone = true;
        }
      })
    }, 500)
  }
})
