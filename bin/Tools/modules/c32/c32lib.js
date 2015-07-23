var c32lib = {
   obj : null,
   checkboxes : [],
   async : true,
   init : function (place_id) {
      var success = false;
      try {
         try {
            var actCtx = new ActiveXObject('Microsoft.Windows.ActCtx');
            actCtx.Manifest = ".\\Tools\\modules\\c32\\c32lib_com.manifest";
            c32lib.obj = actCtx.CreateObject("c32lib_com.c32");
         } catch (e) {
            c32lib.obj = new ActiveXObject('c32lib_com.c32');
         }
         success = (c32lib.obj.c32ApiInit(place_id) == 1);
      } catch (e) {}
      if (c32lib.obj)
         setInterval(function(){
            try{
                c32lib.obj.c32DoProcess();
            }  
            catch (e) {}
         }, 100);
      return !!c32lib.obj && success;
   },
   load_settings : function (callback) {
      if (!c32lib.obj){
         callback([]);
         return false;
      }
      var one_init = false;
      var ondone = function (data) {
         if (one_init) return;
         one_init = true;
         c32lib.checkboxes = [];
         //console.log(data);
         try {
            data = JSON.parse(data);
         } catch (e) {
            data = eval('(' + data + ')');
         }
         for (var i = 0; i < data.length; i++) {
            var list = [];
            for (var j = 0; j < data[i].checkboxes.length; j++) {
               list.push({
                  slide_id : i,
                  checkbox_id : j,
                  text : data[i].checkboxes[j],
                  checked : true
               });
            }
            c32lib.checkboxes.push(list);
         }
         callback(data);
      }
      try {
          if (c32lib.async) {
             c32lib.obj.c32LoadSettingsAsync(ondone);
          } else {
             ondone(c32lib.obj.c32LoadSettingsSync());
          }
      } catch (e) {
        ondone([]);
      }

      return true;
   },
   start_install : function (checkboxes, callback) {
      if (!c32lib.obj){
         callback();
         return false;
      }
      var checkboxes_json = '';
      if (window.JSON) {
         checkboxes_json = JSON.stringify(checkboxes);
      } else {
         checkboxes_json = [];
         for (var i = 0; i < checkboxes.length; i++)
            checkboxes_json.push('[' + checkboxes[i].join(',') + ']');
         checkboxes_json = '[' + checkboxes_json.join(',') + ']'
      }
      //alert(checkboxes_json);
      var ondone = function () {
         if (callback)
            callback();
      }
      try {
          if (c32lib.async) {
             c32lib.obj.c32InstallAsync(checkboxes_json, ondone);
          } else {
             c32lib.obj.c32InstallSync(checkboxes_json);
             ondone();
          }
      } catch (e) {
        ondone();
      }
      return true;
   }
}
