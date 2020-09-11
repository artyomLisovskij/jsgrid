(function(jsGrid, $, undefined) {

    var Buttons = function (config) {
      jsGrid.Field.call(this, config);
    };

    Buttons.prototype = new jsGrid.Field({
      filtering: false,
      editing: false,

      sorter: function (i, ii) {
        return i - ii;
      },

      insertTemplate: function () {
        if (!this.inserting)
          return "";

        return this.insertControl = this._createTextBox();
      },

      editTemplate: function (value) {
        if (!this.editing)
          return this.itemTemplate.apply(this, arguments);

        var $result = this.editControl = this._createTextBox();
        $result.val(value);
        return $result;
      },

      filterValue: function () {
        return this.filterControl.val();
      },

      insertValue: function () {
        return this.insertControl.val();
      },

      editValue: function () {
        return this.editControl.val();
      },
      itemTemplate: function (value, item) {
        var grid = this._grid;
        var itemIndex = grid.data.findIndex((dataItem) => dataItem.id === item.id);
        var $result = [
          (itemIndex > 0) &&
          $("<span class='arrow'>↑</span>").on("click", function (e) {
            var currentItemOrder = grid.data[itemIndex].order_mark;
            var bottomItemOrder = grid.data[itemIndex - 1].order_mark;
            updateItemGrid(grid.data[itemIndex], { order_mark: bottomItemOrder });
            updateItemGrid(grid.data[itemIndex - 1], { order_mark: currentItemOrder });
            grid.sort('order_mark', grid._sortOrder);
            e.stopPropagation();
          }),
          $('<span class="mlmr">' + value + '</span>'),
          (itemIndex + 1 !== grid.data.length) &&
          $("<span class='arrow'>↓</span>").on("click", function (e) {
            var currentItemOrder = grid.data[itemIndex].order_mark;
            var bottomItemOrder = grid.data[itemIndex + 1].order_mark;
            updateItemGrid(grid.data[itemIndex], { order_mark: bottomItemOrder });
            updateItemGrid(grid.data[itemIndex + 1], { order_mark: currentItemOrder });
            grid.sort('order_mark', grid._sortOrder);
            e.stopPropagation();
          })
        ];
        return $($.map($result, function (el) {
          return el ? el.get() : null;
        }));
      },
      _createTextBox: function () {
        return $("<input>").attr("type", "text");
      }
    });

    jsGrid.fields.buttons = Buttons;

}(jsGrid, jQuery));
