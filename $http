function $http(url){
  var core = {
    ajax : function(method, url, args){
        var promise = new Promise(function(resolve, reject){
            var client = new XMLHttpRequest();
            var uri = url;
            if(args && method == "POST" || method == "PUT"){
              uri += '?';
              for(key in args){
                if (args.hasOwnProperty(key)) {
                  if (argcount++) {
                    uri += '&';
                  }
                  uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
                }
              }
              
            }
          client.open(method,uri)
          client.send();
          client.onload = function () {
            if(this.status && this.status >= 200 && this.status <= 300){
              resolve(this.response);
            }else{
              reject(this.statusText)
            }
          };
          client.onerror = function () {
            reject(this.statusText);
          };
        });
      
      return promise;
    }
  }
  
  return {
    get : function(args){
      return core.ajax('GET',url, args)
    },
    post : function(args){
      return core.ajax('POST',url, args)
    },
    'put': function(args) {
      return core.ajax('PUT', url, args);
    },
    'delete': function(args) {
      return core.ajax('DELETE', url, args);
    }
  };
}

var mdnAPI = 'https://jsonplaceholder.typicode.com/posts/1';
var payload = {
 
}

var callback = {
  success: function(data) {
    console.log('success', data);
  },
  error: function(data) {
    console.log('error', data);
  }
};

$http(mdnAPI) 
  .get(payload) 
  .then(callback.success) 
  .catch(callback.error);
