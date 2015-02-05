Ext.define('MyKitchen.model.FoodItem', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'id',
        fields: [
            { name: 'id', type: 'int' },
            { name: 'item', type: 'string' },
            { name: 'category', type: 'int' },
            { name: 'quantity', type: 'int' },
            { name: 'expiryDate', type: 'date', dateFormat: 'c' }
        ],
        validations: [
            { type: 'presence', field: 'id' },
            { type: 'presence', field: 'item', message: 'You must enter a name for this item' },
            { type: 'format', field: 'category', matcher: /^[0123]$/, message: 'You must select a category' },
            { type: 'format', field: 'quantity', matcher: /^0*[123456789]\d*$/, message: 'Quantity must be non zero' }
        ]
    }
});