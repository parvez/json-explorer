var json_data = {
  "products": [
    {
      "name": "Awesome Book",
      "price": 9.99,
      "description": "An Awesome book which is full of awesome!" 
    },
    {
      "name": "Cool Board Game",
      "price": 34.99,
      "description": "A snazzy and amazing entertainment experience for 2-67 players." 
    },
    {
      "name": "Large Cheese Pizza",
      "price": 24.99,
      "description": "Sometimes you just want cheese pizza.  Pair with \"AWESOME\" brand beer for maximum enjoyment" 
    }
  ]
}
$(document).ready(function () {
  $.each(json_data.products, function(index, product) {
    add_to_product_list(index, product);
  });
  $('a#enter_json_button').click(function() {
    $('#enter_json_form')[0].reset();
    $('#edit_form_container').show();
    $('#f_name').focus();
  });
  $('a#form_enter_json_button').click(function() {
    $('.form_error').hide();
    if (validate_form()) {
      json_data.products.push({
        "name": $('#f_name').val(),
        "price": $('#f_price').val(),
        "description": $('#f_description').val()
      });
      index = json_data.products.length-1;
      add_to_product_list(index, json_data.products[index]);
      close_form();
    } else {
      $('.form_error').show();
    }
  });
  $('a#form_enter_json_cancel').click(function() {
    $('.form_error').hide();
    close_form();
  });
});

function add_to_product_list(index, product) {
  $('<li id=\'' + index +'\'>' + product.name + '</li>').appendTo($('#products_list')).click(function() {
    show_product(this)
  });;
}
function show_product(element) {
  $('ul#products_list > li.active').removeClass('active');
  $(element).addClass('active');
  $('#detail_box').animate({ width: "0", padding: "0" }, "fast", function() {
    $('#product_name').fadeOut("fast")
    $('#product_price').fadeOut("fast")
    $('#product_description').fadeOut("fast")
  });
  $('#detail_box').animate({ width: "300px" }, function() {
    $('#product_name').html(selected_product.name).fadeIn("slow");
    $('#product_price').html("$"+selected_product.price).fadeIn("slow");
    $('#product_description').html(selected_product.description).fadeIn("slow");
  }).animate({ width: "280px", padding: "0 10px" }, "fast")
  selected_product = json_data.products[parseInt($(element).attr('id'))];
}
function close_form() {
  $('#edit_form_container').hide();
}
function validate_form() {
  valid_price       = validate_length($('#f_price').val().length, 1, 10) && /^[0-9]+$/.test($('#f_price').val());
  valid_name        = validate_length($('#f_name').val().length, 1, 25);
  valid_description = validate_length($('#f_description').val().length, 1, 50);
  return (valid_price && valid_name && valid_description);
}

function validate_length(length, min_length, max_length) {
  return (length > min_length && length <= max_length);
}