(function(jsGrid, $, undefined) {

    var Field = jsGrid.Field;

    function Buttons(config) {
        Field.call(this, config);
    }

    Buttons.prototype = new Field({
        filtering: false,
        editing: false,
        
        sorter: function (i,ii) {
          return i - ii;
        },
        insertTemplate: function() {
            if(!this.inserting)
                return "";

            return this.insertControl = this._createTextBox();
        },

        editTemplate: function(value) {
            if(!this.editing)
                return this.itemTemplate.apply(this, arguments);

            var $result = this.editControl = this._createTextBox();
            $result.val(value);
            return $result;
        },

        filterValue: function() {
            return this.filterControl.val();
        },

        insertValue: function() {
            return this.insertControl.val();
        },

        editValue: function() {
            return this.editControl.val();
        },
        itemTemplate: function(value, item) {
            var grid = this._grid;
            var $result = [
                $("<span class='arrow'>Вверх</span>").on("click", function(e) {
                    item.order_mark = +value + 1;
                    grid.updateItem(item);
                    grid.sort('order_mark', 'desc');
                    e.stopPropagation();
                }),
                $('<span class="mlmr">'+value+'</span>'),
                $("<span class='arrow'>Вниз</span>").on("click", function(e) {
                    item.order_mark = value - 1;
                    grid.updateItem(item);
                    grid.sort('order_mark', 'desc');
                    e.stopPropagation();
                })
            ];
            return $($.map($result, function (el) {
                return el.get();
            }));
        },
        _createTextBox: function() {
            return $("<input>").attr("type", "text");
        }
    });

    jsGrid.fields.sort = jsGrid.Buttons = Buttons;

}(jsGrid, jQuery));
