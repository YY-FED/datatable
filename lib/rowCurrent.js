/***
 * Module : kero dataTable rowCurrent
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */

// 更新当前行对应索引
var updateCurrIndex = function updateCurrIndex() {
    var currentIndex = this.focusIndex() != -1 ? this.focusIndex() : this.getSelectedIndex();
    if (this._oldCurrentIndex != currentIndex) {
        this._oldCurrentIndex = currentIndex;
        this.trigger(DataTable.ON_CURRENT_ROW_CHANGE);
        this.currentRowChange(-this.currentRowChange());
        if (this.ns) {
            if (this.root.valueChange[this.ns]) this.root.valueChange[this.ns](-this.root.valueChange[this.ns]());
        }
    }
};

export var rowCurrentFunObj = {
    updateCurrIndex: updateCurrIndex
};