ContactManager.module('ContactsApp.List', function(List, ContactManager, Backbone, Marionette, $, _) {

    List.Layout = Marionette.Layout.extend({
        template: '#contact-list-layout',
        regions: {
            panelRegion: '#panel-region',
            contactsRegion: '#contacts-region'
        }
    });

    List.Panel = Marionette.ItemView.extend({
        template: '#contact-list-panel',

        triggers: {
            'click button.js-new': 'contact:new'
        },

        events: {
            'submit #filter-form': 'filterContacts'
        },

        filterContacts: function(e) {
            e.preventDefault();
            var criterion = this.$('.js-filter-criterion').val();
            this.trigger('contacts:filter', criterion);
        }
    });

    List.Contact = Marionette.ItemView.extend({
        tagName: 'tr',
        template: '#contact-list-item',

        events: {
            'click a.js-show': 'showClicked',
            'click a.js-edit': 'editClicked',
            'click a.js-delete': 'deleteClicked'
        },

        flash: function(cssClass) {
            var $view = this.$el;
            $view.hide().toggleClass(cssClass).fadeIn(800, function() {
                setTimeout(function() {
                    $view.toggleClass(cssClass);
                }, 500);
            });
        },

        showClicked: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger('contact:show', this.model);
        },

        editClicked: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger('contact:edit', this.model);
        },

        deleteClicked: function(e) {
            e.stopPropagation();
            this.trigger('contact:delete', this.model);
        },

        remove: function() {
            var _this = this;
            //this.$el.fadeOut(function() {
                Marionette.ItemView.prototype.remove.call(_this);
            //});
        }
    });

    var NoContactsView = Marionette.ItemView.extend({
        template: "#contact-list-none",
        tagName: "tr",
        className: "alert"

    });

    List.Contacts = Marionette.CompositeView.extend({
        tagName: 'table',
        className: 'table table-hover',
        template: '#contact-list',
        emptyView: NoContactsView,
        itemView: List.Contact,
        itemViewContainer: 'tbody',

        initialize: function() {
            this.listenTo(this.collection, 'reset', function() {
                this.appendHtml = function(collectionView, itemView, index) {
                    collectionView.$el.append(itemView.el);
                }
            });
        },

        onCompositeCollectionRendered: function() {
            this.appendHtml = function(collectionView, itemView, index) {
                collectionView.$el.prepend(itemView.el);
            }
        }
    });

});