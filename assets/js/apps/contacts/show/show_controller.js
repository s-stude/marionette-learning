ContactManager.module('ContactsApp.Show', function (Show, ContactManager, Backbone, Marionette, $, _) {
    Show.Controller = {
        showContact:function (id) {
            var loadingView = new ContactManager.Common.Views.Loading();
            ContactManager.mainRegion.show(loadingView);

            var contactPromise = ContactManager.request('contact:entity', id);
            $.when(contactPromise).done(function (contact) {
                var contactView;
                if (contact) {
                    contactView = new Show.Contact({
                        model:contact
                    });

                    contactView.on('contact:edit', function(contact){
                       ContactManager.trigger('contact:edit', contact.get('id'));
                    });
                } else {
                    contactView = new Show.MissingContact();
                }

                ContactManager.mainRegion.show(contactView);
            });
        }
    };
});