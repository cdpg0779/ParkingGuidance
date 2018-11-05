/**
 * 用户单位列表操作界面
 */
var PAGE_SIZE = 12;
var storeUnit = null;
var grid = null;
var _winNew = null;
var _winEdit = null;



var unitStore = Ext.create('Ext.data.Store', {
    fields: ['code', 'name'],
    data: [
    ]
});


var userStore = Ext.create('Ext.data.Store', {
    fields: ['code', 'name'],
    data: [{ 'code': '0', 'name': '无' }
    ]
});





(function () {
    Ext.onReady(function () {
        GetAllUser();
        /*
         * 注册用户单位数据模型
         * */
        Ext.regModel('unitContent', {
            fields: [
                { name: 'id', type: 'string' },
                { name: 'deptmentName', type: 'string' },
                { name: 'sortorder', type: 'int' },
                { name: 'charger', type: 'string' },
                { name: 'chargerName', type: 'string' }
            ]
        });
        /**
         * 建立用户单位存储和指定数据模型与代理
         */
        storeUnit = Ext.create('Ext.data.Store', {
            model: "unitContent",
            autoLoad: true,
            pageSize: PAGE_SIZE,
            remoteSort: false,
            remoteFilter: true,
            proxy: {
                type: "ajax",
                url: "/users/unitall",
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: '/users/unitall',
                    create: '/users/addunit',
                    update: '/users/editunit',
                    destroy: '/users/deleteunit'
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
            title: '单位管理',
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
                        storeUnit.reload({
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
            store: storeUnit,
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
            { text: '部门名称', dataIndex: 'deptmentName', align: 'center', width: 300 },
            {
                text: '负责人', dataIndex: 'chargerName', align: 'center', width: 300,
            },
            ],
            bbar: [{
                xtype: 'pagingtoolbar',
                store: storeUnit,
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
                                var roleid_add = Ext.getCmp('unit_add_btn');
                                var roleid_edit = Ext.getCmp('unit_edit_btn');
                                var roleid_del = Ext.getCmp('unit_del_btn');
                                /*现将所有的按钮隐藏，然后根据权限来打开按钮*/
                                roleid_add.setVisible(false);
                                roleid_edit.setVisible(false);
                                roleid_del.setVisible(false);
                                Ext.Ajax.request({
                                    url: '/users/getRoleIdByBtnId',
                                    params: {
                                        add: "unit_all_btn",
                                        edit: "unit_all_btn",
                                        del: "unit_all_btn"
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
                                                grid.addListener('itemdblclick', editOldstoreUnit);
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
            tbar: [{ text: '新增', iconCls: 'Add', handler: addNewstoreUnit, id: 'unit_add_btn' }, "-",
            {
                itemId: 'edit_btn',
                text: '修改',
                iconCls: 'Applicationformedit',
                handler: editOldstoreUnit,
                id: 'unit_edit_btn'
            }, "-",
            { itemId: 'del_btn', text: '删除', iconCls: 'Delete', handler: deletestoreUnit, id: 'unit_del_btn' }
            ]
        });

        grid.getSelectionModel().on('selectionchange', function (selModel, selections) {
            grid.down('#del_btn').setDisabled(selections.length == 0);
            grid.down('#edit_btn').setDisabled(selections.length != 1);
        });
    });
})();
/**
 * 创建显示用户部门录入窗口
 */
function addNewstoreUnit() {
    _winNew = Ext.create('Ext.Window', {
        title: '添加公司部门',
        width: 800,
        height: 150,
        layout: 'vbox',
        defaults: {
            xtype: 'textfield'
        },
        bodyPadding: 5,
        items: [{ id: 's_deptment', fieldLabel: '部门名称', minLength: 2, maxLength: 200, allowBlank: false, width: 700 },
        {
            id: 's_charger',
            xtype: 'combobox',
            fieldLabel: '部门负责人',
            store: userStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'code',
            editable: false
        }
        ],
        buttons: [{
            text: '保存', handler: function () {
                saveUsers();
            }
        }, {
            text: '取消', handler: function () {
                _winNew.close();
            }
        }],
        listeners: {
            afterrender: function () {
                Ext.getCmp('s_charger').select(userStore.getAt(0));
            }
        },
        renderTo: Ext.getBody()
    });
    _winNew.show();
}

/*
 * 保存用户
 * */
function saveUsers() {
    var deptment = Ext.getCmp('s_deptment').getValue();
    deptment = Ext.String.trim(deptment);
    if (deptment == '') {
        Ext.Msg.alert('错误', '必须填写部门名');
        return;
    }
    var charger = Ext.getCmp('s_charger').getValue();
    var model = storeUnit.findRecord('deptmentName', deptment);
    if (model != null) {
        Ext.Msg.alert('错误', '已存在该部门，请重新填写部门名称');
        return;
    }
    storeUnit.add({
        deptmentName: deptment,
        charger: charger
    });
    storeUnit.sync({
        success: function () {
            storeUnit.reload();
            _winNew.close();
        },
        failure: function () {
            Ext.Msg.alert('错误', '添加新部门失败');
        }
    });
}


/*
 * 修改
 * */
function editOldstoreUnit() {
    var selectedData = grid.getSelectionModel().getSelection()[0].data;
    var _id = selectedData.id;
    _winEdit = Ext.create('Ext.Window', {
        title: '修改选择的部门',
        width: 800,
        height: 150,
        layout: 'vbox',
        defaults: {
            xtype: 'textfield'
        },
        bodyPadding: 5,
        items: [{ id: 's_type', minLength: 2, maxLength: 200, allowBlank: false, width: 700, value: "修改", hidden: true },
        {
            id: 's_deptment',
            fieldLabel: '部门名称',
            minLength: 2,
            maxLength: 200,
            allowBlank: false,
            width: 700,
            value: selectedData.deptmentName
        },
        {
            id: 's_charger',
            xtype: 'combobox',
            fieldLabel: '部门负责人',
            store: userStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'code',
            editable: false
        }
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
                var index = userStore.find('code', selectedData.charger);
                Ext.getCmp('s_charger').select(userStore.getAt(index));
            }
        },
        renderTo: Ext.getBody()
    });
    _winEdit.show();
}


function editUser(sid) {
    var deptment = Ext.getCmp('s_deptment').getValue();
    deptment = Ext.String.trim(deptment);
    if (deptment == '') {
        Ext.Msg.alert('错误', '必须填写部门名');
        return;
    }
    var charger = Ext.getCmp('s_charger').getValue();
    var record = storeUnit.findRecord('id', sid);
    record.set('deptmentName', deptment);
    record.set('charger', charger);
    storeUnit.sync({
        success: function () {
            storeUnit.reload();
            _winEdit.close();
        },
        failure: function () {
            storeUnit.reload();
            Ext.Msg.alert('错误', '修改部门信息失败');
        }
    });
}


/*
 * 删除选定的用户
 * */
function deletestoreUnit() {
    var selections = grid.getSelectionModel().getSelection();
    storeUnit.remove(selections);
    storeUnit.sync({
        success: function () {
            storeUnit.reload();
            _winEdit.close();
        },
        failure: function () {
            Ext.Msg.alert('错误', '删除部门信息失败');
        }
    });
}



/*
 * 拿到单位数据
 * */
function GetUnit() {
    Ext.Ajax.request({
        url: 'users/unitalldata',
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
                for (var i = 0; i < joRes.rows.length; i++) {
                    unitStore.add({ code: joRes.rows[i].id, name: joRes.rows[i].unit });
                    /* data.push(["code :"+joRes.rows[i].id,"name :"+joRes.rows[i].rolename]);*/
                }
                unitStore.sync();
                /* roleStore.data. =data;*/
            }
        },
        failure: function (response, options) {
            Ext.MessageBox.alert('失败', '请求失败,错误码：' + response.status);
        }
    });
}

/*
 * 拿到人员
 * */
function GetAllUser() {
    Ext.Ajax.request({
        url: '/users/getuserall',
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
                for (var i = 0; i < joRes.rows.length; i++) {
                    userStore.add({ code: joRes.rows[i].id, name: joRes.rows[i].name });
                    /* data.push(["code :"+joRes.rows[i].id,"name :"+joRes.rows[i].rolename]);*/
                }
                userStore.sync();
                /* roleStore.data. =data;*/
            }
        },
        failure: function (response, options) {
            Ext.MessageBox.alert('失败', '请求失败,错误码：' + response.status);
        }
    });
}


