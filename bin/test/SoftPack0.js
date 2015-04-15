
setTimeout(function () {
   
     SoftPack.init();
     
     test(JSON.stringify(SoftPack.SQL("SELECT * FROM soft")), JSON.stringify(SoftPack.SQL("SELECT * FROM soft")));


    next_script();

}, 1000);

