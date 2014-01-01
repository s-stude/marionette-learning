ContactManager.module('Common.Views', function(Views, ContactManager, Backbone, Marionette, $, _){
   Views.Loading = Marionette.ItemView.extend({
       template: '#loading-view',
       
       onShow: function(){
           console.log("Marionette's show fn was invoked");
       }
   });
});