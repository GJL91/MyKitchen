var db;

Ext.application({
    name: "MyKitchen",

    models: ["FoodItem"],
    stores: ["FoodItemsStore"],
    controllers: ["FoodItemsController"],
    views: ["FoodItemsList", "FoodItemEditor"],

    launch: function () {

        var foodItemListView = {
            xtype: "fooditemslistview"
        };
        var foodItemEditorView = {
            xtype: "fooditemeditorview"
        };

        Ext.Viewport.add([foodItemListView, foodItemEditorView]);

        Ext.apply(Ext.util.Format, {
            defaultDateFormat: 'd/m/Y' // Needed so that the date field is in UK format.
        });
        document.addEventListener("deviceready", onDeviceReady, false);
    }
});

function onDeviceReady() {
    // do stuff here if wanted.
}
