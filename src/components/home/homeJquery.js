/**********JQUERY FOR THE HOME VIEW***********/
$(document).ready(function() {
  let flag = false;
  var showButton = document.getElementsByClassName('show-solutions-1');
  $(document).on('click', '.home-solutions-div', function() {
    if (!flag) {
      $(this).find('.home-repeated-solutions-div').css('height', '100px');
      $(this).find('.CodeMirror').css('display', 'block');
      flag = true;
    } else {
      $(this).find('.CodeMirror').css('display', 'none');
      $(this).find('.home-repeated-solutions-div').css('height', '0px');
      flag = false;
    }
  })
});
