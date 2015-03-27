// framux.js
// (c) 2012, Armando Arce, https://github.com/arce/framux
//
// framux.js is an open source component of http://arcux.com
// Licensed under the MIT license.
//
var window, xhr, onDomReady, routie, doT;
var $global = {};
var f$ = framux = {
  'version': "0.0.8",
  'varname': '$',
  'current': null,
  'templates': {},
  'controllers': {},
  'call': function (target, params) {
    f$.controllers[target.controller].params = params;
    f$.current = f$.controllers[target.controller];
    window[target.controller].call(this, target.bindings, params);
  },
  'go': function (uri) {
    onDomReady(function () { routie(uri); });
    return f$;
  },
  'route': function (uri, target) {
    doT.templateSettings = {
		evaluate : /\<\%([\s\S]+?)\%\>/g,
		interpolate : /\<\%=([\s\S]+?)\%\>/g,
		varname     : f$.varname,
		strip: true
	};
    onDomReady(function () {
      if (typeof target.bindings === "undefined") { target.bindings = {}; }
      if (typeof target.location === "undefined") { target.location = 'inner'; }
      if (typeof target.template === "undefined") {
        f$.templates[target.controller] = function (view) {return ''; };
      }
      f$.controllers[target.controller] = target;
      routie(uri, function () {
        var params = arguments;
        if (typeof f$.templates[target.controller] === "undefined") {
          xhr(target.template, function (data) {
            f$.templates[target.controller] = doT.template(data);
            f$.call(target, params);
          });
        } else { f$.call(target, params); }
      });
    });
    return f$;
  },
  'changeHandler': function(evt) {
    var target = evt.target || evt.srcElement; // IE8 compatibility
    var name = target.getAttribute('data-bind');
    if (name == null || name.indexOf(f$.varname)!==0) return;    
    var i, tokens = name.split('.'),
        field = f$.current.bindings;
    for (i=1;i<tokens.length-1;i++)
      field = field[tokens[i]];
    var key = tokens[i];
    if (target.options!=null)
      field[key] = target.options[target.selectedIndex].value;
    else
      field[key] = target.value;
    var elements = document.querySelectorAll('[data-bind = "'+name+'"]');
    for ( var i=0;i<elements.length;i++ ) {
      if (elements[i] == target) continue;
      var tag_name = elements[i].tagName.toLowerCase();
      if ( tag_name === "input" || tag_name === "textarea" || tag_name === "select" )
        elements[i].value = field[key];
      else
        elements[i].innerHTML = field[key];
    } 
  },
  'render': function () {
    var tmpl = f$.templates[f$.current.controller],
        it = f$.current.bindings,
        location =  f$.current.location;
    d$(f$.current.selector).html(tmpl(it), location);
    if ( document.addEventListener ) {
      document.addEventListener( "change", f$.changeHandler, false );
    } else {
      document.attachEvent( "onchange", f$.changeHandler );
    }
  }
}