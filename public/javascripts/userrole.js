/**
 * CMS 用户角色管理界面
 */
var PAGE_SIZE = 12;
var PAGEFUNC_SIZE = 100;
var storeUserRole = null;
var storeFunction = null;
var storeRoleFunction = null;
var storeMyFunc = null;
var grid = null;
var listSysFunction = null;
var listRoleFunction = null;
var _winNew = null;
var _winEdit = null;
var right_text = '具有的功能';
var _selRoleId = '';


var parentRole = Ext.create('Ext.data.Store', {
    fields: ['code', 'name'],
    data: []
});

(function () {
    Ext.onReady(function () {
        GetUsersRole();  //填充parentRole数组
        /**
         * 注册角色数据模型
         */
        Ext.regModel('UserRoleContent', {
            fields: [
                { name: 'id', type: 'string' },
                { name: 'rolename', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'parentid', type: 'string' }
            ]
        });

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
         * 注册角色--功能映射数据模型
         */
        Ext.regModel('RoleFunctionMap', {
            fields: [
                { name: 'id', type: 'string' },
                { name: 'roleid', type: 'string' },
                { name: 'funcid', type: 'string' }
            ]
        });

        /**
         * 用户角色数据存储和指定数据模型与代理
         */
        storeUserRole = Ext.create('Ext.data.Store', {
            model: "UserRoleContent",
            autoLoad: true,
            pageSize: PAGE_SIZE,
            remoteSort: false,
            remoteFilter: true,
            proxy: {
                type: "ajax",
                url: "/users/userroleall",
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: '/users/userroleall',
                    create: '/users/adduserrole',
                    update: '/users/edituserrole',
                    destroy: '/users/deleteuserrole'
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
         * APP功能数据存储和指定数据模型与代理
         */
        storeFunction = Ext.create('Ext.data.Store', {
            model: "AppFunctionContent",
            autoLoad: true,
            pageSize: PAGEFUNC_SIZE,
            remoteSort: false,
            remoteFilter: true,
            proxy: {
                type: "ajax",
                url: "/users/appfunctionall",
                actionMethods: {
                    read: 'POST'
                },
                api: {
                    read: '/users/appfunctionall'
                },
                reader: {
                    type: "json",
                    root: "rows",
                    totalProperty: "total"
                }
            }
        });

        storeMyFunc = Ext.create('Ext.data.Store', {
            model: "AppFunctionContent",
            proxy: {
                type: "memory"
            }
        });

        /**
         *用户角色--功能映射数据存储和指定数据模型与代理
         */
        storeRoleFunction = Ext.create('Ext.data.Store', {
            model: "RoleFunctionMap",
            pageSize: PAGEFUNC_SIZE,
            remoteSort: false,
            remoteFilter: true,
            proxy: {
                type: "ajax",
                url: "/users/getmyfunc",
                actionMethods: {
                    create: 'POST',
                    read: 'POST'
                },
                api: {
                    read: '/users/getmyfunc',
                    create: '/users/saverolefunc'
                },
                reader: {
                    type: "json",
                    root: "rows"
                },
                writer: {
                    type: "json"
                }
            }
        });

        /**
         * 建立用户角色显示列表表格，包括顶部工具栏和底部翻页插件
         */
        grid = Ext.create('Ext.grid.Panel', {
            title: '管理用户角色',
            store: storeUserRole,
            width: 350,
            height: 480,
            layout: 'fit',
            columnLines: true,
            renderTo: 'usr_role',
            selMode: {
                injectCheckbox: 0,
                mode: 'SIMPLE',
                checkOnly: true
            },
            selType: 'rowmodel',
            columns: [{ xtype: 'rownumberer', text: '序号', width: 40, align: 'center' },
            { text: '编号', dataIndex: 'id', hidden: true },
            { text: '角色名', dataIndex: 'rolename', align: 'center', width: 100 },
            { text: '角色描述', dataIndex: 'description', align: 'center', width: 200 }
            ],
            bbar: [{
                xtype: 'pagingtoolbar',
                store: storeUserRole,
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
                                var roleid_add = Ext.getCmp('role_add_btn');
                                var roleid_edit = Ext.getCmp('role_edit_btn');
                                var roleid_del = Ext.getCmp('role_del_btn');
                                var role_jia = Ext.getCmp('addbtn');
                                var role_jian = Ext.getCmp('removebtn');
                                var role_cun = Ext.getCmp('savebtn');
                                role_jia.setVisible(false);
                                role_jian.setVisible(false);
                                role_cun.setVisible(false);
                                roleid_add.setVisible(false);
                                roleid_edit.setVisible(false);
                                roleid_del.setVisible(false);
                                Ext.Ajax.request({
                                    url: '/users/getRoleIdByBtnId',
                                    params: {
                                        add: "users_role_btn",
                                        edit: "users_role_btn",
                                        del: "users_role_btn"
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
                                                grid.addListener('itemdblclick', editOldRole);
                                                roleid_edit.setVisible(true);
                                            }
                                            if (joRes[i] == del_id) roleid_del.setVisible(true);
                                        }
                                        if (!roleid_add.hidden && !roleid_edit.hidden && !roleid_del.hidden) {
                                            role_jia.setVisible(true);
                                            role_jian.setVisible(true);
                                            role_cun.setVisible(true);
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
            tbar: [{ text: '新增', iconCls: 'Add', handler: addNewRole, id: 'role_add_btn' }, "-",
            {
                itemId: 'edit_btn',
                text: '修改',
                iconCls: 'Applicationformedit',
                handler: editOldRole,
                id: 'role_edit_btn'
            }, "-",
            { itemId: 'del_btn', text: '删除', iconCls: 'Delete', handler: deleteRole, id: 'role_del_btn' }
            ]
        });

        grid.getSelectionModel().on('selectionchange', function (selModel, selections) {
            grid.down('#del_btn').setDisabled(selections.length == 0);
            grid.down('#edit_btn').setDisabled(selections.length != 1);
            if (selections.length > 0 && listRoleFunction.getSelectionModel().getSelection().length > 0)
                Ext.getCmp('savebtn').setDisabled(false);
            else
                Ext.getCmp('savebtn').setDisabled(true);
            if (selections.length == 1) {
                var sel = selections[0].data;
                right_text = '具有的功能';
                right_text = sel.rolename + right_text;
                listRoleFunction.setTitle(right_text);
                _selRoleId = sel.id;
                fillStoreMem(sel.id);
            }
        });

        /**
         * 建立用户角色--APP功能对应关系表
         */
        listRoleFunction = Ext.create('Ext.ListView', {
            title: right_text,
            renderTo: 'usr_func',
            width: 220,
            height: 480,
            store: storeMyFunc,
            multiSelect: true,
            emptyText: '',
            reserveScrollOffset: true,
            hideHeaders: true,
            columns: [
                { dataIndex: 'description', align: 'center', width: 200 }
            ]
        });
        listRoleFunction.on('selectionchange', function (selModel, selections) {
            Ext.getCmp('removebtn').setDisabled(selections.length == 0);
        });

        storeMyFunc.on('add', function (store, records, index, eOpts) {
            if (store.data.length > 0 && grid.getSelectionModel().getSelection().length > 0)
                Ext.getCmp('savebtn').setDisabled(false);
            else
                Ext.getCmp('savebtn').setDisabled(true);
        });

        storeMyFunc.on('remove', function (store, record, index, isMove, eOpts) {
            if (store.data.length > 0 && grid.getSelectionModel().getSelection().length > 0)
                Ext.getCmp('savebtn').setDisabled(false);
            else
                Ext.getCmp('savebtn').setDisabled(true);
        });

        Ext.create('Ext.Button', {
            id: 'addbtn',
            disabled: true,
            margin: '100 0 50 0',
            iconCls: 'Arrowleft',
            renderTo: 'add',
            handler: function () {
                var sels = listSysFunction.getSelectionModel().getSelection();
                var len = sels.length;
                if (len == 0)
                    return;
                for (var i = 0; i < len; i++) {
                    var seldata = sels[i].data;
                    var inx = storeMyFunc.find('id', seldata.id);
                    if (inx == -1)
                        storeMyFunc.add({ id: seldata.id, funccode: seldata.funccode, description: seldata.description });
                }
                storeMyFunc.sync();
            }
        });

        Ext.create('Ext.Button', {
            id: 'removebtn',
            disabled: true,
            iconCls: 'Arrowright',
            renderTo: 'remove',
            handler: function () {
                var sels = listRoleFunction.getSelectionModel().getSelection();
                var len = sels.length;
                if (len == 0)
                    return;
                storeMyFunc.remove(sels);
                storeMyFunc.sync();
            }
        });

        Ext.create('Ext.Button', {
            id: 'savebtn',
            disabled: true,
            margin: '50 0 0 0',
            iconCls: 'Tick',
            renderTo: 'save',
            handler: function () {
                if (_selRoleId == '') {
                    Ext.MessageBox.alert('警告', '请选择用户角色!');
                }
                var rid = _selRoleId;
                var nCount = storeMyFunc.getCount();
                var pps = new Array();
                for (var i = 0; i < nCount; i++) {
                    fid = storeMyFunc.getAt(i).get('id');
                    pps.push({ roleid: rid, funcid: fid });
                }
                storeRoleFunction.add(pps);

                storeRoleFunction.sync({
                    success: function () {
                        Ext.Msg.alert('成功', '保存用户角色对应的功能完成');
                    },
                    failure: function () {
                        Ext.Msg.alert('错误', '保存用户角色对应的功能失败');
                    }
                });

                /*storeRoleFunction.sync({
                 success:function(){
                 Ext.Msg.alert('成功','保存用户角色对应的功能完成');
                 },
                 failure:function(){
                 Ext.Msg.alert('错误','保存用户角色对应的功能失败');
                 }
                 });*/

            }
        });

        /**
         * 建立显示APP功能总表
         */
        listSysFunction = Ext.create('Ext.ListView', {
            title: 'APP所有功能',
            renderTo: 'sys_func',
            width: 260,
            height: 480,
            store: storeFunction,
            multiSelect: true,
            emptyText: '无数据',
            reserveScrollOffset: true,
            hideHeaders: false,
            columns: [
                { header: '功能编码', dataIndex: 'funccode', align: 'center', width: 80 },
                { header: '功能名称', dataIndex: 'description', align: 'center', width: 170 }
            ],
            bbar: [{
                xtype: 'pagingtoolbar',
                store: storeFunction,
                displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
                emptyMsg: "没有数据",
                beforePageText: "当前页",
                afterPageText: "共{0}页",
                displayInfo: true
            }]
        });

        listSysFunction.on('selectionchange', function (view, selections) {
            Ext.getCmp('addbtn').setDisabled(selections.length == 0);
        });

    });
})();

/**
 * 添加新用户角色
 */
function addNewRole() {
    _winNew = Ext.create('Ext.Window', {
        title: '添加用户角色',
        width: 400,
        height: 200,
        autoScroll: true,
        layout: 'vbox',
        defaults: {
            xtype: 'textfield'
        },
        bodyPadding: 5,
        items: [
            { id: 's_rolename', fieldLabel: '角色名', minLength: 2, maxLength: 100, allowBlank: false, width: 300 },
            { id: 's_description', fieldLabel: '描述', minLength: 2, maxLength: 200, width: 300 }, {
                id: 's_user_role',
                xtype: 'combobox',
                fieldLabel: '父角色',
                store: parentRole,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'code',
                editable: false
            }],
        buttons: [{
            text: '保存', handler: function () {
                saveRole();
            }
        }, {
            text: '取消', handler: function () {
                _winNew.close();
            }
        }],
        renderTo: 'usr_role'
    });
    _winNew.show();
}

/**
 * 保存角色
 */
function saveRole() {
    var rolename = Ext.getCmp('s_rolename').getValue();
    rolename = Ext.String.trim(rolename);
    if (rolename == '') {
        Ext.Msg.alert('错误', '必须填写用户角色名');
        return;
    }

    var description = Ext.getCmp('s_description').getValue();
    description = Ext.String.trim(description);
    var parentrole = Ext.getCmp('s_user_role').getValue();
    storeUserRole.add({
        rolename: rolename,
        description: description,
        parentid: parentrole
    });

    storeUserRole.sync({
        success: function () {
            storeUserRole.reload();
            _winNew.close();
        },
        failure: function () {
            Ext.Msg.alert('错误', '添加用户角色失败');
        }
    });
}

/**
 * 修改指定用户角色
 */
function editOldRole() {
    var selectedData = grid.getSelectionModel().getSelection()[0].data;
    var _id = selectedData.id;
    _winEdit = Ext.create('Ext.Window', {
        title: '修改选择的用户角色',
        width: 400,
        height: 200,
        autoScroll: true,
        layout: 'vbox',
        defaults: {
            xtype: 'textfield'
        },
        bodyPadding: 5,
        items: [{
            id: 's_rolename',
            fieldLabel: '角色名',
            minLength: 2,
            maxLength: 100,
            allowBlank: false,
            width: 300,
            value: selectedData.rolename
        },
        {
            id: 's_description',
            fieldLabel: '描述',
            minLength: 2,
            maxLength: 200,
            width: 300,
            value: selectedData.description
        }, {
            id: 's_user_role',
            xtype: 'combobox',
            fieldLabel: '父角色',
            store: parentRole,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'code',
            editable: false
        }
        ],
        buttons: [{
            text: '修改', handler: function () {
                editRoleContent(_id);
            }
        }, {
            text: '取消', handler: function () {
                _winEdit.close();
            }
        }],
        listeners: {
            afterrender: function () {
                var index = parentRole.find('code', selectedData.parentid);
                Ext.getCmp('s_user_role').select(parentRole.getAt(index));
            }
        },
        renderTo: 'usr_role'
    });
    _winEdit.show();
}

/**
 * 修改指定ID的用户角色
 * @param {} sid
 */
function editRoleContent(sid) {
    var rolename = Ext.getCmp('s_rolename').getValue();
    rolename = Ext.String.trim(rolename);
    if (rolename == '') {
        Ext.Msg.alert('错误', '必须填写用户角色名');
        return;
    }

    var description = Ext.getCmp('s_description').getValue();
    description = Ext.String.trim(description);
    var parentrole = Ext.getCmp('s_user_role').getValue();
    var record = storeUserRole.findRecord('id', sid);
    record.set('rolename', rolename);
    record.set('description', description);
    record.set('parentid', parentrole)

    storeUserRole.sync({
        success: function () {
            storeUserRole.reload();
            _winEdit.close();
        },
        failure: function () {
            Ext.Msg.alert('错误', '修改用户角色失败');
        }
    });
}

/**
 * 删除用户角色
 */
function deleteRole() {
    var selections = grid.getSelectionModel().getSelection();
    storeUserRole.remove(selections);
    storeUserRole.sync({
        success: function () {
            storeUserRole.reload();
        },
        failure: function () {
            Ext.Msg.alert('错误', '删除用户角色失败');
        }
    });
}

/**
 * 填充选中角色对应功能名存储
 * @param {} _roleid
 */
function fillStoreMem(_roleid) {
    storeMyFunc.removeAll();
    Ext.Ajax.request({
        url: '/users/getmyfunc',
        params: { roleid: _roleid },
        method: 'POST',
        success: function (response, options) {
            var joRes = Ext.JSON.decode(response.responseText);
            if (joRes.rows.length > 0) {
                joRes.rows.forEach(function (_row, index, array) {
                    storeMyFunc.add(_row);
                });
            }
        },
        failure: function (response, options) {
            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误码：' + response.status);
        }
    });
}

/*
 * 拿到用户组数据
 * */
function GetUsersRole() {
    Ext.Ajax.request({
        url: '/users/userrolealldata',
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
                parentRole.add({ code: "null", name: "没有父角色" });
                for (var i = 0; i < joRes.rows.length; i++) {
                    parentRole.add({ code: joRes.rows[i].id, name: joRes.rows[i].rolename });
                    /* data.push(["code :"+joRes.rows[i].id,"name :"+joRes.rows[i].rolename]);*/
                }
                parentRole.sync();
                /* roleStore.data. =data;*/
            }
        },
        failure: function (response, options) {
            Ext.MessageBox.alert('失败', '请求失败,错误码：' + response.status);
        }
    });
}