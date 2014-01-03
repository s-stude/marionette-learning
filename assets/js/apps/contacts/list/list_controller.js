ContactManager.module('ContactsApp.List', function (List, ContactManager, Backbone, Marionette, $, _) {

    List.Controller = {

        listContacts:function () {
            var loadingView = new ContactManager.Common.Views.Loading({
                title:'Loading contacts'
            });

            ContactManager.mainRegion.show(loadingView);

            var contactsPromise = ContactManager.request('contact:entities');

            var contactsListLayout = new List.Layout();
            var contactsListPanel = new List.Panel();

            $.when(contactsPromise).done(function (contacts) {
                var contactsListView = new List.Contacts({
                    collection:contacts
                });

                contactsListLayout.on('show', function(){
                    contactsListLayout.panelRegion.show(contactsListPanel);
                    contactsListLayout.contactsRegion.show(contactsListView);
                });

                contactsListView.on('itemview:contact:show', function (childView, model) {
                    ContactManager.trigger('contact:show', model.get('id'));
                });

                contactsListView.on('itemview:contact:delete', function (childView, model) {
                    model.destroy();
                });

                contactsListView.on('itemview:contact:edit', function (childView, model) {
                    var view = new ContactManager.ContactsApp.Edit.Contact({
                        model: model,
                        asModal: true
                    });

                    view.on('form:submit', function(data){
                       if(model.save(data)){
                           childView.render();
                           ContactManager.dialogRegion.close();
                           childView.flash('success');
                       }else{
                           view.triggerMethod('form:data:invalid', model.validationError);
                       }
                    });

                    ContactManager.dialogRegion.show(view);
                });

                ContactManager.mainRegion.show(contactsListLayout);
            });
        }

    };
});