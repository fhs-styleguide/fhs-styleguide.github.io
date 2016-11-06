$(document).ready(function () {

  var treemenu = $('.treeMenu li');
  var counter = 0;

  // By default the child ul of 'contentContainer' will be set to 'display:none'
  // treemenu.children('ul').hide();

  treemenu.click(function (element) {

    // Don't fold when clicking on list-element but add class active (for coloring)
    if ($(element.target).is('a')) {
      $(this).children('a').addClass('active');
      if ($(this).siblings('li').children('a').hasClass('active')) {
        $(this).siblings('li').children('a').removeClass('active');
      }
      return;
    }

    // Open closed-list when clicking on parent-element
    if ($(this).hasClass('content-container')) {
      // If other list is open - close it
      if ($(this).siblings('li').hasClass('content-viewing')) {
        $(this).siblings('li').children('ul').hide("slow");
        $(this).siblings('li').removeClass('content-viewing').addClass('content-container');
        $(this).siblings('li').children('p').children('span').removeClass('nav-icon--close').addClass('nav-icon--open');
        // Remove class active from all links
        $(this).siblings('li').children('ul').children('li').children('a').removeClass('active');
      }

      $(this).children('ul').toggle("slow");
      $(this).removeClass('content-container').addClass('content-viewing');
      $(this).children('p').children('span').removeClass('nav-icon--open').addClass('nav-icon--close');
      return;
    }
    // Close opened-list when clicking on parent-element
    if ($(this).hasClass('content-viewing')) {
      $(this).children('ul').toggle("slow");
      $(this).removeClass('content-viewing').addClass('content-container');
      $(this).children('p').children('span').removeClass('nav-icon--close').addClass('nav-icon--open');
      $(this).children('ul').children('li').children('a').removeClass('active');
      return;
    }
  });
});

