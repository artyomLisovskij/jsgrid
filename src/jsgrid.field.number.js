(function(jsGrid, $, undefined) {

    var TextField = jsGrid.TextField;

    function NumberField(name, config) {
        TextField.call(this, name, config);
    }

    NumberField.prototype = new TextField("", {
        
        sorter: "number",

        filterValue: function() {
            return parseInt(this.filterControl.val() || 0, 10);
        },

        insertValue: function() {
            return parseInt(this.insertControl.val() || 0, 10);
        },

        editValue: function() {
            return parseInt(this.editControl.val() || 0, 10);
        },

        _createTextBox: function() {
            return $("<input>").attr("type", "number");
        }
    });

    jsGrid.NumberField = NumberField;
    
}(jsGrid, jQuery));