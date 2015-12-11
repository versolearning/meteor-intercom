Meteor.startup(function() {
  // If the app id is set, we should use the new url for the widget otherwise
  // fall back to the old url but apparantly in-app messaging will no longer
  // work
  var widgetUrl;
  var minimumUserInfo = IntercomSettings.minimumUserInfo();
  var appId = minimumUserInfo && minimumUserInfo.app_id;

  if (appId)
    widgetUrl = 'https://widget.intercom.io/widget/' + appId;
  else
    widgetUrl = 'https://static.intercomcdn.com/intercom.v1.js';

  // ------ The snippet below is almost identical to the official one however
  // ------ we substitute in widgetUrl instead of a statically defined one.
  // ------ In addition, it has been found that the window.onload event is unreliable
  // ------ in some browsers (specifically on mobile), where it may never fire.  
  // ------ We have replaced waiting on window.onload with simply executing the script loader.
  // ------ As we are inside of Meteor.startup, this should be ok.

  (function(){
    var w=window;
    var ic=w.Intercom;
    if (typeof ic==="function") {
      ic('reattach_activator');
      ic('update',intercomSettings);
    } else { 
      var d=document;
      var i=function(){
        i.c(arguments)};
        i.q=[];
        i.c=function(args) {
          i.q.push(args)
      };
      w.Intercom=i; 
      function l() {
        var s=d.createElement('script');
        s.type='text/javascript';
        s.async=true;
        s.src=widgetUrl;
        var x=d.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s,x);
      }
      l();
    }
  })();
  // ------
});
