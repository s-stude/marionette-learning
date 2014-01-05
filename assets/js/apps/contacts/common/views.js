ContactManager.module('ContactsApp.Common.Views', function(Views, ContactManager, Backbone, Marionette, $, _){
   Views.Form = Marionette.ItemView.extend({
       template: '#contact-form',

       events: {
           'click button.js-submit': 'submitClicked'
       },

       submitClicked: function(e){
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