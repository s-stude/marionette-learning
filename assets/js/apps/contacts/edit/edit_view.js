ContactManager.module("ContactsApp.Edit", function (Edit, ContactManager, Backbone, Marionette, $, _) {
    Edit.Contact = Marionette.ItemView.extend({
        template:'#contact-form',

        initialize:function () {
            this.title = 'Edit: ' + this.model.get('firstName');
            this.title += ' ' + this.model.get('lastName');
        },

        events:{
            'click button.js-submit':'submitClicked'
        },

        onShow:function () {
            if (this.options.asModal) {
                this.$el.dialog({
                    modal:true,
                    width:'auto',
                    title:this.title
                });
            }
        },

        onRender:function () {
            if (!this.options.asModal) {
                var $title = $('<h1>', {text:this.title});
                this.$el.prepend($title);
            }
        },

        submitClicked:function (e) {
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger('form:submit', data);
        },

        onFormDataInvalid:function (errors) {
            var _this = this;
            var clearErrors = function () {
                var $form = _this.$el.find('form');
                $form.find('.help-inline.error').each(function () {
                    $(this).remove();
                });
                $form.find('.control-group.error').each(function () {
                    $(this).removeClass('error');
                });
            };
            var markErrors = function (value, key) {
                var $controlGroup = _this.$el.find('#contact-' + key).parent();
                var $errorEl = $('<span>', {class:'help-inline error', text:value});
                $controlGroup.append($errorEl).addClass('error');
            };

            clearErrors();
            _.each(errors, markErrors);
        }
    });


});