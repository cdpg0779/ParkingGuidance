/**
 * CMS APP功能管理界面
 */

var PAGE_SIZE = 12;
var storeAppFunction = null;
var grid = null;
var _winNew = null;
var _winEdit = null;

(function () {
	Ext.onReady(function () {
		/**
 		 * 注册APP功能数据模型
 		 */
		Ext.regModel('AppFunctionContent', {
			fields: [
				{ name: 'id', type: 'string' },
				{ name: 'funccode', type: 'int' },
				{ name: 'description', type: 'string' }
			]
		});

		/**
		 * 建立APP功能存储和指定数据模型与代理
		 */
		storeAppFunction = Ext.create('Ext.data.Store', {
			model: "AppFunctionContent",
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

		/**
		 * 建立通知公告显示列表表格，包括顶部工具栏和底部翻页插件
		 */
		grid = Ext.create('Ext.grid.Panel', {
			xtype: 'grid',
			store: storeAppFunction,
			width: 600,
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
			{ text: '功能编码', dataIndex: 'funccode', width: 100 },
			{ text: '功能名', dataIndex: 'description', align: 'center', width: 440 }
			],
			bbar: [{
				xtype: 'pagingtoolbar',
				store: storeAppFunction,
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
								var roleid_add = Ext.getCmp('sys_add_btn');
								var roleid_edit = Ext.getCmp('sys_edit_btn');
								var roleid_del = Ext.getCmp('sys_del_btn');
								roleid_add.setVisible(false);
								roleid_edit.setVisible(false);
								roleid_del.setVisible(false);
								Ext.Ajax.request({
									url: '/users/getRoleIdByBtnId',
									params: {
										add: "sys_all_btn", //本页面所有按钮由一个权限管理
										edit: "sys_all_btn",
										del: "sys_all_btn"
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
												grid.addListener('itemdblclick', editOldFunction);
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
			tbar: [{ text: '新增', iconCls: 'Add', handler: addNewFunction, id: 'sys_add_btn' }, "-",
			{ itemId: 'edit_btn', text: '修改', iconCls: 'Applicationformedit', handler: editOldFunction, id: 'sys_edit_btn' }, "-",
			{ itemId: 'del_btn', text: '删除', iconCls: 'Delete', handler: deleteFunction, id: 'sys_del_btn' }
			]
		});

		grid.getSelectionModel().on('selectionchange', function (selModel, selections) {
			grid.down('#del_btn').setDisabled(selections.length == 0);
			grid.down('#edit_btn').setDisabled(selections.length != 1);
		});

	});
})();

/**
 * 添加APP功能名
 */
function addNewFunction() {
	_winNew = Ext.create('Ext.Window', {
		title: '添加APP功能',
		width: 400,
		height: 200,
		autoScroll: true,
		layout: 'vbox',
		defaults: {
			xtype: 'textfield'
		},
		bodyPadding: 5,
		items: [{ id: 's_description', fieldLabel: '功能名', minLength: 2, maxLength: 200, allowBlank: false, width: 300 },
		{ id: 's_funccode', xtype: 'numberfield', fieldLabel: '功能编码', minValue: 1, maxValue: 9999, allowBlank: false, width: 200, value: 1 }],
		buttons: [{
			text: '保存', handler: function () {
				saveAppFunction();
			}
		}, {
			text: '取消', handler: function () {
				_winNew.close();
			}
		}],
		renderTo: Ext.getBody()
	});
	_winNew.show();
}

/**
 * 保存APP功能名
 */
function saveAppFunction() {
	var funccode = Ext.getCmp('s_funccode').getValue();
	var description = Ext.getCmp('s_description').getValue();
	description = Ext.String.trim(description);
	if (description == '') {
		Ext.Msg.alert('错误', '必须填写功能名称');
		return;
	}

	storeAppFunction.add({
		funccode: funccode,
		description: description
	});

	storeAppFunction.sync({
		success: function () {
			storeAppFunction.reload();
			_winNew.close();
		},
		failure: function () {
			Ext.Msg.alert('错误', '添加APP功能名失败');
		}
	});
}

/**
 * 修改APP功能名
 */
function editOldFunction() {
	var selectedData = grid.getSelectionModel().getSelection()[0].data;
	var _id = selectedData.id;
	_winEdit = Ext.create('Ext.Window', {
		title: '修改选择的功能',
		width: 400,
		height: 200,
		autoScroll: true,
		layout: 'vbox',
		defaults: {
			xtype: 'textfield'
		},
		bodyPadding: 5,
		items: [{ id: 's_funccode', xtype: 'numberfield', fieldLabel: '功能编码', minValue: 1, maxValue: 9999, allowBlank: false, width: 300, value: selectedData.funccode },
		{ id: 's_description', fieldLabel: '功能名', minLength: 2, maxLength: 200, allowBlank: false, width: 300, value: selectedData.description }
		],
		buttons: [{
			text: '修改', handler: function () {
				editAppFunctionContent(_id);
			}
		}, {
			text: '取消', handler: function () {
				_winEdit.close();
			}
		}],
		renderTo: Ext.getBody()
	});
	_winEdit.show();
}

/**
 * 修改指定ID的APP功能描述
 * @param {} sid
 */
function editAppFunctionContent(sid) {
	var funccode = Ext.getCmp('s_funccode').getValue();
	var description = Ext.getCmp('s_description').getValue();
	description = Ext.String.trim(description);
	if (description == '') {
		Ext.Msg.alert('错误', '必须填写APP功能名称');
		return;
	}

	var record = storeAppFunction.findRecord('id', sid);
	record.set('funccode', funccode);
	record.set('description', description);

	storeAppFunction.sync({
		success: function () {
			storeAppFunction.reload();
			_winEdit.close();
		},
		failure: function () {
			Ext.Msg.alert('错误', '修改APP功能失败');
		}
	});
}

/**
 * 删除APP功能名
 */
function deleteFunction() {
	var selections = grid.getSelectionModel().getSelection();
	storeAppFunction.remove(selections);
	storeAppFunction.sync({
		success: function () {
			storeAppFunction.reload();
		},
		failure: function () {
			Ext.Msg.alert('错误', '删除APP功能失败');
		}
	});
}