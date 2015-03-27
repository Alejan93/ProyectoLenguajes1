// xhr.js
// (c) 2012, Armando Arce, https://github.com/arce/framux
//
// xhr.js is an open source component of http://arcux.com
// Licensed under the MIT license.
//
var xhr = function(url,callback,method,params,mime,headers) {
	try {
	  if (method == null) method = "GET";
	  var async = (callback != null);
	  if (window.XMLHttpRequest)
		xhttp=new XMLHttpRequest();
	  else
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  if (async) {
		xhttp.onreadystatechange=function() {
		  if (xhttp.readyState==4) {
			callback(xhttp.responseText);
		  }
		}  
	  }
	  if (mime && xhttp.overrideMimeType) 
	    xhttp.overrideMimeType(mime);
	  if (mime) xhttp.setRequestHeader("Accept", mime);
	  if (headers) for (i=0;i<headers.length;i++)
	      xhttp.setRequestHeader(headers[i].header,headers[i].value);
	  xhttp.open(method,url,async); xhttp.send(params);
	  if (!async)
		return xhttp.responseText;
	} catch (e) {
	  if (typeof console === "undefined" || 
	      typeof console.log === "undefined");
	  else console.log("Error opening "+url);
	}
}