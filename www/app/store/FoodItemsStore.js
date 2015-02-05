Ext.define("MyKitchen.store.FoodItemsStore", {
    extend: "Ext.data.Store",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "MyKitchen.model.FoodItem",
        proxy: {
            type: 'localstorage',
            id: 'my-kitchen-fooditemsstore'
        },
        sorters: [{
            sorterFn: function (o1, o2) {
                var getDate = function (o) {
                    return o.get('expiryDate');
                }

                var date1 = getDate(o1),
                    date2 = getDate(o2);

                if (date1 == null) {
                    return 1;
                }

                if (date2 == null) {
                    return -1;
                }

                if (date1.getTime() === date2.getTime()) {
                    return 0;
                }

                return date1 < date2 ? -1 : 1;
            }
        }],
    }
});
