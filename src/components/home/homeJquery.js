/**********JQUERY FOR THE HOME VIEW***********/
$(document).ready(function() {
  let flag = false;
  var showButton = document.getElementsByClassName('show-solutions-1')
  console.log(showButton);
  $(document).on('click', '.home-solutions-div', function() {
    if (!flag) {
      $(this).find('.repeated-completed-solutions').css('display', 'block');
      flag = true;
    } else {
      $(this).find('.repeated-completed-solutions').css('display', 'none');
      flag = false;
    }
  })
});
