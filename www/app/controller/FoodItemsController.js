var dateChanged = false;

Ext.define("MyKitchen.controller.FoodItemsController", {
    extend: "Ext.app.Controller",
    config: {
        refs: {
            foodItemsTabs: "fooditemstabs",
            foodItemsListView: "fooditemslistview",
            foodItemEditorView: "fooditemeditorview",
            expiryDatepicker: "datepickerfield[itemId=expirydatepicker]"
        },
        control: {
            foodItemsListView: {
                newFoodItemCommand: "onNewFoodItemCommand",
                deleteFoodItemCommand: "onDeleteFoodItemListCommand",
                editFoodItemCommand: "onEditFoodItemCommand",
                filterStoreCommand: "onFilterStoreCommand"
            },
            foodItemEditorView: {
                saveFoodItemCommand: "onSaveFoodItemCommand",
                deleteFoodItemCommand: "onDeleteFoodItemCommand",
                backToHomeCommand: "onBackToHomeCommand"
            },
            expiryDatepicker: {
                change: "onDatepickerfieldChange"
            }
        }
    },

    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    // Helper functions
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    activateFoodItemEditor: function (record) {
        dateChanged = false;

        var foodItemEditorView = this.getFoodItemEditorView();
        foodItemEditorView.setRecord(record);
        Ext.Viewport.animateActiveItem(foodItemEditorView, this.slideLeftTransition);
    },
    activateFoodItemsList: function () {
        Ext.Viewport.animateActiveItem(this.getFoodItemsListView(), this.slideRightTransition);
    },

    // Commands
    onNewFoodItemCommand: function () {
        console.log("onNewFoodItemCommand");

        var now = new Date();
        var foodItemID = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

        var newFoodItem = Ext.create("MyKitchen.model.FoodItem", {
            id: foodItemID,
            item: "",
            category: -1,
            quantity: 1,
            expiryDate: ""
        });

        this.activateFoodItemEditor(newFoodItem);
    },
    onEditFoodItemCommand: function (list, record) {
        console.log("onEditFoodItemsCommand");
        this.activateFoodItemEditor(record);
    },
    onSaveFoodItemCommand: function () {
        console.log("onSaveFoodItemCommand");

        var foodItemEditorView = this.getFoodItemEditorView();
        var currentFoodItem = foodItemEditorView.getRecord();
        var newValues = foodItemEditorView.getValues();

        currentFoodItem.set("item", newValues.item);
        currentFoodItem.set("quantity", newValues.quantity);
        currentFoodItem.set("category", newValues.category);

        if (dateChanged) {
            currentFoodItem.set("expiryDate", newValues.expiryDate);
        }

        var errors = currentFoodItem.validate();
        if (!errors.isValid()) {
            var message = '';
            if (errors.getByField("item").length > 0) {
                message += errors.getByField("item")[0].getMessage();
            }

            if (errors.getByField("category").length > 0) {
                if (message.length > 0) {
                    message += "\n\n";
                }

                message += errors.getByField("category")[0].getMessage();
            }

            if (errors.getByField("quantity").length > 0) {
                if (message.length > 0) {
                    message += "\n\n";
                }

                message += errors.getByField("quantity")[0].getMessage();
            }

            alert(message);
            currentFoodItem.reject();
            return;
        }

        var foodStore = Ext.getStore("FoodItemsStore");
        if (null == foodStore.findRecord('id', currentFoodItem.data.id)) {
            foodStore.add(currentFoodItem);
        }

        foodStore.sync();
        // May require re-sorting here. Seems to be fine without, but worth keeping an eye on.

        this.activateFoodItemsList();
    },
    onDeleteFoodItemListCommand: function (record) {
        console.log("onDeleteFoodItemListCommand");

        var foodStore = Ext.getStore("FoodItemsStore");
        foodStore.remove(record);
        foodStore.sync();
    },
    onDeleteFoodItemCommand: function () {
        console.log("onDeleteFoodItemCommand");

        var foodItemEditorView = this.getFoodItemEditorView();
        var currentFoodItem = foodItemEditorView.getRecord();

        var foodStore = Ext.getStore("FoodItemsStore");

        foodStore.remove(currentFoodItem);
        foodStore.sync();

        this.activateFoodItemsList();
    },
    onFilterStoreCommand: function (view) {
        console.log("onFilterStoreCommand");

        var store = Ext.getStore("FoodItemsStore");
        store.clearFilter();
        if (view !== -1) {
            store.filter("category", view);
        }
    },
    onBackToHomeCommand: function () {
        console.log("onBackToHomeCommand");
        this.activateFoodItemsList();
    },
    onDatepickerfieldChange: function (content) {
        if (content._value !== null) {
            console.log("onDatepickerfieldChange");
            dateChanged = true;
        }
    },

    // Base Class functions
    launch: function () {
        this.callParent();
        Ext.getStore("FoodItemsStore").load();

        console.log("launch");
    },
    init: function () {
        this.callParent(arguments);
        console.log("init");
    }
});