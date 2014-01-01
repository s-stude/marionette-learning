ContactManager.module('ContactsApp.Show', function(Show, ContactManager, Backbone, Marionette, $, _){
   Show.Controller = {
       showContact: function(id){
           var contactPromise = ContactManager.request('contact:entity', id);
           $.when(contactPromise).done(function(contact){
               var contactView;
               if(contact){
                   contactView = new Show.Contact({
                       model: contact
                   });
               }else{
                   contactView = new Show.MissingContact();
               }

               ContactManager.mainRegion.show(contactView);
           });
       }
   };
});