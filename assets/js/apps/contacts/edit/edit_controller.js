ContactManager.module('ContactsApp.Edit', function (Edit, ContactManager, Backbone, Marionette, $, _) {
    Edit.Controller = {
        editContact:function (id) {
            var loadingView = new ContactManager.Common.Views.Loading();
            ContactManager.mainRegion.show(loadingView);

            var fetchingContactPromise = ContactManager.request('contact:entity', id);
            $.when(fetchingContactPromise).done(function (contact) {
                var view;
                if (contact) {
                    view = new Edit.Contact({
                        model:contact
                    });

                    view.on('form:submit', function(data){
                        contact.save(data);
                        ContactManager.trigger('contact:show', contact.get('id'));
                    });

                } else {
                    view = new ContactManager.ContactsApp.Show.MissingContact();
                }

                ContactManager.mainRegion.show(view);
            });
        }
    };
});