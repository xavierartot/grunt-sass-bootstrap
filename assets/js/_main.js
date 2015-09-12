
/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can 
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */

(function($) {

// Use this variable to set up the common and page specific functions. If you 
// rename this variable, you will also need to rename the namespace below.
var HomeAway = {
  // All pages
  common: {
    init: function() {
      // JavaScript to be fired on all pages
      //alert(1);
    }
  },
  // Home page
  home: {
    init: function() {
      // JavaScript to be fired on the home page
      // Overwriting defaults
      
      //<img class="img" src="http://placekitten.com/320/480" alt="" data-big="http://placekitten.com/1024/768" />
      $(".img").each(function() {
        if (Modernizr.mq('only screen and (min-width: 1200px)')) {
          $(this).attr("src", $(this).attr("data-big"));
        }
      });

      if (Modernizr.touch){
         // bind to touchstart, touchmove, etc and watch `event.streamId`
      } else {
         // bind to normal click, mousemove, etc
      }

      //<img src="tomato.svg"> fallback for svg
      if (!Modernizr.svg) {
        var imgs = document.getElementsByTagName('img');
        var svgExtension = /.*\.svg$/;
        var l = imgs.length;
        for(var i = 0; i < l; i++) {
          if(imgs[i].src.match(svgExtension)) {
            imgs[i].src = imgs[i].src.slice(0, -3) + 'png';
            console.log(imgs[i].src);
          }
        }
      }
    }
  },
  // About us page, note the change from about-us to about_us.
  about_us: {
    init: function() {
      // JavaScript to be fired on the about us page
    }
  }
};

// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
var UTIL = {
  fire: function(func, funcname, args) {
    var namespace = HomeAway;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
      namespace[func][funcname](args);
    }
  },
  loadEvents: function() {
    UTIL.fire('common');

    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
      UTIL.fire(classnm);
    });
  }
};

$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
