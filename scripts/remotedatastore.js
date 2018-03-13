(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  //constructor
  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }
    this.serverUrl = url;
  }

  //add a new order
  RemoteDataStore.prototype.add = function(key, val) {
    /*$.post(this.serverUrl, val, function(serverResponse) {
      console.log(serverResponse);
    });*/

    $.ajax(this.serverUrl, {
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        "coffee": val.coffee,
        "strength": val.strength,
        "emailAddress": val.emailAddress,
        "flavor": val.flavor,
        "size": val.size,
        "id": val.id
      }),
      success: function(serverResponse) {
        console.log(serverResponse);
      },
      error: function(xhr) {
        alert(xhr.responseText);
      }
    });
  };

  // get all pending orders
  RemoteDataStore.prototype.getAll = function(cb) {
    /*$.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });*/

    $.ajax(this.serverUrl, {
      type: "GET",
      success: function(serverResponse) {
        console.log(serverResponse);
        cb(serverResponse);
      },
      error: function(xhr) {
        alert(xhr.responseText);
      }
    });
  };

  //get an order with key=emailAddress
  RemoteDataStore.prototype.get = function(key, cb) {
    /*$.get(this.serverUrl + "/" + key, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });*/

    $.ajax({
      method: "GET",
      url: this.serverUrl,
      success: function(serverResponse) {
        console.log(serverResponse);

        //get id from emailAddress
        var id = null, i = 0, l = serverResponse.length;
        while (id == null && i < l){
          if (serverResponse[i].emailAddress == key) {
            id = serverResponse[i].id;
          }
          i++;
        }

        console.log(id);

        $.ajax({
          method: "GET",
          url: this.url + "/" + id,
          success: function(serverResponse) {
            console.log(this.url);
            console.log(serverResponse);
            cb(serverResponse);
          },
          error: function(xhr) {
            alert(xhr.responseText);
          }
        });
      },
    });
  };

  RemoteDataStore.prototype.remove = function(key) {
    /*$.ajax(this.serverUrl + "/" + key, {
      type: "DELETE"
    });*/

    $.ajax({
      method: "GET",
      url: this.serverUrl,
      success: function(serverResponse) {
        console.log(serverResponse);

        //get id from emailAddress
        var id = null, i = 0, l = serverResponse.length;
        while (id == null && i < l){
          if (serverResponse[i].emailAddress == key) {
            id = serverResponse[i].id;
          }
          i++;
        }
        console.log(id);
        $.ajax({
          method: "DELETE",
          url: this.url + "/" + id,
          success: function(serverResponse) {
            console.log(this.url);
            console.log(serverResponse);
            console.log("delete item " + id);
          },
          error: function(xhr) {
            alert(xhr.responseText);
          }
        });
      },
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
