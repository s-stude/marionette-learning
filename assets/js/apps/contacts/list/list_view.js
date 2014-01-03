ContactManager.module('ContactsApp.List', function (List, ContactManager, Backbone, Marionette, $, _) {
    List.Contact = Marionette.ItemView.extend({
        tagName:'tr',
        template:'#contact-list-item',

        events:{
            'click a.js-delete':'deleteClicked',
            'click a.js-show':'showClicked',
            'click a.js-edit':'editClicked'
        },

        showClicked:function (e) {
            e.stopPropagation();
            this.trigger('contact:show', this.model);
        },

        deleteClicked:function (e) {
            e.stopPropagation();
            this.trigger('contact:delete', this.model);
        },

        editClicked:function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger('contact:edit', this.model);
        },

        remove:function () {
            var _this = this;
            this.$el.fadeOut(function () {
                Marionette.ItemView.prototype.remove.call(_this);
            });
        },

        flash:function (cssClass) {
            var $view = this.$el;
            $view.hide().toggleClass(cssClass).fadeIn(800, function () {
                setTimeout(function () {
                    $view.toggleClass(cssClass);
                }, 500);
            });
        }

    });

    List.Contacts = Marionette.CompositeView.extend({
        tagName:'table',
        className:'table table-hover',
        template:'#contact-list',
        itemView:List.Contact,
        itemViewContainer:'tbody'
    });

});