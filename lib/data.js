/**
 * Module : kero DataTable data
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-07-30 14:34:01
 */

/**
 * 设置数据信息
 * @memberof DataTable
 * @param {object} data    需要设置的数据信息，必须包含rows或者pages属性
 * @param {array} [data.rows]    数据信息中的行信息数组
 * @param {array} [data.pages]    数据信息中的page对象数组
 * @param {number} [data.pageIndex=DataTable对象当前的页码]    数据信息中的当前页码
 * @param {number} [data.pageSize=DataTable对象当前的每页显示条数]    数据信息中的每页显示条数
 * @param {number} [data.totalPages=DataTable对象当前的总页数]    数据信息中的总页数
 * @param {number} [data.totalRow=如果存在rows则为rows的长度，否则为DataTable对象当前的总条数]    数据信息中的总条数
 * @param {number} [data.select]    数据信息中的选中行行号
 * @param {number} [data.focus]    数据信息中的focus行行号
 * @param {object} options 设置数据时的配置参数
 * @param {boolean} options.unSelect=false 是否默认选中第一行，如果为true则不选中第一行，否则选中第一行
 * @example
 * // 不包含分页的情况
 * var data = {
 *    pageIndex:0,
 *    pageSize:5,
 *    totalPages:5,
 *    totalRow:22,
 *    rows:[{
 *      id:'r41201', // 如果需要添加
 *      status:'nrm', // 如果需要添加
 *      data:{
 *          field1:'value1',
 *          field2:'value2'
 *        }
 *    },{
 *      id:'r41202',
 *      status:'nrm',
 *      data:{
 *          field1:'value11',
 *          field2:'value21'
 *        }
 *    },...],
 *    select:[0]
 * }
 * // 包含分页的情况
 * var data = {
 *    pageIndex:0,
 *    pageSize:5,
 *    totalPages:5,
 *    totalRow:22,
 *    pages:[{
 *      index: 0,
 *      select: [],
 *      current: -1,
 *      rows:[{
 *        id:'r41201', // 如果需要添加
 *        status:'nrm', // 如果需要添加
 *        data:{
 *          field1:'value1',
 *          field2:'value2'
 *        }
 *      },{
 *        id:'r41202',
 *        status:'nrm',
 *        data:{
 *          field1:'value11',
 *          field2:'value21'
 *        }
 *      },...]
 *    },...],
 * }
 * var op = {
 *     unSelect:true
 * }
 * datatable.setData(data,op)
 */
var setData = function setData(data, options) {
    if (data.pageIndex || data.pageIndex === 0) {
        var newIndex = data.pageIndex;
    } else {
        var newIndex = this.pageIndex();
    }
    if (data.pageSize || data.pageSize === 0) {
        var newSize = data.pageSize;
    } else {
        var newSize = this.pageSize();
    }
    if (data.totalPages || data.totalPages === 0) {
        var newTotalPages = data.totalPages;
    } else {
        var newTotalPages = this.totalPages();
    }
    if (data.totalRow || data.totalRow === 0) {
        var newTotalRow = data.totalRow;
    } else {
        if (data.rows) var newTotalRow = data.rows.length;else var newTotalRow = this.totalRow();
    }
    var select,
        focus,
        unSelect = options ? options.unSelect : false;

    this.pageIndex(newIndex);
    this.pageSize(newSize);

    this.pageCache = data.pageCache || this.pageCache;
    if (this.pageCache === true) {
        this.updatePages(data.pages);
        if (newIndex != this.pageIndex()) {
            this.setCurrentPage(newIndex, true);
            this.totalPages(newTotalPages);
            this.totalRow(newTotalRow + this.newCount);
            return;
        } else {
            // 首先删除数据，然后将当前页数据插入
            this.removeAllRows();
            select = this.getPage(newIndex).selectedIndices;
            focus = this.getPage(newIndex).focus;
            var rows = this.setRows(this.getPage(newIndex).rows, options);
            this.getPage(newIndex).rows = rows;
        }
        // 后台传入totalPages及totalRow才进行更新
        if (data.totalPages) {
            this.totalPages(data.totalPages);
        }
        if (data.totalRow || data.totalRow === 0) {
            this.totalRow(data.totalRow + this.newCount);
        }
    } else {
        select = data.select || (!unSelect ? [0] : []);
        focus = data.focus !== undefined ? data.focus : data.current;
        this.setRows(data.rows, options);
        this.totalPages(newTotalPages);
        this.totalRow(newTotalRow);
    }

    this.updateSelectedIndices();

    if (select && select.length > 0 && this.rows().length > 0) this.setRowsSelect(select);
    if (focus !== undefined && this.getRow(focus)) this.setRowFocus(focus);
};

/**
 * 设置对应行对应字段的值
 * @memberof DataTable
 * @param {string} fieldName 需要设置的字段
 * @param {string} value     需要设置的值
 * @param {u.row} [row=当前行] 需要设置的u.row对象，
 * @param {*} [ctx]        自定义属性，在valuechange监听传入对象中可通过ctx获取此处设置
 * @param {string} validType 传递值的字符类型，如string，integer等
 * @example
 * datatable.setValue('filed1','value1') //设置当前行字段值
 * var row = datatable.getRow(1)
 * datatable.setValue('filed1','value1',row) //设置在指定行字段值
 * datatable.setValue('filed1','value1',row,'ctx') //设置在指定行字段值，同时传入自定义数据
 */
var setValue = function setValue(fieldName, value, row, ctx, validType) {
    if (arguments.length === 1) {
        value = fieldName;
        fieldName = '$data';
    }

    row = row ? row : this.getCurrentRow();
    if (row) row.setValue(fieldName, value, ctx, undefined, validType);
};

/**
 * 重置所有行的数据至nrm状态时的数据
 */
var resetAllValue = function resetAllValue() {
    var rows = new Array();
    rows = rows.concat(this.rows());
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        this.resetValueByRow(row);
    }
};

/**
 * 根据row对象重置数据至nrm状态时的数据
 * @param {u.row} row 需要重置数据的row对象
 */
var resetValueByRow = function resetValueByRow(row) {
    if (row.status == Row.STATUS.NEW) {
        this.setRowsDelete(row);
    } else if (row.status == Row.STATUS.FALSE_DELETE) {
        row.status = Row.STATUS.NORMAL;
        var rows = [row];
        this.trigger(DataTable.ON_INSERT, {
            index: 0,
            rows: rows
        });
    } else if (row.status == Row.STATUS.UPDATE) {
        row.status = Row.STATUS.NORMAL;
        row.resetValue();
    }
};
export var dataFunObj = {
    setData: setData,
    setValue: setValue,
    resetAllValue: resetAllValue,
    resetValueByRow: resetValueByRow
};