var disclose = false;

Ext.define("MyKitchen.view.FoodItemsList", {
    extend: "Ext.Container",
    requires:"Ext.dataview.List",
    alias: "widget.fooditemslistview",

    config: {
        layout: {
            type: 'fit'
        },
        items: [{
            xtype: "toolbar",
            title: "My Food Items",
            docked: "top",
            items: [
                { xtype: 'spacer' },
                {
                    xtype: "button",
                    text: 'New',
                    ui: 'action',
                    itemId: "newButton"
                }
            ]
        }, {
            xtype: "toolbar",
            ui: "neutral",
            docked: "top",
            items: [
                {
                    xtype: "spacer"
                },
                {
                    xtype: "segmentedbutton",
                    allowDepress: true,
                    items: [
                        {
                            text: "All",
                            itemId: "allButton",
                            pressed: true
                        },
                        {
                            text: "Cupboard",
                            itemId: "cupboardButton"
                        },
                        {
                            text: "Fridge",
                            itemId: "fridgeButton"
                        },
                        {
                            text: "Freezer",
                            itemId: "freezerButton"
                        },
                        {
                            text: "Misc.",
                            itemId: "miscButton"
                        }
                    ]
                },
                {
                    xtype: "spacer"
                }
            ]
        }, {
            xtype: "list",
            store: "FoodItemsStore",
            itemId: "foodItemsList",
            loadingText: "Loading Food Items...",
            emptyText: '<div class="list-empty-text">No food items found.</div>',
            onItemDisclosure: true,
            cls: "foodList",
            itemTpl: Ext.create('Ext.XTemplate', '<div class="list-item-name">{item}</div><div class="list-item-expiry { expiryDate:this.getDateThreshold }">{ expiryDate:this.getFormattedDate }</div>', {
                getDateThreshold: function (date) {
                    if (date == null) {
                        return "hidden";
                    }

                    var day = 86400000;
                    var today = new Date();

                    today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);

                    if (date < today) {
                        return "red";
                    }

                    var dateTime = date.getTime(),
                        todayTime = today.getTime();

                    if (dateTime < (todayTime + (2 * day))) {
                        return "orange";
                    }

                    if (dateTime < (todayTime + (4 * day))) {
                        return "yellow";
                    }

                    return "green";
                },
                getFormattedDate: function (date) {
                    if (date == null) {
                        return "";
                    }

                    var day = 86400000;
                    var today = new Date();
                    today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);

                    var dateTime = date.getTime(),
                        todayTime = today.getTime();

                    var diff = dateTime - todayTime;
                    if (diff % day !== 0) {
                        diff += day - (diff % day);
                    }

                    var days = diff / day;

                    var text = "<br />Days";
                    if (days === 1) text = "<br />Day";

                    return days + text;
                }
            })
        }],
        listeners: [{
            delegate: "#newButton",
            event: "tap",
            fn: "onNewButtonTap"
        }, {
            delegate: "#allButton",
            event: "tap",
            fn: "onAllButtonTap"
        }, {
            delegate: "#cupboardButton",
            event: "tap",
            fn: "onCupboardButtonTap"
        }, {
            delegate: "#fridgeButton",
            event: "tap",
            fn: "onFridgeButtonTap"
        }, {
            delegate: "#freezerButton",
            event: "tap",
            fn: "onFreezerButtonTap"
        }, {
            delegate: "#miscButton",
            event: "tap",
            fn: "onMiscButtonTap"
        }, {
            delegate: "#foodItemsList",
            event: "disclose",
            fn: "onFoodItemsListDisclose"
        }, {
            delegate: "#foodItemsList",
            event: "itemtap",
            fn: "onFoodItemsListTap"
        }]
    },    
    onNewButtonTap: function () {
        console.log("newFoodItemCommand");
        this.fireEvent("newFoodItemCommand", this);
    },
    onAllButtonTap: function () {
        console.log("allButtonTap");
        this.fireEvent("filterStoreCommand", -1);
    },
    onCupboardButtonTap: function () {
        console.log("cupboardButtonTap");
        this.fireEvent("filterStoreCommand", 0);
    },
    onFridgeButtonTap: function () {
        console.log("fridgeButtonTap");
        this.fireEvent("filterStoreCommand", 1);
    },
    onFreezerButtonTap: function () {
        console.log("freezerButtonTap");
        this.fireEvent("filterStoreCommand", 2);
    },
    onMiscButtonTap: function () {
        console.log("miscButtonTap");
        this.fireEvent("filterStoreCommand", 3);
    },
    onFoodItemsListDisclose: function (list, record, target, index, evt, options) {
        console.log("deleteFoodItemCommand");
        disclose = true; // Pressing the disclose icon also fires the itemtap event. This stops the extra firing reaching the controller.
        this.fireEvent('deleteFoodItemCommand', record);
    },
    onFoodItemsListTap: function (list, index, target, record, evt, options) {
        if (!disclose) {
            console.log("editFoodItemCommand");
            this.fireEvent('editFoodItemCommand', this, record);
        } else {
            disclose = false;
        }
    }
});