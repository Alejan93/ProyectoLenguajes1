// domux.js
// (c) 2012, Armando Arce, https://github.com/arce/framux
//
// domux.js is an open source component of http://arcux.com
// Licensed under the MIT license.
//
window.d$ = window.domux = domux = function(id) {
    return new domux.find(id);
};
var domux = {
  'version': "0.0.1",
  'arr': [],
  'find': function(sel) {
    if (sel.indexOf('#') == 0)
      return domux.id(sel.substring(1,sel.length));
    else 
      return domux.tag(sel);
  },
  'id': function(id) {
    domux.arr = new Array();
    domux.arr.push(document.getElementById(id));
    return domux;
  },
  'tag': function(name) {
    domux.arr = new Array(); 
    var items = document.getElementsByTagName(name);
    for (i=0;i<items.length;i++)
      domux.arr.push(items.item(i))
    return domux;
  },
  'outer': function(html) {
    for (i=0;i<domux.arr.length;i++)
      domux.arr[i].outerHTML = html;
    return domux;
  },
  'inner': function(html) {
    for (i=0;i<domux.arr.length;i++)
      domux.arr[i].innerHTML = html;
    return domux;
  },
  'top': function(html) {
    for (i=0;i<domux.arr.length;i++)
      domux.arr[i].innerHTML = domux.arr[i].innerHTML + html;
    return domux;
  },
  'bottom': function(html) {
    for (i=0;i<domux.arr.length;i++)
      domux.arr[i].innerHTML = html + domux.arr[i].innerHTML;
    return domux;
  },
  'after': function(html) {
    for (i=0;i<domux.arr.length;i++)
      domux.arr[i].outerHTML = domux.arr[i].outerHTML + html;
    return domux;
  },
  'before': function(html) {
    for (i=0;i<domux.arr.length;i++)
      domux.arr[i].outerHTML = html + domux.arr[i].outerHTML;
    return domux;
  },
  'update': function(html) {
    for (i=0;i<domux.arr.length;i++) {
      var inner = domux.arr[i].innerHTML;
      domux.arr[i].outerHTML = html;
      domux.arr[i].innerHTML = inner;
    }
    return domux;
  },
  'toStr': function() {
    var result = '';
    for (i=0;i<domux.arr.length;i++)
      result += domux.arr[i].innerHTML;
    return result;
  },
  'html': function(html,loc) {
    if (html==null) return domux.toStr();
    if (loc==null) position="inner"; 
    if (loc==='outer') return domux.outer(html);
    else if (loc==='inner') return domux.inner(html);
    else if (loc==='top') return domux.top(html);
    else if (loc==='bottom') return domux.bottom(html);
    else if (loc==='after') return domux.after(html);
    else if (loc==='before') return domux.before(html);
    else if (loc==='update') return domux.update(html);
    else return domux;
  }
}