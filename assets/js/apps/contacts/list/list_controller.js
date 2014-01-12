ContactManager.module('ContactsApp.List', function (List, ContactManager, Backbone, Marionette, $, _) {

    List.Controller = {

        listContacts:function () {
            var loadingView = new ContactManager.Common.Views.Loading();
            ContactManager.mainRegion.show(loadingView);

            var contactsPromise = ContactManager.request('contact:entities');

            $.when(contactsPromise).done(function (contacts) {
                var contactsListView = new List.Contacts({
                    collection:contacts
                });

                contactsListView.on('itemview:contact:show', function (childView, model) {
                    ContactManager.trigger('contact:show', model.get('id'));
                });

                contactsListView.on('itemview:contact:delete', function (childView, model) {
                    model.destroy();
                });

                ContactManager.mainRegion.show(contactsListView);
            });
        }

    };
});