ContactManager.module('Entities', function (Entities, ContactManager, Backbone, Marionette, $, _) {
    Entities.Contact = Backbone.Model.extend({
        urlRoot:'contacts'
    });

    Entities.configureStorage(Entities.Contact);

    Entities.ContactCollection = Backbone.Collection.extend({
        url:'contacts',
        model:Entities.Contact,
        comparator:'firstName'
    });

    Entities.configureStorage(Entities.ContactCollection);

    var contacts;

    var initializeContacts = function () {
        contacts = new Entities.ContactCollection([
            {
                id:1,
                firstName:"Alice",
                lastName:"Arten",
                phoneNumber:"555-0184"
            },
            {
                id:2,
                firstName:"Bob",
                lastName:"Brigham",
                phoneNumber:"555-0163"
            },
            {
                id:3,
                firstName:"Charlie",
                lastName:"Campbell",
                phoneNumber:"555-0129"
            }
        ]);

        contacts.forEach(function (contact) {
            contact.save();
        });

        return contacts.models;
    };

    var API = {
        getContactEntities:function () {
            var contacts = new Entities.ContactCollection();

            var d = $.Deferred();

            setTimeout(function () {
                contacts.fetch({
                    success: function(data){
                        d.resolve(data);
                    }
                });
            }, 2000);

            var contactsPromise = d.promise();
            $.when(contactsPromise).done(function(contacts){
                if (!contacts.length) {
                    var models = initializeContacts();
                    contacts.reset(models);
                }

            });

            return contactsPromise;
        },
        getContactEntity:function (id) {
            var contact = new Entities.Contact({id:id});
            var d = $.Deferred();

            setTimeout(function () {
                contact.fetch({
                    success:function (data) {
                        d.resolve(data);
                    },
                    error:function (data) {
                        d.resolve(undefined);
                    }
                });
            }, 2000);

            return d.promise();
        }
    };

    ContactManager.reqres.setHandler('contact:entity', function (id) {
        return API.getContactEntity(id);
    })

    ContactManager.reqres.setHandler('contact:entities', function () {
        return API.getContactEntities();
    });
});