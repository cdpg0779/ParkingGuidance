/**
 * 菜单列表操作界面
 */
var PAGE_SIZE = 12;
var storeFunction = null;
var grid = null;
var _winNew = null;
var _winEdit = null;



var parentsFunctionStore = Ext.create('Ext.data.Store', {
	fields: ['code', 'name'],
	data: [
	]
});







(function () {
	Ext.onReady(function () {
		GetAllFunction();
        /*
         * 注册用户单位数据模型
         * */

		Ext.regModel('functionContent', {
			fields: [
				{ name: 'id', type: 'string' },
				{ name: 'funccode', type: 'string' },
				{ name: 'btnid', type: 'string' },
				{ name: 'description', type: 'string' },
				{ name: 'ParentsDir', type: 'string' },
				{ name: 'ParentsId', type: 'string' },
				{ name: 'orderby', type: 'string' },
				{ name: 'IframeId', type: 'string' },
				{ name: 'IframeName', type: 'string' },
				{ name: 'IframeSrc', type: 'string' },
				{ name: 'ItemId', type: 'string' }
			]
		});
        /**
         * 建立用户单位存储和指定数据模型与代理
         */
		storeFunction = Ext.create('Ext.data.Store', {
			model: "functionContent",
			autoLoad: true,
			pageSize: PAGE_SIZE,
			remoteSort: false,
			remoteFilter: true,
			proxy: {
				type: "ajax",
				url: "/users/appfunctionall",
				actionMethods: {
					create: 'POST',
					read: 'POST',
					update: 'POST',
					destroy: 'POST'
				},
				api: {
					read: '/users/appfunctionall',
					create: '/users/addappfunction',
					update: '/users/editappfunction',
					destroy: '/users/deleteappfunction'
				},
				reader: {
					type: "json",
					root: "rows",
					totalProperty: "total"
				},
				writer: {
					type: "json"
				}
			}
		});
		Ext.create('Ext.Panel', {
			title: '菜单管理',
			width: 970,
			height: 80,
			bodyPadding: 8,
			layout: 'hbox',
			items: [
				{ id: 'keyword', xtype: 'textfield', fieldLabel: '关键字', margin: '0 8 0 8' },
				{
					id: 'searchbtn',
					xtype: 'button',
					text: '搜索',
					iconCls: 'Applicationformmagnify',
					handler: function () {
						var keyword = Ext.getCmp('keyword').getValue();
						storeFunction.reload({
							params: {
								keywordmatch: keyword
							}
						});
					}
				}],
			renderTo: Ext.getBody()
		});

        /**
         * 建立用户部门显示列表表格，包括顶部工具栏和底部翻页插件
         */
		grid = Ext.create('Ext.grid.Panel', {
			xtype: 'grid',
			store: storeFunction,
			width: 970,
			height: 450,
			layout: 'fit',
			columnLines: true,
			renderTo: Ext.getBody(),
			selMode: {
				injectCheckbox: 0,
				mode: 'MULTI',
				checkOnly: true
			},
			selType: 'checkboxmodel',
			columns: [{ xtype: 'rownumberer', text: '序号', width: 40, align: 'center' },
			{ text: '编号', dataIndex: 'id', hidden: true },
			{ text: '节点名称', dataIndex: 'description', align: 'center', width: 300 },
			{
				text: '父节点名称', dataIndex: 'ParentsDir', align: 'center', width: 300,
			}, {
				text: '排序', dataIndex: 'orderby', align: 'center', width: 300,
			}
			],
			bbar: [{
				xtype: 'pagingtoolbar',
				store: storeFunction,
				displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
				emptyMsg: "没有数据",
				beforePageText: "当前页",
				afterPageText: "共{0}页",
				displayInfo: true
			}],
			listeners: {
				'afterrender': function (e, epts) {
					Ext.Ajax.request({
						url: '/users/getrole_func',
						method: 'POST',
						success: function (response, options) {
							var joRes = response.responseText;
							if (joRes) {
								joRes = joRes.split(',');
								var roleid_add = Ext.getCmp('function_add_btn');
								var roleid_edit = Ext.getCmp('function_edit_btn');
								var roleid_del = Ext.getCmp('function_del_btn');
								/*现将所有的按钮隐藏，然后根据权限来打开按钮*/
								roleid_add.setVisible(false);
								roleid_edit.setVisible(false);
								roleid_del.setVisible(false);
								Ext.Ajax.request({
									url: '/users/getRoleIdByBtnId',
									params: {
										add: "function_all_btn",
										edit: "function_all_btn",
										del: "function_all_btn"
									},
									method: 'POST',
									success: function (r, o) {
										var role = Ext.JSON.decode(r.responseText ? r.responseText : "{}");
										var add_id = role.add;
										var edit_id = role.edit;
										var del_id = role.del;
										for (var i = 0; i < joRes.length; i++) {
											if (joRes[i] == add_id) roleid_add.setVisible(true);
											if (joRes[i] == edit_id) {
												grid.addListener('itemdblclick', editOldstoreFunction);
												roleid_edit.setVisible(true);
											}
											if (joRes[i] == del_id) roleid_del.setVisible(true);
										}
										var selections = e.getSelectionModel().getSelection();
										e.down('#del_btn').setDisabled(selections.length == 0);
										e.down('#edit_btn').setDisabled(selections.length != 1);
									}
								});
							}
						},
						failure: function (response, options) {
							Ext.MessageBox.alert('失败', '请求超时或网络故障,错误码：' + response.status);
						}
					});
				}
			},
			tbar: [{ text: '新增', iconCls: 'Add', handler: addNewstoreFunction, id: 'function_add_btn' }, "-",
			{
				itemId: 'edit_btn',
				text: '修改',
				iconCls: 'Applicationformedit',
				handler: editOldstoreFunction,
				id: 'function_edit_btn'
			}, "-",
			{ itemId: 'del_btn', text: '删除', iconCls: 'Delete', handler: deletestoreFunction, id: 'function_del_btn' }
			]
		});

		grid.getSelectionModel().on('selectionchange', function (selModel, selections) {
			grid.down('#del_btn').setDisabled(selections.length == 0);
			grid.down('#edit_btn').setDisabled(selections.length != 1);
		});
	});
})();
/**
 * 创建显示功能菜单录入窗口
 */
function addNewstoreFunction() {
	_winNew = Ext.create('Ext.Window', {
		title: '添加菜单节点',
		width: 250,
		layout: 'vbox',
		defaults: {
			xtype: 'textfield'
		},
		bodyPadding: 5,
		items: [{ id: 's_description', fieldLabel: '节点名称', minLength: 2, maxLength: 200, allowBlank: false, width: 200 },
		{
			id: 's_ParentsDir',
			xtype: 'combobox',
			fieldLabel: '父节点',
			store: parentsFunctionStore,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'code',
			width: 200,
			editable: false
		}, { id: 's_orderby', fieldLabel: '排序', minLength: 2, maxLength: 200, allowBlank: false, width: 200 },
		{ id: 's_IframeId', fieldLabel: '框架id', minLength: 2, maxLength: 200, allowBlank: false, width: 200 },
		{ id: 's_IframeName', fieldLabel: '框架名称', minLength: 2, maxLength: 200, allowBlank: false, width: 200 },
		{ id: 's_IframeSrc', fieldLabel: '框架链接地址', minLength: 2, maxLength: 200, allowBlank: false, width: 200 },
		{ id: 's_ItemId', fieldLabel: '标签id', minLength: 2, maxLength: 200, allowBlank: false, width: 200 }
		],
		buttons: [{
			text: '保存', handler: function () {
				saveFunction();
			}
		}, {
			text: '取消', handler: function () {
				_winNew.close();
			}
		}],
		listeners: {
			afterrender: function () {
				Ext.getCmp('s_ParentsDir').select(parentsFunctionStore.getAt(0));
			}
		},
		renderTo: Ext.getBody()
	});
	_winNew.show();
}

/*
 * 保存节点
 * */
function saveFunction() {
	var s_description = Ext.getCmp('s_description').getValue();
	s_description = Ext.String.trim(s_description);
	if (s_description == '') {
		Ext.Msg.alert('错误', '必须填写节点名');
		return;
	}
	var s_ParentsDir = Ext.getCmp('s_ParentsDir').getValue();
	s_ParentsDir = Ext.String.trim(s_ParentsDir);
	if (s_ParentsDir == '') {
		Ext.Msg.alert('错误', '必须选择父节点');
		return;
	}
	var s_orderby = Ext.getCmp('s_orderby').getValue();
	s_orderby = Ext.String.trim(s_orderby);
	if (s_orderby == '') {
		Ext.Msg.alert('错误', '必须填写排序');
		return;
	}
	var s_IframeId = Ext.getCmp('s_IframeId').getValue();
	s_IframeId = Ext.String.trim(s_IframeId);
	var s_IframeName = Ext.getCmp('s_IframeName').getValue();
	s_IframeName = Ext.String.trim(s_IframeName);
	var s_IframeSrc = Ext.getCmp('s_IframeSrc').getValue();
	s_IframeSrc = Ext.String.trim(s_IframeSrc);
	var s_ItemId = Ext.getCmp('s_ItemId').getValue();
	s_ItemId = Ext.String.trim(s_ItemId);
	var model = storeFunction.findRecord('description', s_description);
	if (model != null) {
		Ext.Msg.alert('错误', '已存在该节点，请重新填写节点名称');
		return;
	}
	storeFunction.add({
		description: s_description,
		ParentsDir: s_ParentsDir,
		orderby: s_orderby,
		IframeId: s_IframeId,
		IframeName: s_IframeName,
		IframeSrc: s_IframeSrc,
		ItemId: s_ItemId
	});
	storeFunction.sync({
		success: function () {
			storeFunction.reload();
			_winNew.close();
		},
		failure: function () {
			Ext.Msg.alert('错误', '添加新节点失败');
		}
	});
}


/*
 * 修改
 * */
function editOldstoreFunction() {
	var selectedData = grid.getSelectionModel().getSelection()[0].data;
	var _id = selectedData.id;
	_winEdit = Ext.create('Ext.Window', {
		title: '修改选择的菜单节点',
		width: 250,
		layout: 'vbox',
		defaults: {
			xtype: 'textfield'
		},
		bodyPadding: 5,
		items: [{ id: 's_description', fieldLabel: '节点名称', minLength: 2, maxLength: 200, allowBlank: false, width: 200, value: selectedData.description },
		{
			id: 's_ParentsDir',
			xtype: 'combobox',
			fieldLabel: '父节点',
			store: parentsFunctionStore,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'code',
			width: 200,
			editable: false
		}, { id: 's_orderby', fieldLabel: '排序', minLength: 2, maxLength: 200, allowBlank: false, width: 200, value: selectedData.orderby },
		{ id: 's_IframeId', fieldLabel: '框架id', minLength: 2, maxLength: 200, allowBlank: false, width: 200, value: selectedData.IframeId },
		{ id: 's_IframeName', fieldLabel: '框架名称', minLength: 2, maxLength: 200, allowBlank: false, width: 200, value: selectedData.IframeName },
		{ id: 's_IframeSrc', fieldLabel: '框架链接地址', minLength: 2, maxLength: 200, allowBlank: false, width: 200, value: selectedData.IframeSrc },
		{ id: 's_ItemId', fieldLabel: '标签id', minLength: 2, maxLength: 200, allowBlank: false, width: 200, value: selectedData.ItemId }
		],
		buttons: [{
			text: '修改', handler: function () {
				editUser(_id);
			}
		}, {
			text: '取消', handler: function () {
				_winEdit.close();
			}
		}],
		listeners: {
			afterrender: function () {
				var index = parentsFunctionStore.find('code', selectedData.ParentsId);
				Ext.getCmp('s_ParentsDir').select(parentsFunctionStore.getAt(index));
			}
		},
		renderTo: Ext.getBody()
	});
	_winEdit.show();
}


function editUser(sid) {
	var s_description = Ext.getCmp('s_description').getValue();
	s_description = Ext.String.trim(s_description);
	if (s_description == '') {
		Ext.Msg.alert('错误', '必须填写节点名');
		return;
	}
	var s_ParentsDir = Ext.getCmp('s_ParentsDir').getValue();
	s_ParentsDir = Ext.String.trim(s_ParentsDir);
	if (s_ParentsDir == '') {
		Ext.Msg.alert('错误', '必须选择父节点');
		return;
	}
	var s_orderby = Ext.getCmp('s_orderby').getValue();
	s_orderby = Ext.String.trim(s_orderby);
	if (s_orderby == '') {
		Ext.Msg.alert('错误', '必须填写排序');
		return;
	}
	var s_IframeId = Ext.getCmp('s_IframeId').getValue();
	s_IframeId = Ext.String.trim(s_IframeId);
	var s_IframeName = Ext.getCmp('s_IframeName').getValue();
	s_IframeName = Ext.String.trim(s_IframeName);
	var s_IframeSrc = Ext.getCmp('s_IframeSrc').getValue();
	s_IframeSrc = Ext.String.trim(s_IframeSrc);
	var s_ItemId = Ext.getCmp('s_ItemId').getValue();
	s_ItemId = Ext.String.trim(s_ItemId);
	var model = storeFunction.findRecord('description', s_description);
	if (model != null) {
		Ext.Msg.alert('错误', '已存在该节点，请重新填写节点名称');
		return;
	}
	var record = storeFunction.findRecord('id', sid);
	record.set('description', s_description);
	record.set('ParentsDir', s_ParentsDir);
	record.set('orderby', s_orderby);
	record.set('IframeId', s_IframeId);
	record.set('IframeName', s_IframeName);
	record.set('IframeSrc', s_IframeSrc);
	record.set('ItemId', s_ItemId);

	storeFunction.sync({
		success: function () {
			storeFunction.reload();
			_winEdit.close();
		},
		failure: function () {
			storeFunction.reload();
			Ext.Msg.alert('错误', '修改节点信息失败');
		}
	});
}


/*
 * 删除选定的用户
 * */
function deletestoreFunction() {
	var selections = grid.getSelectionModel().getSelection();
	storeFunction.remove(selections);
	storeFunction.sync({
		success: function () {
			storeFunction.reload();
			_winEdit.close();
		},
		failure: function () {
			Ext.Msg.alert('错误', '删除菜单节点失败');
		}
	});
}





/*
 * 拿到父节点
 * */
function GetAllFunction() {
	Ext.Ajax.request({
		url: '/users/getParentsFunction',
		method: 'POST',
		success: function (response, options) {
			var joRes = Ext.JSON.decode(response.responseText);
			joRes = eval(joRes);
			var data = [];
            /*  var PersonRecord = Ext.data.Record.create([
             {name: 'code', type: 'string'},
             {name: 'name', type: 'string'}
             ]);*/
			if (joRes) {
				parentsFunctionStore.add({ code: '1', name: '没有父节点' });
				for (var i = 0; i < joRes.rows.length; i++) {
					parentsFunctionStore.add({ code: joRes.rows[i].id, name: joRes.rows[i].name });
					/* data.push(["code :"+joRes.rows[i].id,"name :"+joRes.rows[i].rolename]);*/
				}
				parentsFunctionStore.sync();
				/* roleStore.data. =data;*/
			}
		},
		failure: function (response, options) {
			Ext.MessageBox.alert('失败', '请求失败,错误码：' + response.status);
		}
	});
}


