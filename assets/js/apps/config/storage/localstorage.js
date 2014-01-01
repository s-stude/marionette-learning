ContactManager.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _){

    var findStorageKey = function(entity){
        if(entity.urlRoot){
            return entity.urlRoot;
        }

        if(entity.url){
            return entity.url;
        }

        throw new Error('Unable to determine storage key');
    }
    var StorageMixin = function(entityPrototoype){
        var storageKey = findStorageKey(entityPrototoype);
        return {
            localStorage: new Backbone.LocalStorage(storageKey)
        };
    };

    Entities.configureStorage = function(entity){
        _.extend(entity.prototype, new StorageMixin(entity.prototype));
    };
});