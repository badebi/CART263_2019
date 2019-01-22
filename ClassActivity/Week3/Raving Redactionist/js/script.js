"use strict";

let $spans;

$(document).ready(function() {
  // let $spans = $('span'); ----> we donot do that, because of the scope; so we declare it up top and give its value here

  $spans = $('span');
  setInterval(update, 500);
  $spans.on('click', function() {
    $(this).removeClass('revealed').addClass('redacted');
  });

})

function update() {
  console.log("Update!");

  $spans.each(updateSpan); // selects all spans, and for each of them calls the function ||| we don't use pranthesis, cus they're events



}

function updateSpan() {
  console.log("Updating Span!");

  if (Math.random() < .05) {
    $(this).removeClass('redacted').addClass('revealed');
  }

}
