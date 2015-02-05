Ext.define("MyKitchen.view.FoodItemEditor", {
    extend: "Ext.form.Panel",
    requires: "Ext.form.FieldSet",
    alias: "widget.fooditemeditorview",
    config: {
        scrollable: 'vertical',
        items: [
            {
                xtype: "toolbar",
                docked: "top",
                title: "Edit Food Item",
                items: [
                    {
                        xtype: "button",
                        ui: "back",
                        text: "Back",
                        itemId: "backButton"
                    },
                    { xtype: "spacer" },
                    {
                        xtype: "button",
                        ui: "action",
                        text: "Save",
                        itemId: "saveButton"
                    }
                ]
            },
            {
                xtype: "toolbar",
                docked: "bottom",
                items: [
                    {
                        xtype: "button",
                        iconCls: "trash",
                        iconMask: true,
                        itemId: "deleteButton"
                    }
                ]
            },
            {
                xtype: "fieldset",
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'id'
                    },
                    {
                        xtype: 'textfield',
                        name: 'item',
                        label: 'Item',
                        required: true
                    },
                    {
                        xtype: 'selectfield',
                        name: 'category',
                        label: "Category",
                        options: [
                            {
                                text: "Select a category",
                                value: -1
                            },
                            {
                                text: "Cupboard",
                                value: 0
                            },
                            {
                                text: "Fridge",
                                value: 1
                            },
                            {
                                text: "Freezer",
                                value: 2
                            },
                            {
                                text: "Misc.",
                                value: 3
                            }
                        ]
                    },
                    {
                        xtype: 'numberfield',
                        name: 'quantity',
                        label: 'Quantity',
                        minValue: 0,
                        stepValue: 1
                    },
                    {
                        xtype: 'datepickerfield',
                        itemId: 'expirydatepicker',
                        name: 'expiryDate',
                        label: 'Expiry Date',
                        picker: {
                            yearFrom: 2014,
                            yearTo: 2100,
                            value: (new Date()),
                            slotOrder: ['day', 'month', 'year']
                        }
                    }
                ]
            }
        ],
        listeners: [
            {
                delegate: "#backButton",
                event: "tap",
                fn: "onBackButtonTap"
            },
            {
                delegate: "#saveButton",
                event: "tap",
                fn: "onSaveButtonTap"
            },
            {
                delegate: "#deleteButton",
                event: "tap",
                fn: "onDeleteButtonTap"
            }
        ]
    },
    onSaveButtonTap: function () {
        console.log("saveFoodItemCommand");
        this.fireEvent("saveFoodItemCommand", this);
    },
    onDeleteButtonTap: function () {
        console.log("deleteFoodItemCommand");
        this.fireEvent("deleteFoodItemCommand", this);
    },
    onBackButtonTap: function () {
        console.log("backToHomeCommand");
        this.fireEvent("backToHomeCommand", this);
    }

});

