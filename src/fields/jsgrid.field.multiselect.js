(function(jsGrid, $, undefined) {

    var MultiselectField = function (config) {
      jsGrid.Field.call(this, config);
    };

    MultiselectField.prototype = new jsGrid.Field({

      items: [],
      textField: "",

      _codeListToWords: function (codes) {
        return this.items.filter(item =>
          codes.reduce((status, code) => status || code === item.code, false)
        ).map(item => item.name)
      },
      _wordToCode: function (word) {
        return this.items.find(item => item.name === word);
      },

      itemTemplate: function (value) {
        console.log('itemTemplate', value);
        return this._codeListToWords($.makeArray(value)).join(", ");
      },

      _createSelect: function (selected) {
        selected = this._codeListToWords($.makeArray(selected));
        var textField = this.textField;
        var $result = $("<select>").prop("multiple", true);

        $.each(this.items, function (_, item) {
          var value = item[textField];
          var $opt = $("<option>").text(value);
          if ($.inArray(value, selected) > -1) {

            $opt.attr("selected", "selected");
          }

          $result.append($opt);
        });
        
        let $wrapResult = $('<div></div>').append($result);
        $result = $result.select2({
          width: 187,
          closeOnSelect: false,
        });
        return $wrapResult;
      },

      insertTemplate: function () {
        console.log('insertTemplate');
        var insertControl = this._insertControl = this._createSelect();
        return insertControl;
      },

      editTemplate: function (value) {
        console.log('editTemplate', value);
        var editControl = this._editControl = this._createSelect(value);
        return editControl;
      },

      insertValue: function () {
        let t = this._insertControl.find("option:selected").map(function () {
          return this.selected ? $(this).text() : null;
        })
        console.log('editInsert', t);
        return this._insertControl.find("option:selected").map(function () {
          return this.selected ? $(this).text() : null;
        });
      },

      editValue: function () {
        let buf = this._editControl.find("option:selected").map(function () {
          return this.selected ? $(this).text() : null;
        });
        $.each(buf, (index, word) => {
          let valueInfo = this._wordToCode(word);
          buf[index] = valueInfo.code;
        })
        return buf;
      }
    });

    jsGrid.fields.multiselect = MultiselectField;

}(jsGrid, jQuery));
