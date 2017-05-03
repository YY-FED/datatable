/**
 * Module : kero dataTable row rowSelect
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 13:54:01
 */

/**
 * 切换数据行的选中状态
 * @memberof Row
 * @param  {boolean} [type] 执行选中操作时，如果为single则取消其他行的选中状态，否则只修改当前行的选中状态
 * @example
 * row.toggleSelect()
 * row.toggleSelect('single')
 * row.toggleSelect('multi')
 */
var toggleSelect = function toggleSelect(type) {
    var index = this.parent.getRowIndex(this);
    var selectindices = this.parent.getSelectedIndices();
    if (selectindices.indexOf(index) != -1) {
        this.parent.setRowUnSelect(index);
    } else {
        if (type === 'single') this.parent.setRowSelect(index);else this.parent.addRowSelect(index);
    }
};

var singleSelect = function singleSelect() {
    this.toggleSelect('single');
};

var multiSelect = function multiSelect() {
    this.toggleSelect('multi');
};

export var rowRowSelectFunObj = {
    toggleSelect: toggleSelect,
    singleSelect: singleSelect,
    multiSelect: multiSelect
};