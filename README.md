<img src="http://tinper.org/assets/images/kero.png" width="120" style="max-width:100%;"/>


[![npm version](https://img.shields.io/npm/v/kero.svg)](https://www.npmjs.com/package/kero)
[![Build Status](https://img.shields.io/travis/iuap-design/kero/master.svg)](https://travis-ci.org/iuap-design/kero)
[![devDependency Status](https://img.shields.io/david/dev/iuap-design/kero.svg)](https://david-dm.org/iuap-design/kero#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/kero.svg?style=flat)](https://npmjs.org/package/kero)


[中文文档](./README_CN.md)
##  Introduction
[kero](http://tinper.org/dist/kero/index.html) is a front-end model framework，As a ` MVVM ` architecture ` Model ` layer, multidimensional data Model, provide the solution for complex enterprise applications business application scenario development problems。


## Features

* Abundant API
* Multidimensional Data Model 
* Status identifier
* Paging cache capacity
* event trigger


## Quickstart


### Get kero

- npm

```
npm install kero
```
* cdn 
```
//design.yonyoucloud.com/static/kero/latest/kero.js
```
### Introducing kero

- ES6
```
import { Datatable } from "kero"

```
* HTML

```
<!-- kero is dependent on knockout-->
<script src="//design.yonyoucloud.com/static/knockout/knockout-3.2.0.debug.js"></script>
<script src="//design.yonyoucloud.com/static/kero/latest/kero.js"></script>
```

### Use

#### definition


		var myDataTable = new u.DataTable({
			meta:{
				field1:{required:true},
				field2:{}
			}
		})





####  add data


    dataTable.setSimpleData([
        {"id": "001","name": "tom"},
        {"id": "002","name": "john"}
    ])



#### setValue

	var row = dataTable.createEmptyRow();
	row.setValue('id','003')


#### update

	var row = dataTable.getRow(index);
	row.setValue('name','jerry');


#### delete

	dataTable.removeRow(index);

#### get all data

	var json = dataTable.getSimpleData();

#### add event trigger

```
dataTable1.on('valueChange',function(event){
	var field = event.field,
		rowId = event.rowId,
		oldValue = event.oldValue,
		newValue = event.newValue;
});
```

Read the [Develop documentation](http://tinper.org/dist/kero/docs/overview.html) for information on the framework contents, templates and examples, and more.


## Contributing

### Develop

Developers can participate in the development of kero,  but also can be based on kero two development


kero use gulp.js and webpack build the project.


clone：

```
$ git clone git@github.com:iuap-design/kero.git
```

install：

```
$ npm install
```

build：

```
$ npm run product
```

### Feedback

If you encounter any problems , submit [issues](https://github.com/iuap-design/kero/issues),or pull request。

[PR code](CONTRIBUTING.md)


## Licence 版权

[MIT](./LICENSE)
