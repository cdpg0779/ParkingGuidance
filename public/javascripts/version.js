/**
 *APP版本管理列表操作界面
 */

var PAGE_SIZE = 12;
var storeVersion = null;
var grid = null;
var _winNew = null;
var _winEdit = null;


var platformStore = Ext.create('Ext.data.Store', {
    fields: ['code', 'name'],
    data: [
        { "code": "Android", "name": "Android" },
        { "code": "Apple", "name": "Apple" }
    ]
});

(function () {
    Ext.onReady(function () {
        /**
         * 注册APP版本数据模型
         */
        Ext.regModel('VersionContent', {
            fields: [
                { name: 'id', type: 'string' },
                { name: 'version', type: 'string' },
                { name: 'downloadurl', type: 'string' },
                { name: 'updatetime', type: 'string' },
                { name: 'createtime', type: 'string' },
                { name: 'platform', type: 'string' }
            ]
        });

        /**
         * 建立APP版本存储和指定数据模型与代理
         */
        storeVersion = Ext.create('Ext.data.Store', {
            model: "VersionContent",
            autoLoad: true,
            pageSize: PAGE_SIZE,
            remoteSort: false,
            remoteFilter: true,
            proxy: {
                type: "ajax",
                url: "/version/versionall",
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: '/version/versionall',
                    create: '/version/addversion',
                    update: '/version/editversion',
                    destroy: '/version/deleteversion'
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
         * 通知APP版本查询面板
         */
        Ext.create('Ext.Panel', {
            title: 'APP版本管理',
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
                    storeVersion.reload({
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
         * 建立APP版本显示列表表格，包括顶部工具栏和底部翻页插件
         */
        grid = Ext.create('Ext.grid.Panel', {
            id: 'grid_id',
            xtype: 'grid',
            store: storeVersion,
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
            { text: 'ID', dataIndex: 'id', hidden: true },
            { text: '版本号', dataIndex: 'version', align: 'center', width: 350 },
            { text: 'APP平台', dataIndex: 'platform', align: 'center', width: 100 },
            { text: '更新时间', dataIndex: 'updatetime', align: 'center', width: 100 },
            { text: '下载地址', dataIndex: 'downloadurl', align: 'center', width: 350 }
            ],
            bbar: [{
                xtype: 'pagingtoolbar',
                store: storeVersion,
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
                                var roleid_add = Ext.getCmp('version_add_btn');
                                var roleid_edit = Ext.getCmp('version_edit_btn');
                                var roleid_del = Ext.getCmp('version_del_btn');
                                roleid_add.setVisible(false);
                                roleid_edit.setVisible(false);
                                roleid_del.setVisible(false);
                                Ext.Ajax.request({
                                    url: '/users/getRoleIdByBtnId',
                                    params: {
                                        add: "app_all_btn",
                                        edit: "app_all_btn",
                                        del: "app_all_btn"
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
                                                grid.addListener('itemdblclick', editOldversion);
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
            tbar: [{
                text: '新增',
                iconCls: 'Add',
                handler: addNewversion,
                id: 'version_add_btn'
            }, "-",
            {
                itemId: 'edit_btn',
                text: '修改',
                iconCls: 'Applicationformedit',
                handler: editOldversion,
                id: 'version_edit_btn'
            }, "-",
            {
                itemId: 'del_btn',
                text: '删除',
                iconCls: 'Delete',
                handler: deleteversion,
                id: 'version_del_btn'
            }
            ]
        });

        grid.getSelectionModel().on('selectionchange', function (selModel, selections) {
            grid.down('#del_btn').setDisabled(selections.length == 0);
            grid.down('#edit_btn').setDisabled(selections.length != 1);
        });
    });
})();


/*//创建数据导入窗体
 createImportForm = function (config) {
 _winNew = Ext.create("Ext.form.Panel", {
 title: '本地File实例',
 renderTo: Ext.getBody(),
 bodyPadding: '5 5 5 5',
 height: 100,
 width: 270,
 frame: true,
 items: [{
 xtype: 'filefield',
 name: 'uploadfile',
 fieldLabel: '照片',
 labelWidth: 50,
 msgTarget: 'side',
 allowBlank: false,
 anchor: '98%',
 buttonText: '请选中文件',
 fileupload: true
 }],
 buttons: [{
 text: '提交',
 handler: function () {
 this.up("form").getForm().submit({
 url: '/version/addversion',
 waitMsg: '文件上传中',//提示等待信息
 success: function (form, action) {
 storeVersion.reload();
 _winNew.close();
 Ext.Msg.alert("success", "文件上传成功");
 }
 });
 }
 }]
 });

 _winNew.show();
 };*/


function addNewversion() {


    _winNew = Ext.create("Ext.form.Panel", {
        title: '上传APP包',
        //renderTo: Ext.getBody(),
        bodyPadding: '5 5 5 5',
        height: 150,
        width: 270,
        frame: true,
        closeAction: 'destroy',
        items: [{
            xtype: 'numberfield',
            id: 'version',
            name: 'version',
            fieldLabel: '版本号',
            labelWidth: 50,
            minLength: 1,
            maxLength: 200,
            width: 220,
            value: 0,
            allowBlank: false,
            allowNegative: false,
            allowDecimals: false
        },
        {
            xtype: 'filefield',
            name: 'uploadfile',
            fieldLabel: '文件',
            labelWidth: 50,
            msgTarget: 'side',
            allowBlank: false,
            anchor: '98%',
            buttonText: '请选择文件',
            fileupload: true
        }],
        buttons: [{
            text: '提交',
            handler: function () {
                var formmodel = this.up("form").getForm();
                if (formmodel.isValid()) {
                    formmodel.submit({
                        url: '/version/addversion',
                        waitMsg: '文件上传中',//提示等待信息
                        success: function (form, action) {
                            storeVersion.reload();
                            _winNew.close();
                            Ext.Msg.alert("success", "文件上传成功");
                        }
                    });
                }

            }
        }, {
            text: '关闭',
            handler: function () {
                _winNew.close();
            }
        }]
    });
    _winNew.render('test');
    _winNew.show();
}

function editOldversion() {
    var selectedData = grid.getSelectionModel().getSelection()[0].data;
    var _id = selectedData.id;
    _winEdit = Ext.create('Ext.Window', {
        title: '修改APP版本信息',
        width: 400,
        height: 200,
        layout: 'vbox',
        defaults: {
            xtype: 'textfield'
        },
        bodyPadding: 5,
        items: [{
            id: 's_version',
            fieldLabel: '版本号',
            minLength: 2,
            maxLength: 100,
            allowBlank: true,
            width: 600,
            value: selectedData.version
        },
        {
            id: 's_downloadurl',
            fieldLabel: 'APP地址',
            minLength: 2,
            maxLength: 100,
            allowBlank: true,
            width: 600,
            value: selectedData.downloadurl
        },
        {
            id: 's_platform',
            xtype: 'combobox',
            fieldLabel: 'APP平台',
            store: platformStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'code',
            editable: false
        }
        ],
        buttons: [{
            text: '修改', handler: function () {
                editVersion(_id);
            }
        }, {
            text: '取消', handler: function () {
                _winEdit.close();
            }
        }],
        listeners: {
            afterrender: function () {
                var index = platformStore.find('code', selectedData.platform);
                Ext.getCmp('s_platform').select(platformStore.getAt(index));
            }
        },
        renderTo: Ext.getBody()
    });

    _winEdit.show();
}


function editVersion(id) {
    var version = Ext.getCmp('s_version').getValue();
    version = Ext.String.trim(version);
    if (version == '') {
        Ext.Msg.alert('错误', '必须填写版本号');
        return;
    }
    var downloadurl = Ext.getCmp('s_downloadurl').getValue();
    if (downloadurl == '') {
        Ext.Msg.alert('错误', '必须填写APP地址');
        return;
    }
    var platform = Ext.getCmp('s_platform').getValue();
    if (platform == '') {
        Ext.Msg.alert('错误', '必须选择APP平台');
        return;
    }
    var record = storeVersion.findRecord('id', id);
    record.set('version', version);
    record.set('downloadurl', downloadurl);
    record.set('platform', platform);
    storeVersion.sync({
        success: function () {
            storeVersion.reload();
            _winEdit.close();
        },
        failure: function () {
            storeVersion.reload();
            Ext.Msg.alert('错误', '修改用户信息失败');
        }
    });
}

function deleteversion() {
    Ext.Msg.confirm('系统提示', '确定要删除APP信息吗？这样会使操作不可逆', function (btn) {
        if (btn == 'yes') {
            var selections = grid.getSelectionModel().getSelection();
            storeVersion.remove(selections);
            storeVersion.sync({
                success: function () {
                    storeVersion.reload();
                    _winEdit.close();
                },
                failure: function () {
                    Ext.Msg.alert('错误', '删除APP版本信息失败');
                }
            });
        }
    }, this);
}


