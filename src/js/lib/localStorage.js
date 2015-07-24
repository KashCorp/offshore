var storage = (function(){

  var Test = {
    storage: function(){
      var test = 'test';
      try {
        localStorage.setItem(test,test);
        localStorage.removeItem(test);
        return true;
      } catch(e) {
        return false;
      }
    }(),
    json: function(str){
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    }
  };

  if( Test.storage ){

    var Storage = {

      setItem: function(key, data) {
        // Make sure local storage is supported.
        if (!Test.storage) { return; }

        // Make sure there is a key and a value.
        if (!key || !data) { return 'There is a key or value missing.'; }

        // Check if data is an object or string.
        var value = (typeof data === 'string') ? data : JSON.stringify(data);

        // Store it.
        localStorage.setItem(key,value); // value: data
      },
      getItem: function(key) {
        // Make sure local storage is supported.
        if (!Test.storage) { return; }

        // Make sure there is a key.
        if (!key) { return 'No key!'; }

        // Get the value from storage.
        var value = localStorage.getItem(key);

        return Test.json(value) ? JSON.parse(value) : value;
      },
      removeItem: function(key) {
        if (!Test.storage) { return; }

        localStorage.removeItem(key);
      }
    }

    return {
      supported: Test.storage,
      set: Storage.setItem,
      get: Storage.getItem,
      remove: Storage.removeItem
    }

  } else {

    return {
      supported: Test.storage
    }

  }

}());