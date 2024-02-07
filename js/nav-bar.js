jQuery(document).ready(function() {
  var nav = jQuery('#navBar');
  var header = jQuery('header');
  if (header.hasClass('main')) {
    var navInner = jQuery('#navBarInner');
    var logo = jQuery('#blLogo');
    var logoTitle = jQuery('#logoTitle');
    var lady = jQuery('#lady');
    var imgCover = jQuery('.img-cover');
    var scrollArrow = jQuery('#scrollArrow');  
    var wind = jQuery(window);
    var reloadCover = jQuery('#reloadCover');
  
    var navOffsetTop = nav[0].offsetTop;
    var windWidth = wind.width();
    var windHeight = wind.height();
  
    var logoOffsetTop = logo.offset().top;
    var ladyOffsetTop = lady.offset().top;
  
    var logoWidth = logo.width();
    var logoHeight = logo.height();
    var ladyHeight = lady.height();
    var scrolledLogoHeight = 70;
    var scrolledLadyHeight = 50;
    
    var navInnerMargin = (wind.width() - navInner.width())/2 - 25;
  
    var logoCoeff = scrolledLogoHeight / logoHeight;
    var ladyCoeff = scrolledLadyHeight / ladyHeight;
  
    var diffScrolledToMormal = (logoWidth - (logoWidth * logoCoeff)) / 2;

    var animationTime = 1500;
    var scrollTo = 0;

    //*** media dimension */
    var scrolledNavMargin = [
      100, // width higher than 1400px
      60, // width from 1200 to 1399px
      15 // width from 992 to 1199px 
    ];

    var scrolledLogoMargin = [
      200, // width higher than 1400px
      170, // width from 1200 to 1399px
      130 // width from 992 to 1199px 
    ];

    var mobileNavBarHeight = [
      70, // width higher than 768px
      50 // width lower than 768px
    ];
    
    //*** For device less then 992px */
    var logoRow = jQuery('#logoRow');
    var mobHeader = jQuery('.mob-header');
    var arrowDown = jQuery('.arrow-down');

    var logoRowHeight = logoRow.height();

    var logoRowCoeff = defineNavBarHeight() / logoRowHeight;
    //*** End */
    if (wind.scrollTop() > logoOffsetTop && wind.scrollTop() < windHeight) {
      jQuery('html, body').animate({
        scrollTop: windHeight - defineNavBarHeight()
      }, animationTime);
    } else if (wind.scrollTop() > windHeight) {
      jQuery('html, body').animate({
        scrollTop: wind.scrollTop() - 1
      }, animationTime);
    }
  
    wind.on('scroll touchmove mousewheel', function(e) {
      if (e.type == 'mousewheel' || e.type == 'touchmove') {
        if (wind.scrollTop() <= (windHeight - defineNavBarHeight())) {
          //e.preventDefault();
          if (!logo.hasClass('scrolling')) {
            if (logo.hasClass('scrolled-down')) {
              if (e.deltaY == 1) {
                logo.addClass('scrolling');
                logo.removeClass('scrolled-down');
                scrollTo = 0;
                jQuery('html, body').animate({
                  scrollTop: scrollTo
                }, animationTime);
                setTimeout(function() {
                  logo.removeClass('scrolling');
                }, animationTime + 100);
              }
            } else {
              if (e.deltaY == -1) {
                logo.addClass('scrolling');
                logo.addClass('scrolled-down');
                e.preventDefault();
                scrollTo = windHeight - defineNavBarHeight();
                jQuery('html, body').animate({
                  scrollTop: scrollTo + 1
                }, animationTime);
                setTimeout(function() {
                  logo.removeClass('scrolling');
                }, animationTime + 100);
              }
            }
          }
        }
      } else {
        if (windWidth >= 992) {
          if (wind.scrollTop() >= logoOffsetTop && wind.scrollTop() < navOffsetTop) {
            logo.addClass('scrolled');
            lady.addClass('scrolled');
      
            logo.css({
              transform: 'scale(' + (1 - ((wind.scrollTop() - logoOffsetTop) * ((1 - logoCoeff) / (navOffsetTop - logoOffsetTop)))) + ')',
              top: '-' + (((logoHeight - scrolledLogoHeight - 10) / 2) / (navOffsetTop - logoOffsetTop) * (wind.scrollTop() - logoOffsetTop)) + 'px',
              left: fromLeftToLogo() - (fromLeftToLogo() - ((defineScrolledMargin(scrolledLogoMargin) / windWidth) - (diffScrolledToMormal / windWidth)) * 100) / (navOffsetTop - logoOffsetTop) * (wind.scrollTop() - logoOffsetTop)  + '%'
            });
            logoTitle.css({
              opacity: 1 - (1 / (navOffsetTop - logoOffsetTop) * (wind.scrollTop() - logoOffsetTop))
            });
            lady.css({
              transform: 'scale(' + (1 - ((wind.scrollTop() - logoOffsetTop) * ((1 - ladyCoeff) / (navOffsetTop - logoOffsetTop)))) + ')',
              top: '-' + (((ladyHeight + 70 - scrolledLadyHeight) / 2) / (navOffsetTop - logoOffsetTop) * (wind.scrollTop() - logoOffsetTop)) + 'px',
              left: '-' + (10 / (navOffsetTop - logoOffsetTop)) * (wind.scrollTop() - logoOffsetTop) + 'px'
            });
            navInner.css({
              marginRight: navInnerMargin - ((navInnerMargin - (defineScrolledMargin(scrolledNavMargin) - 15)) / (navOffsetTop - logoOffsetTop - 15) * (wind.scrollTop() - logoOffsetTop - 15  )) + 'px'
            });
            imgCover.css({
              backgroundColor: 'rgba(20, 22, 21, ' + (0.5 + (0.5 / (navOffsetTop - logoOffsetTop)) * (wind.scrollTop() - logoOffsetTop)) + ')'
            });
      
          } else if (wind.scrollTop() < logoOffsetTop) {
            logo.removeClass('scrolled-down');
            logo.removeClass('scrolled');
            lady.removeClass('scrolled');
      
            logo.removeAttr('style');
            lady.removeAttr('style');
            navInner.removeAttr('style');
            imgCover.removeAttr('style');
            logoTitle.removeAttr('style');
          } else {
            logo.addClass('scrolled-down');
            logoTitle.removeAttr('style');
            logo.css({
              transform: 'scale(' + logoCoeff + ')',
              top: '-' + ((logoHeight - scrolledLogoHeight - 10) / 2) + 'px',
              left: fromLeftToLogo() - (fromLeftToLogo() - ((defineScrolledMargin(scrolledLogoMargin) / windWidth) - (diffScrolledToMormal / windWidth)) * 100) + '%'
            });
            lady.css({
              transform: 'scale(' + ladyCoeff + ')',
              top: '-' + ((ladyHeight + 70 - scrolledLadyHeight) / 2) + 'px',
              left: '-' + 10 + 'px'
            });
            navInner.css({
              marginRight: defineScrolledMargin(scrolledNavMargin) + 'px'
            });
            imgCover.css({
              backgroundColor: 'rgba(20, 22, 21, ' + 1 + ')'
            });
            logoTitle.css({
              opacity: 0
            });
          }
          
          if (wind.scrollTop() >= navOffsetTop) {
            nav.addClass('scrolled');
            logo.addClass('scrolled');
            lady.addClass('scrolled');
          } else {
            nav.removeClass('scrolled');
          }
        } else {
          if (wind.scrollTop() >= logoOffsetTop && wind.scrollTop() < (windHeight - defineNavBarHeight())) {
            logoRow.addClass('scrolled');

            logoRow.css({
              transform: 'scale(' + (1 - ((wind.scrollTop() - logoOffsetTop) * ((1 - logoRowCoeff) / ((windHeight - defineNavBarHeight()) - logoOffsetTop)))) + ')',
              top: '-' + (((logoRowHeight - defineNavBarHeight()) / 2) / ((windHeight - defineNavBarHeight()) - logoOffsetTop) * (wind.scrollTop() - logoOffsetTop)) + 'px'
            });
            arrowDown.css({
              opacity: 1 - (1 / ((windHeight - defineNavBarHeight()) - logoOffsetTop)) * (wind.scrollTop() - logoOffsetTop)
            });
            imgCover.css({
              backgroundColor: 'rgba(20, 22, 21, ' + (0.5 + (0.5 / ((windHeight - defineNavBarHeight()) - logoOffsetTop)) * (wind.scrollTop() - logoOffsetTop)) + ')'
            });
            if (windWidth >= 575) {
              logoTitle.css({
                opacity: 1 - (1 / ((windHeight - defineNavBarHeight()) - logoOffsetTop)) * (wind.scrollTop() - logoOffsetTop)
              });
            }
          } else if (wind.scrollTop() < logoOffsetTop) {
            logoRow.removeClass('scrolled');

            logoRow.removeAttr('style');
            imgCover.removeAttr('style');
            arrowDown.removeAttr('style');
            if (windWidth >= 575) {
              logoTitle.removeAttr('style');
            }
          } else {
            mobHeader.addClass('scrolled');
            logoRow.addClass('scrolled');
            logoRow.css({
              transform: 'scale(' + logoRowCoeff + ')',
              top: '-' + ((logoRowHeight - defineNavBarHeight()) / 2) + 'px'
            });
            arrowDown.css({
              opacity: 0
            });
            imgCover.css({
              backgroundColor: 'rgba(20, 22, 21, ' + 1 + ')'
            });
            if (windWidth >= 575) {
              logoTitle.css({
                opacity: 0
              });
            }
          }

          if (wind.scrollTop() < (windHeight - defineNavBarHeight())) {
            mobHeader.removeClass('scrolled');
          }
        }
      }
    });
  
    scrollArrow.on('click', scroll);
  
    function fromLeftToLogo() {
      return ((100 - (logo.width() / windWidth) * 100) / 2);
    };

    function defineScrolledMargin(marginArray) {
      var margin = marginArray[0];
      if (windWidth < 1400) {
        margin = marginArray[1];
      }
      if (windWidth < 1200) {
        margin = marginArray[2];
      }
      return margin;
    };

    function defineNavBarHeight() {
      var height = mobileNavBarHeight[0];
      if (windWidth < 768) {
        height = mobileNavBarHeight[1];
      }
      return height;
    };
  
    function scroll() {
      if (!logo.hasClass('scrolled-down')) {
        logo.addClass('scrolled-down');
      }
      jQuery('html, body').animate({
        scrollTop: windHeight - defineNavBarHeight() + 1
      }, 1500);
    };

    wind.resize(function() {
      resetAnimation();

      navOffsetTop = nav[0].offsetTop;
      windWidth = wind.width();
      windHeight = wind.height();
    
      logoOffsetTop = logo.offset().top;
      ladyOffsetTop = lady.offset().top;;
    
      logoWidth = logo.width();
      logoHeight = logo.height();
      ladyHeight = lady.height();

      navInnerMargin = (wind.width() - navInner.width())/2 - 25;
    
      logoCoeff = scrolledLogoHeight / logoHeight;
      ladyCoeff = scrolledLadyHeight / ladyHeight;
    
      diffScrolledToMormal = (logoWidth - (logoWidth * logoCoeff)) / 2;

      // *** For device less then 992px 
  
      logoRowHeight = logoRow.height();
  
      logoRowCoeff = defineNavBarHeight() / logoRowHeight;
      // *** End 
      
      jQuery('html, body').animate({
        scrollTop: wind.scrollTop() - 1
      }, 100);
    });

    function resetAnimation() {
      logo.removeClass('scrolled');
      lady.removeClass('scrolled');
      nav.removeClass('scrolled');
      mobHeader.removeClass('scrolled');
      logoRow.removeClass('scrolled');

      logo.removeAttr('style');
      lady.removeAttr('style');
      navInner.removeAttr('style');
      imgCover.removeAttr('style');
      logoTitle.removeAttr('style');

      logoRow.removeAttr('style');
      imgCover.removeAttr('style');
      arrowDown.removeAttr('style');
    };
  }
});
