/**
 * 用户账户列表操作界面
 */
var PAGE_SIZE = 12;
var storeUsers = null;
var grid = null;
var _winNew = null;
var _winEdit = null;
var configData = null;







/*
 * 数据库备份信息下拉列表
 * */

var roleStore = Ext.create('Ext.data.Store', {
    fields: ['code', 'name'],
    data: []
});


(function () {
    Ext.onReady(function () {
        getConfigData();
        /*
         * 注册用户账户数据模型
         * */
        Ext.regModel('usersContent', {
            fields: [
                { name: 'id', type: 'string' },
                { name: 'userid', type: 'string' },
                { name: 'username', type: 'string' },
                { name: 'backupTime', type: 'string' },
                { name: 'fileName', type: 'string' }
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
                url: "/backup/backupall",
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: '/backup/backupall',
                    destroy: '/backup/deleteBackup'
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
            { text: '备份人', dataIndex: 'username', align: 'center', width: 120 },
            { text: '备份时间', dataIndex: 'backupTime', width: 200, align: 'center' },
            { text: '备份文件地址', dataIndex: 'fileName', width: 200, align: 'center' }],
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
                                var roleid_only = Ext.getCmp('backupDataOnlyOne_btn');
                                var roleid_timing = Ext.getCmp('openBackupDataTimingWindow_btn');
                                var roleid_del = Ext.getCmp('backupData_del_btn');
                                /*现将所有的按钮隐藏，然后根据权限来打开按钮*/
                                roleid_only.setVisible(false);
                                roleid_timing.setVisible(false);
                                roleid_del.setVisible(false);
                                Ext.Ajax.request({
                                    url: '/users/getRoleIdByBtnId',
                                    params: {
                                        add: "backup_all_btn",
                                        edit: "backup_all_btn",
                                        del: "backup_all_btn"
                                    },
                                    method: 'POST',
                                    success: function (r, o) {
                                        var role = Ext.JSON.decode(r.responseText ? r.responseText : "{}");
                                        var only_id = role.add;
                                        var timing_id = role.edit;
                                        var del_id = role.del;
                                        for (var i = 0; i < joRes.length; i++) {
                                            if (joRes[i] == only_id) roleid_only.setVisible(true);
                                            if (joRes[i] == timing_id) roleid_timing.setVisible(true);
                                            if (joRes[i] == del_id) roleid_del.setVisible(true);
                                        }
                                        var selections = e.getSelectionModel().getSelection();
                                        e.down('#del_btn').setDisabled(selections.length == 0);
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
            tbar: [
                { itemId: 'del_btn', text: '删除', iconCls: 'Delete', handler: deletestoreUsers, id: 'backupData_del_btn' },
                { itemId: 'backupDataOnlyOne_btn', text: '备份', iconCls: 'Add', handler: backupDataOnlyOne, id: 'backupDataOnlyOne_btn' },
                { itemId: 'openBackupDataTimingWindow_btn', text: '设置自动备份', iconCls: 'Add', handler: openBackupDataTimingWindow, id: 'openBackupDataTimingWindow_btn' }
            ]
        });

        grid.getSelectionModel().on('selectionchange', function (selModel, selections) {
            grid.down('#del_btn').setDisabled(selections.length == 0);
        });
    });
})();

/*
 * 备份一次
 * */
function backupDataOnlyOne() { }

/*
 * 打开设置备份时间窗口
 * */
function openBackupDataTimingWindow() {
    let data = { dayofweek: 0, month: 0, dayofmonth: 0, hour: 0, minute: 0, second: 0 };
    if (configData != null) {
        data = configData;
    }
    _winNew = Ext.create('Ext.Window', {
        title: '设置自动备份时间(全部填0则不自动备份)',
        width: 250,
        height: 400,
        layout: 'vbox',
        defaults: {
            xtype: 'numberfield'
        },
        bodyPadding: 5,
        items: [{ id: 's_dayofweek', fieldLabel: '星期几(0-7,0为任意)', allowBlank: false, width: 200, allowDecimals: false, value: data.dayofweek },
        { id: 's_month', fieldLabel: '月份(0-12,0为任意)', allowBlank: true, width: 200, allowDecimals: false, value: data.month },
        { id: 's_dayofmonth', fieldLabel: '每月几号(0-31,0为任意)', allowBlank: true, width: 200, allowDecimals: false, value: data.dayofmonth },
        { id: 's_hour', fieldLabel: '时(0-24,0为任意)', allowBlank: true, width: 200, allowDecimals: false, value: data.hour },
        { id: 's_minute', fieldLabel: '分(0-60,0为任意)', allowBlank: true, width: 200, allowDecimals: false, value: data.minute },
        { id: 's_second', fieldLabel: '秒(0-60,0为任意)', allowBlank: true, width: 200, allowDecimals: false, value: data.second }
        ],
        buttons: [{
            text: '设置', handler: function () {
                saveBackupDataTiming();
            }
        }, {
            text: '取消', handler: function () {
                _winNew.close();
            }
        }],
        listeners: {
            afterrender: function () {

            }
        },
        renderTo: Ext.getBody()
    });
    _winNew.show();
}


function saveBackupDataTiming() {
    var dayofweek = Ext.getCmp('s_dayofweek').getValue();

    if ((!dayofweek && dayofweek != 0) || dayofweek < 0 || dayofweek > 7) {
        Ext.Msg.alert('错误', '星期范围填写错误！');
        return;
    }
    var month = Ext.getCmp('s_month').getValue();
    if ((!month && month != 0) || month < 0 || month > 12) {
        Ext.Msg.alert('错误', '月份范围填写错误！');
        return;
    }
    var dayofmonth = Ext.getCmp('s_dayofmonth').getValue();

    if ((!dayofmonth && dayofmonth != 0) || dayofmonth < 0 || dayofmonth > 31) {
        Ext.Msg.alert('错误', '日期范围填写错误！');
        return;
    }
    var hour = Ext.getCmp('s_hour').getValue();

    if ((!hour && hour != 0) || hour < 0 || hour > 24) {
        Ext.Msg.alert('错误', '小时范围填写错误！');
        return;
    }
    var minute = Ext.getCmp('s_minute').getValue();

    if ((!minute && minute != 0) || minute < 0 || minute > 60) {
        Ext.Msg.alert('错误', '分钟范围填写错误！');
        return;
    }
    var second = Ext.getCmp('s_second').getValue();
    if ((!second && second != 0) || second < 0 || second > 60) {
        Ext.Msg.alert('错误', '秒范围填写错误！');
        return;
    }
    Ext.Ajax.request({
        /* url: '/appif/supervisordetail',
         params: {start:0,pagesize:12,userid:'17866d8840497bc46ef2d7ccc273aa7f'},*/
        url: '/backup/backupDataTiming',
        params: { dayofweek: dayofweek, month: month, dayofmonth: dayofmonth, hour: hour, minute: minute, second: second },
        method: 'POST',
        success: function (response, options) {
            var joRes = Ext.JSON.decode(response.responseText);
            joRes = eval(joRes);
            var data = [];
            if (joRes.state == 0) {
                Ext.MessageBox.alert('成功', joRes.msg);
                _winNew.close();
            }
        },
        failure: function (response, options) {
            Ext.MessageBox.alert('失败', '请求失败,错误码：' + response.status);
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


function getConfigData() {
    Ext.Ajax.request({
        /* url: '/appif/supervisordetail',
         params: {start:0,pagesize:12,userid:'17866d8840497bc46ef2d7ccc273aa7f'},*/
        url: '/backup/getBackupConfig',
        params: {},
        method: 'POST',
        success: function (response, options) {
            var joRes = Ext.JSON.decode(response.responseText);
            joRes = eval(joRes);
            if (joRes.state == 0) {
                configData = {};
                configData.dayofweek = joRes.rows[0].dayofweek == '*' ? 0 : joRes.rows[0].dayofweek;
                configData.month = joRes.rows[0].month == '*' ? 0 : joRes.rows[0].month;
                configData.dayofmonth = joRes.rows[0].dayofmonth == '*' ? 0 : joRes.rows[0].dayofmonth;
                configData.hour = joRes.rows[0].hour == '*' ? 0 : joRes.rows[0].hour;
                configData.minute = joRes.rows[0].minute == '*' ? 0 : joRes.rows[0].minute;
                configData.second = joRes.rows[0].second == '*' ? 0 : joRes.rows[0].second;
            }
        },
        failure: function (response, options) {
            Ext.MessageBox.alert('失败', '请求失败,错误码：' + response.status);
        }
    });
}




