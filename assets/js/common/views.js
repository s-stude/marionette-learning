ContactManager.module('Common.Views', function (Views, ContactManager, Backbone, Marionette, $, _) {
    Views.Loading = Marionette.ItemView.extend({
        template:'#loading-view',

        initialize:function (options) {
            options || (options = {});
            this.title = options.title || 'Loading data';
            this.message = options.message || 'Please wait, data is loading'
        },

        serializeData: function(){
            return {
                title: this.title,
                message: this.message
            };
        }
    });
});