/**
 * 用户账户列表操作界面
 */
var PAGE_SIZE = 12;
var storeUsers = null;
var grid = null;
var _winNew = null;
var _winEdit = null;

/*
 * 单位下拉列表
 * */

var deptmentStore = Ext.create('Ext.data.Store', {
    fields: ['code', 'name'],
    data: [
    ]
});

/*
 * 领导下拉列表
 * */

var chargerStore = Ext.create('Ext.data.Store', {
    fields: ['code', 'name'],
    data: [{ "code": "刘兵", "name": "刘兵" },
    { "code": "杜进有", "name": "杜进有" },
    { "code": "易传斌", "name": "易传斌" },
    { "code": "王宏", "name": "王宏" },
    { "code": "涂智", "name": "涂智" },
    { "code": "田贵文", "name": "田贵文" },
    { "code": "王增勇", "name": "王增勇" },
    { "code": "郭海涛", "name": "郭海涛" },
    { "code": "张子祥", "name": "张子祥" }
    ]
});


var levelgroupStore = Ext.create('Ext.data.Store', {
    fields: ['code', 'name'],
    data: [{ "code": "领导组", "name": "领导组" },
    { "code": "机关处室组", "name": "机关处室组" },
    { "code": "区县交通局", "name": "区县交通局" }
    ]
});

/*
 * 职位下拉列表
 * */

var dutyStore = Ext.create('Ext.data.Store', {
    fields: ['code', 'name'],
    data: [
        { "code": "委领导", "name": "委领导" },
        { "code": "机关党委书记", "name": "机关党委书记" },
        { "code": "院长", "name": "院长" },
        { "code": "处长", "name": "处长" },
        { "code": "副主任", "name": "副主任" },
        { "code": "巡视员", "name": "巡视员" },
        { "code": "总队长", "name": "总队长" }
    ]
});

/*
 * 用户组下拉列表
 * */

var roleStore = Ext.create('Ext.data.Store', {
    fields: ['code', 'name'],
    data: []
});


(function () {
    Ext.onReady(function () {
        GetUsersRole();
        Getdeptment();
        /*
         * 注册用户账户数据模型
         * */
        Ext.regModel('usersContent', {
            fields: [
                { name: 'id', type: 'string' },
                { name: 'loginname', type: 'string' },
                { name: 'password', type: 'string' },
                { name: 'name', type: 'string' },
                { name: 'telphone', type: 'string' },
                { name: 'deptment', type: 'string' },
                { name: 'deptmentid', type: 'string' },
                { name: 'charger', type: 'string' },
                { name: 'sigin', type: 'int' },
                { name: 'role', type: 'string' },
                { name: 'type', type: 'string' },
                { name: 'sortorder', type: 'string' },
            ]
        });
        /**
         * 建立通知公告存储和指定数据模型与代理
         */
        storeUsers = Ext.create('Ext.data.Store', {
            model: "usersContent",
            autoLoad: true,
            pageSize: PAGE_SIZE,
            remoteSort: false,
            remoteFilter: true,
            proxy: {
                type: "ajax",
                url: "/users/usersall",
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: '/users/usersall',
                    create: '/users/addusers',
                    update: '/users/editusers',
                    destroy: '/users/deleteusers'
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
            title: '用户账户管理',
            width: 970,
            height: 80,
            bodyPadding: 8,
            layout: 'hbox',
            items: [{ id: 'btime', xtype: 'datefield', fieldLabel: '开始日期', format: 'Y-m-d' },
            { id: 'etime', xtype: 'datefield', fieldLabel: '结束日期', format: 'Y-m-d', margin: '0 0 0 8' },
            { id: 'keyword', xtype: 'textfield', fieldLabel: '关键字', margin: '0 8 0 8' },
            {
                id: 'searchbtn',
                xtype: 'button',
                text: '搜索',
                iconCls: 'Applicationformmagnify',
                handler: function () {
                    var btime = Ext.getCmp('btime').getRawValue();
                    if (btime != '')
                        btime += ' 00:00:00';
                    else
                        btime = '';
                    var etime = Ext.getCmp('etime').getRawValue();
                    if (etime != '')
                        etime += ' 23:59:59';
                    else
                        etime = '';
                    var keyword = Ext.getCmp('keyword').getValue();
                    storeUsers.reload({
                        params: {
                            begintime: btime,
                            endtime: etime,
                            keywordmatch: keyword
                        }
                    });
                }
            }],
            renderTo: Ext.getBody()
        });

        /**
         * 建立通知公告显示列表表格，包括顶部工具栏和底部翻页插件
         */
        grid = Ext.create('Ext.grid.Panel', {
            xtype: 'grid',
            store: storeUsers,
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
            { text: '登录名', dataIndex: 'loginname', align: 'center', width: 200 },
            { text: '姓名', dataIndex: 'name', width: 120, align: 'center' },
            { text: '手机号码', dataIndex: 'telphone', width: 200, align: 'center' },
            { text: '部门', dataIndex: 'deptment' }],

            bbar: [{
                xtype: 'pagingtoolbar',
                store: storeUsers,
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
                                var roleid_add = Ext.getCmp('users_add_btn');
                                var roleid_edit = Ext.getCmp('users_edit_btn');
                                var roleid_del = Ext.getCmp('users_del_btn');
                                var roleid_role = Ext.getCmp('users_role_btn');
                                /*现将所有的按钮隐藏，然后根据权限来打开按钮*/
                                roleid_add.setVisible(false);
                                roleid_edit.setVisible(false);
                                roleid_del.setVisible(false);
                                roleid_role.setVisible(false);
                                Ext.Ajax.request({
                                    url: '/users/getRoleIdByBtnId',
                                    params: {
                                        add: "users_add_btn",
                                        edit: "users_edit_btn",
                                        del: "users_del_btn",
                                        role: "users_role_btn"
                                    },
                                    method: 'POST',
                                    success: function (r, o) {
                                        var role = Ext.JSON.decode(r.responseText ? r.responseText : "{}");
                                        var add_id = role.add;
                                        var edit_id = role.edit;
                                        var del_id = role.del;
                                        var role_id = role.role;
                                        for (var i = 0; i < joRes.length; i++) {
                                            if (joRes[i] == add_id) roleid_add.setVisible(true);
                                            if (joRes[i] == edit_id) {
                                                grid.addListener('itemdblclick', editOldstoreUsers);
                                                roleid_edit.setVisible(true);
                                            }
                                            if (joRes[i] == del_id) roleid_del.setVisible(true);
                                            if (joRes[i] == role_id) roleid_role.setVisible(true);
                                        }
                                        var selections = e.getSelectionModel().getSelection();
                                        e.down('#del_btn').setDisabled(selections.length == 0);
                                        e.down('#edit_btn').setDisabled(selections.length != 1);
                                        e.down('#edit_btn_role').setDisabled(selections.length != 1);
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
            tbar: [{ text: '新增', iconCls: 'Add', handler: addNewstoreUsers, id: 'users_add_btn' }, "-",
            {
                itemId: 'edit_btn',
                text: '修改',
                iconCls: 'Applicationformedit',
                handler: editOldstoreUsers,
                id: 'users_edit_btn'
            }, "-",
            { itemId: 'del_btn', text: '删除', iconCls: 'Delete', handler: deletestoreUsers, id: 'users_del_btn' },
            {
                itemId: 'edit_btn_role',
                text: '用户角色',
                iconCls: 'Applicationformedit',
                handler: editusersrole,
                id: 'users_role_btn'
            }
                , '-',
            { text: '测试手机接口', iconCls: 'Delete', handler: testmob }
            ]
        });

        grid.getSelectionModel().on('selectionchange', function (selModel, selections) {
            grid.down('#del_btn').setDisabled(selections.length == 0);
            grid.down('#edit_btn').setDisabled(selections.length != 1);
            grid.down('#edit_btn_role').setDisabled(selections.length != 1);
        });
    });
})();
/**
 * 创建显示用户账户录入窗口
 */
function addNewstoreUsers() {
    _winNew = Ext.create('Ext.Window', {
        title: '添加用户账户',
        width: 800,
        height: 400,
        layout: 'vbox',
        defaults: {
            xtype: 'textfield'
        },
        bodyPadding: 5,
        items: [{ id: 's_loginname', fieldLabel: '登录名', minLength: 2, maxLength: 200, allowBlank: false, width: 700 },
        { id: 's_password', fieldLabel: '密码', minLength: 2, maxLength: 100, allowBlank: true, width: 600 },
        { id: 's_name', fieldLabel: '姓名', minLength: 2, maxLength: 100, allowBlank: true, width: 600 },
        {
            id: 's_sortorder',
            xtype: 'numberfield',
            fieldLabel: '用户排序',
            width: 600,
            allowBlank: false,
            allowNegative: false,
            allowDecimals: false,
            value: 1
        },
        { id: 's_telphone', fieldLabel: '手机号码', minLength: 2, maxLength: 100, allowBlank: true, width: 600 },
        {
            id: 's_user_role',
            xtype: 'combobox',
            fieldLabel: '用户角色',
            store: roleStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'code',
            editable: false
        },
        {
            id: 's_deptment',
            xtype: 'combobox',
            fieldLabel: '单位',
            store: deptmentStore,
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
                Ext.getCmp('s_user_role').select(roleStore.getAt(0));
                Ext.getCmp('s_deptment').select(deptmentStore.getAt(0));
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
    var loginname = Ext.getCmp('s_loginname').getValue();
    loginname = Ext.String.trim(loginname);
    if (loginname == '') {
        Ext.Msg.alert('错误', '必须填写登录名');
        return;
    }
    var model = storeUsers.findRecord('loginname', loginname);
    if (model != null) {
        Ext.Msg.alert('错误', '已存在该登录名，请重新填写登录名');
        return;
    }
    var password = Ext.getCmp('s_password').getValue();
    if (password == '') {
        Ext.Msg.alert('错误', '必须填写密码');
        return;
    }
    var name = Ext.getCmp('s_name').getValue();
    name = Ext.String.trim(name);
    if (name == '') {
        Ext.Msg.alert('错误', '必须填写姓名');
        return;
    }
    var role = Ext.getCmp('s_user_role').getValue();
    if (role == '') {
        Ext.Msg.alert('错误', '必须选择用户角色');
        return;
    }
    var deptment = Ext.getCmp('s_deptment').getValue();
    var telphone = Ext.getCmp('s_telphone').getValue();
    var sortorder = Ext.getCmp('s_sortorder').getValue();

    storeUsers.add({
        loginname: loginname,
        password: password,
        name: name,
        role: role,
        deptment: deptment,
        telphone: telphone,
        sortorder: sortorder
    });
    storeUsers.sync({
        success: function () {
            storeUsers.reload();
            _winNew.close();
        },
        failure: function () {
            Ext.Msg.alert('错误', '添加新用户失败');
        }
    });
}


/*
 * 修改
 * */
function editOldstoreUsers() {
    var selectedData = grid.getSelectionModel().getSelection()[0];
    selectedData = grid.getStore().getById(selectedData.get('id')).data;
    var _id = selectedData.id;
    _winEdit = Ext.create('Ext.Window', {
        title: '修改选择的用户',
        width: 800,
        height: 400,
        layout: 'vbox',
        defaults: {
            xtype: 'textfield'
        },
        bodyPadding: 5,
        items: [{ id: 's_type', minLength: 2, maxLength: 200, allowBlank: false, width: 700, value: "修改", hidden: true },
        {
            id: 's_loginname',
            fieldLabel: '登录名',
            minLength: 2,
            maxLength: 200,
            allowBlank: false,
            width: 700,
            value: selectedData.loginname
        },
        {
            id: 's_password',
            fieldLabel: '密码',
            minLength: 2,
            maxLength: 100,
            allowBlank: true,
            width: 600,
            value: selectedData.password
        },
        {
            id: 's_name',
            fieldLabel: '姓名',
            minLength: 2,
            maxLength: 100,
            allowBlank: true,
            width: 600,
            value: selectedData.name
        },
        {
            id: 's_sortorder',
            xtype: 'numberfield',
            fieldLabel: '用户排序',
            width: 600,
            allowBlank: false,
            allowNegative: false,
            allowDecimals: false,
            value: selectedData.sortorder
        },
        {
            id: 's_telphone',
            fieldLabel: '手机号码',
            minLength: 2,
            maxLength: 100,
            allowBlank: true,
            width: 600,
            value: selectedData.telphone
        },

        {
            id: 's_user_role',
            xtype: 'combobox',
            fieldLabel: '用户角色',
            store: roleStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'code',
            editable: false
        },

        {
            id: 's_deptment',
            xtype: 'combobox',
            fieldLabel: '部门',
            store: deptmentStore,
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
                var index = roleStore.find('code', selectedData.role);
                Ext.getCmp('s_user_role').select(roleStore.getAt(index));
                index = deptmentStore.find('code', selectedData.deptmentid);
                Ext.getCmp('s_deptment').select(deptmentStore.getAt(index));
            }
        },
        renderTo: Ext.getBody()
    });
    _winEdit.show();
}


function editUser(sid) {
    var loginname = Ext.getCmp('s_loginname').getValue();
    loginname = Ext.String.trim(loginname);
    if (loginname == '') {
        Ext.Msg.alert('错误', '必须填写登录名');
        return;
    }
    var password = Ext.getCmp('s_password').getValue();
    if (password == '') {
        Ext.Msg.alert('错误', '必须填写密码');
        return;
    }
    var name = Ext.getCmp('s_name').getValue();
    name = Ext.String.trim(name);
    if (name == '') {
        Ext.Msg.alert('错误', '必须填写姓名');
        return;
    }
    var role = Ext.getCmp('s_user_role').getValue();
    if (role == '') {
        Ext.Msg.alert('错误', '必须选择用户角色');
        return;
    }
    var deptment = Ext.getCmp('s_deptment').getValue();
    var telphone = Ext.getCmp('s_telphone').getValue();
    var type = Ext.getCmp('s_type').getValue();
    var sortorder = Ext.getCmp('s_sortorder').getValue();
    var record = storeUsers.findRecord('id', sid);
    record.set('loginname', loginname);
    record.set('password', password);
    record.set('name', name);
    record.set('deptment', deptment);
    record.set('role', role);
    record.set('telphone', telphone);
    // record.set('type', type);
    record.set('sortorder', sortorder);
    storeUsers.sync({
        success: function () {
            storeUsers.reload();
            _winEdit.close();
        },
        failure: function () {
            storeUsers.reload();
            Ext.Msg.alert('错误', '修改用户信息失败');
        }
    });
}


/*
 * 删除选定的用户
 * */
function deletestoreUsers() {
    var selections = grid.getSelectionModel().getSelection();
    storeUsers.remove(selections);
    storeUsers.sync({
        success: function () {
            storeUsers.reload();
            _winEdit.close();
        },
        failure: function () {
            Ext.Msg.alert('错误', '删除用户信息失败');
        }
    });
}


function editusersrole() {
    var selectedData = grid.getSelectionModel().getSelection()[0].data;
    var _id = selectedData.id;
    _winEdit = Ext.create('Ext.Window', {
        title: '设置用户角色',
        width: 400,
        height: 130,
        layout: 'vbox',
        defaults: {
            xtype: 'textfield'
        },
        bodyPadding: 5,
        items: [{
            id: 's_type',
            minLength: 2,
            maxLength: 200,
            allowBlank: false,
            width: 700,
            value: "用户角色",
            hidden: true
        },
        {
            id: 's_loginname',
            fieldLabel: '登录名',
            minLength: 2,
            maxLength: 200,
            allowBlank: false,
            width: 700,
            value: selectedData.loginname,
            hidden: true
        },
        {
            id: 's_password',
            fieldLabel: '密码',
            minLength: 2,
            maxLength: 100,
            allowBlank: true,
            width: 600,
            value: selectedData.password,
            hidden: true
        },
        {
            id: 's_name',
            fieldLabel: '姓名',
            minLength: 2,
            maxLength: 100,
            allowBlank: true,
            width: 600,
            value: selectedData.name,
            hidden: true
        },
        {
            id: 's_sortorder',
            xtype: 'numberfield',
            fieldLabel: '用户排序',
            width: 600,
            allowBlank: false,
            allowNegative: false,
            allowDecimals: false,
            value: selectedData.sortorder,
            hidden: true
        },
        {
            id: 's_telphone',
            fieldLabel: '手机号码',
            minLength: 2,
            maxLength: 100,
            allowBlank: true,
            width: 600,
            value: selectedData.telphone,
            hidden: true
        },
        {
            id: 's_user_role',
            xtype: 'combobox',
            fieldLabel: '用户角色',
            store: roleStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'code',
            editable: false
        },
        {
            id: 's_deptment',
            xtype: 'combobox',
            fieldLabel: '部门',
            store: deptmentStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'code',
            editable: false,
            hidden: true
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
                var index = roleStore.find('code', selectedData.role);
                Ext.getCmp('s_user_role').select(roleStore.getAt(index));
                index = deptmentStore.find('code', selectedData.deptment);
                Ext.getCmp('s_deptment').select(deptmentStore.getAt(index));

            }
        },
        renderTo: Ext.getBody()
    });
    _winEdit.show();
}

/*
 * 拿到用户组数据
 * */
function GetUsersRole() {
    Ext.Ajax.request({
        url: 'users/userrolealldata',
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
                    roleStore.add({ code: joRes.rows[i].id, name: joRes.rows[i].rolename });
                    /* data.push(["code :"+joRes.rows[i].id,"name :"+joRes.rows[i].rolename]);*/
                }
                roleStore.sync();
                /* roleStore.data. =data;*/
            }
        },
        failure: function (response, options) {
            Ext.MessageBox.alert('失败', '请求失败,错误码：' + response.status);
        }
    });
}


/*
 * 测试手机接口
 * */
function testmob() {
    Ext.Ajax.request({
        /* url: '/appif/supervisordetail',
         params: {start:0,pagesize:12,userid:'17866d8840497bc46ef2d7ccc273aa7f'},*/
        url: '/appService/GetDateList',
        params: { staffid: '8930a9366cb0c32117169919f98c55a5', userid: '81b10a007e3b1b0126feb1c5d36bc6c3', attachmentid: '3bf44318652665b479f184983324f4a7', mediatype: '0', uri: 'upload/81b10a007e3b1b0126feb1c5d36bc6c31495851668778-1495851794000.jpg', participants: '32c3c4a14e3216fb2c17c733baa53107,32fbbec6b760aaf78001ab1664c97695,3ac2ac15672830fa477b8789f66269bf', description_supplement: 'dasdadsasdt_task_supplementdasdasdasd', log: 1, start: 0, pagesize: 10 },
        method: 'POST',
        success: function (response, options) {
            var joRes = Ext.JSON.decode(response.responseText);
            joRes = eval(joRes);
            var data = [];
            if (joRes) {
                for (var i = 0; i < joRes.rows.length; i++) {
                    var row = joRes.rows[i];
                    data.push(row);
                }
            }
        },
        failure: function (response, options) {
            Ext.MessageBox.alert('失败', '请求失败,错误码：' + response.status);
        }
    });
}


/*
 * 拿到单位数据
 * */
function Getdeptment() {
    Ext.Ajax.request({
        url: 'users/deptmentalldata',
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
                    deptmentStore.add({ code: joRes.rows[i].id, name: joRes.rows[i].deptment });
                    /* data.push(["code :"+joRes.rows[i].id,"name :"+joRes.rows[i].rolename]);*/
                }
                deptmentStore.sync();
                /* roleStore.data. =data;*/
            }
        },
        failure: function (response, options) {
            Ext.MessageBox.alert('失败', '请求失败,错误码：' + response.status);
        }
    });
}
