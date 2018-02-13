var app = new Vue({
  el: '#app',
  data: {
    name: '',
    invalid_name: null,
    email: '',
    invalid_email: null,
    phone: '',
    invalid_phone: null,
    validation: {
      name: {
        not_empty: {
          valid: false,
          message: 'Name cannot be empty'
        }
      },
      email: {
        not_empty: {
          valid: false,
          message: 'Cannot be empty'
        },
        passed: {
          valid: false,
          message: 'Email address is not valid'
        },
        no_beginning_digit: {
          valid: false,
          message: 'Email cannot begin with number'
        }
      },
      phone: {
        not_empty: {
          valid: false,
          message: 'Cannot be empty'
        },
        valid_number: {
          valid: false,
          message: 'Must be a valid number'
        },
        digit_minimum: {
          valid: false,
          message: 'Must have at least 10 digits'
        },
        digit_below_max: {
          valid: false,
          message: 'Cannot have more than 15 digits'
        },
        non_repeating_digits: {
          valid: false,
          message: 'Cannot begin with three repeating digits'
        },
        pattern_check_clear: {
          valid: false,
          message: 'Cannot contain prohibited pattern'
        },
      }
    }
  },
  methods: {
    trim: function(string) {
      return string.replace(/^\s+|\s+$/, '');
    },
    verify_name: function(name) {
      if (name != '') {
        this.validation.name.not_empty = true;
      } else {
        this.validation.name.not_empty = false;
      }
    },
    verify_email: function(email) {
      let trimmed = this.trim(email).toUpperCase();

      if (email != '') {
        this.validation.email.not_empty = true;
      } else {
        this.validation.email.not_empty = false;
      }

      if (/^\d/.test(trimmed)) {
        this.validation.email.no_beginning_digit = false;
      } else {
        this.validation.email.no_beginning_digit = true;
        if (/^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[A-Z]{2,}\.)+[A-Z]{2,}$/.test(trimmed)) {
          this.validation.email.passed = true;
        } else {
          this.validation.email.passed = false;
        }
      }

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
  computed: {
    invalid_form: function() {
      if (this.invalid_name == true || this.invalid_email == true || this.invalid_phone == true) {
        return true;
      } else if (this.invalid_name == null || this.invalid_email == null || this.invalid_phone == null){
        return true;
      }
    }
  },
  watch: {
    name: _.debounce(function() {
      this.edited = true;
      let self = this;
      self.invalid_name = false;
      self.verify_name(this.name);
      _.forIn(this.validation.name, function(v, k) {
        if (v === false) {
          self.invalid_name = true;
        }
      })
    }, 500),
    email: _.debounce(function() {
      this.edited = true;
      let self = this;
      self.invalid_email = false;
      self.verify_email(this.email);
      _.forIn(this.validation.email, function(v, k) {
        if (v === false) {
          self.invalid_email = true;
        }
      })
    }, 500),
    phone: _.debounce(function() {
      this.edited = true;
      let self = this;
      self.invalid_phone = false;
      self.verify_phone(this.phone);
      _.forIn(this.validation.phone, function(v, k) {
        if (v === false) {
          self.invalid_phone = true;
          return;
        }
      })
    }, 500)
  }
})
