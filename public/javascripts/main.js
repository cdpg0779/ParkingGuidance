/**
 * 后台内容管理主界面
 */


var _winPW = null;
(function () {
    Ext.onReady(function () {
        /*Ext.require(['ux.LoginUser']);
         var userStore = Ext.create("Ext.data.Store", {
         model: 'ux.LoginUser'
         });
         userStore.load();
         userStore.each(function(p){
         alert(p.get('name'));
         });*/

        var usrname = Ext.getDom('uname').value;
        var uunit = Ext.getDom('uunit').value;
        var newUunit = uunit;
        if (uunit.length > 0) {
            newUunit = uunit.length > 4 ? uunit.substr(0, 4) + "..." : uunit;
        }
        var type = Ext.getDom('type').value;
        var role = Ext.getDom('role').value;
        var model = {};
        var usermodel = [];
        var title = {};

        model = {
            id: 'route',
            title: '首页',
            html: "首页"
        }

        usermodel.push({
            region: 'north',
            xtype: 'panel',
            height: 100,
            items: [
                {
                    html: '<div class="sysname" style="height:100px;background:url(../../images/xpic10676.jpg);background-size:100%;"><div class="rightfunc" >' +
                        '<div id="top"><div id="top_links"><div id="top_close">' +
                        '<a class="icon iconfont" href="javascript:void(0);" onclick="exitSys();" target="_parent" title="退出登录">&#xf018f;</a>' +
                        '<a class="icon iconfont" href="javascript:void(0);" onclick="updatepassword();" target="_parent" title="修改密码">&#xf00be;</a>' +
                        '<a title="' + uunit + '" style="text-decoration:none;line-height:40px;vertical-align:middle"><p style="color:white;height:15px;font-size:10px">' + usrname + '</p><p style="color:white;height:15px;font-size:10px">' + newUunit + "" + '</p></a>' +
                        '<a  class="icon iconfont" href="javascript:void(0)" title="' + uunit + '"><img src="stylesheets/images/admin.png"></a>' +
                        '</div>' +
                        '</div></div>' +
                        '</div></div>'
                }],
            border: true,
            bodyStyle: 'background:#add2ed'
        }, {
                region: 'west',
                collapsible: true,
                collapsed: true,
                width: 200,
                xtype: 'panel',
                border: false,
                layout: 'fit',
                items: [{
                    xtype: 'treepanel',
                    rootVisible: false,
                    border: false,
                    useArrows: true, //树节点使用箭头
                    containerScroll: true,
                    collapsible: false,
                    autoScroll: false,
                    root: {
                        children: [ {
                            text: '用户管理',
                            leaf: false,
                            children: [{ text: '部门管理', leaf: true },
                            { text: '用户账号', leaf: true },
                            { text: '用户角色', leaf: true },
                            { text: '功能管理', leaf: true }]
                        }]
                    },
                    listeners: {
                        itemclick: function (el, record, item, index, e, eOpts) {
                            handlerMenus(record.data.text);
                        },
                        // afterrender: function (el, record) {
                        //     checkrole_func(el, record);
                        // }
                    }
                    /*,
                     expandnode : function(node){
                     if(node.childNodes.length>0){//展开节点时，更改父节点图标样式
                     node.getUI().getIconEl().src="folder-open.gif";
                     }
                     //更改当前节点下的所有子节点的图标
                     for (var i = 0, len = node.childNodes.length; i < len; i++) {
                     var curChild = node.childNodes[i];
                     curChild.getUI().getIconEl().src ="folder.gif";
                     }
                     },
                     collapsenode : function(node){//收起节点时，更改父节点的图标样式
                     if(node.childNodes.length>0){
                     node.getUI().getIconEl().src="folder.gif";
                     }
                     }*/
                }]

            },
            {
                id: 'mainpanel',
                region: 'center',
                xtype: 'tabpanel', // TabPanel itself has no title
                activeTab: 0,      // First tab active by default
                items: [model]
            });

        Ext.create('Ext.Viewport', {
            layout: 'border',
            items: usermodel,
            renderTo: Ext.getBody()
        });
    });
})();

/*
 * 处理左侧树形菜单点击事件
 */
function handlerMenus(menutext) {
    var tab = Ext.getCmp('mainpanel');
    if (menutext == '人员踪迹') {
        if (Ext.getCmp('route')) {
            tab.setActiveTab('route');
            return;
        }
        var item = {
            id: 'route',
            title: '人员踪迹',
            html: '<iframe id="routeui" name="routeui" src="/route" style="width:100%; height:100%;" frameborder="0"></iframe>'
        };
        tab.add(item);
        tab.setActiveTab('route');
    } else if (menutext == '发文管理') {
        if (Ext.getCmp('oaPDF')) {
            tab.setActiveTab('oaPDF');
            return;
        }
        var item = {
            id: 'oaPDF',
            closable: true,
            title: '发文管理',
            html: '<iframe id="oaPDFui" name="oaPDFui" src="/oaPDF" style="width:100%; height:100%;" frameborder="0"></iframe>'
        };
        tab.add(item);
        tab.setActiveTab('oaPDF');
    } else if (menutext == '舆情日报') {
        if (Ext.getCmp('sentimentlinks')) {
            tab.setActiveTab('sentimentlinks');
            return;
        }
        var item = {
            id: 'sentimentlinks',
            closable: true,
            title: '舆情日报',
            html: '<iframe id="sentimentlinksui" name="sentimentlinksui" src="/sentimentlinks" style="width:100%; height:100%;" frameborder="0"></iframe>'
        };
        tab.add(item);
        tab.setActiveTab('sentimentlinks');
    } else if (menutext == '交通快讯') {
        if (Ext.getCmp('alerts')) {
            tab.setActiveTab('alerts');
            return;
        }
        var item = {
            id: 'alerts',
            closable: true,
            title: '交通快讯',
            html: '<iframe id="alertsui" name="alertsui" src="/alerts" style="width:100%; height:100%;" frameborder="0"></iframe>'
        };
        tab.add(item);
        tab.setActiveTab('alerts');
    } else if (menutext == '市长阅办') {
        if (Ext.getCmp('mayorsupervisor')) {
            tab.setActiveTab('mayorsupervisor');
            return;
        }
        var item = {
            id: 'mayorsupervisor',
            closable: true,
            title: '市长阅办',
            html: '<iframe id="mayorsupervisorui" name="mayorsupervisorui" src="/supervisor" style="width:100%; height:100%;" frameborder="0"></iframe>'
        };
        tab.add(item);
        tab.setActiveTab('mayorsupervisor');
    } else if (menutext == '通知公告') {
        if (Ext.getCmp('announce')) {
            tab.setActiveTab('announce');
            return;
        }
        var item = {
            id: 'announce',
            closable: true,
            title: '通知公告',
            html: '<iframe id="announceui" name="announceui" src="/announce" style="width:100%; height:100%;" frameborder="0"></iframe>'
        };
        tab.add(item);
        tab.setActiveTab('announce');
    } else if (menutext == 'APP版本') {
        if (Ext.getCmp('version')) {
            tab.setActiveTab('version');
            return;
        }
        var item = {
            id: 'version',
            closable: true,
            title: 'APP版本',
            html: '<iframe id="versionui" name="versionui" src="/version" style="width:100%; height:100%;" frameborder="0"></iframe>'
        };
        tab.add(item);
        tab.setActiveTab('version');
    } else if (menutext == 'Banner管理') {
        if (Ext.getCmp('banner')) {
            tab.setActiveTab('banner');
            return;
        }
        var item = {
            id: 'banner',
            closable: true,
            title: 'Banner管理',
            html: '<iframe id="bannerui" name="bannerui" src="/banner" style="width:100%; height:100%;" frameborder="0"></iframe>'
        };
        tab.add(item);
        tab.setActiveTab('banner');
    } else if (menutext == '热词管理') {
        if (Ext.getCmp('hotword')) {
            tab.setActiveTab('hotword');
            return;
        }
        var item = {
            id: 'hotword',
            closable: true,
            title: '热词管理',
            html: '<iframe id="hotwordui" name="hotwordui" src="/hotword" style="width:100%; height:100%;" frameborder="0"></iframe>'
        };
        tab.add(item);
        tab.setActiveTab('hotword');
    } else if (menutext == '用户账号') {
        if (Ext.getCmp('useraccount')) {
            tab.setActiveTab('useraccount');
            return;
        }
        var item = {
            id: 'useraccount',
            closable: true,
            title: '用户账号',
            html: '<iframe id="usersui" name="usersui" src="/users" style="width:100%; height:100%;" frameborder="0"></iframe>'
        };
        tab.add(item);
        tab.setActiveTab('useraccount');
    } else if (menutext == '用户角色') {
        if (Ext.getCmp('userrole')) {
            tab.setActiveTab('userrole');
            return;
        }
        var item = {
            id: 'userrole',
            closable: true,
            title: '用户角色',
            html: '<iframe id="userroleui" name="userroleui" src="/users/userrole" style="width:100%; height:100%;" frameborder="0"></iframe>'
        };
        tab.add(item);
        tab.setActiveTab('userrole');
    } else if (menutext == '部门管理') {
        if (Ext.getCmp('userunit')) {
            tab.setActiveTab('userunit');
            return;
        }
        var item = {
            id: 'userunit',
            closable: true,
            title: '部门管理',
            html: '<iframe id="userunit" name="userunitui" src="/users/userunit" style="width:100%; height:100%;" frameborder="0"></iframe>'
        };
        tab.add(item);
        tab.setActiveTab('userunit');
    } else if (menutext == '功能管理') {
        if (Ext.getCmp('appfunction')) {
            tab.setActiveTab('appfunction');
            return;
        }
        var item = {
            id: 'appfunction',
            closable: true,
            title: '功能管理',
            html: '<iframe id="appfunctionui" name="appfunctionui" src="/users/appfunction" style="width:100%; height:100%;" frameborder="0"></iframe>'
        };
        tab.add(item);
        tab.setActiveTab('appfunction');
    }
}

/*
 * 处理树形菜单加载时的事件
 * */
function checkrole_func(el, record) {
    Ext.Ajax.request({
        url: 'users/getrole_func',
        method: 'POST',
        success: function (response, options) {
            var joRes = response.responseText;
            if (joRes) {
                joRes = joRes.split(',');
            }
        },
        failure: function (response, options) {
            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误码：' + response.status);
        }
    });
}

/**
 * 重置当前用户密码
 */
function resetpwd() {
    Ext.Ajax.request({
        url: 'users/resetpwd',
        method: 'GET',
        success: function (response, options) {
            var joRes = Ext.JSON.decode(response.responseText);
            if (joRes.setpwd == '1') {
                Ext.MessageBox.alert('成功', '重置密码成功!');
            }
            else {
                Ext.MessageBox.alert('失败', '重置密码失败!');
            }
        },
        failure: function (response, options) {
            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误码：' + response.status);
        }
    });
}

function updatepassword() {
    _winPW = Ext.create('Ext.Window', {
        title: '修改密码',
        width: 300,
        height: 200,
        layout: 'vbox',
        defaults: {
            xtype: 'textfield'
        },
        bodyPadding: 5,
        items: [{ name: 'oldpw', fieldLabel: '&nbsp;&nbsp;&nbsp;旧密码', allowBlank: false, width: 280, id: 'oldpw', inputType: 'password' },
        { name: 'newpw', fieldLabel: '&nbsp;&nbsp;&nbsp;新密码', allowBlank: false, width: 280, id: 'newpw', inputType: 'password' },
        { name: 'newpw_two', fieldLabel: '重复密码', allowBlank: false, width: 280, id: 'newpw_two', inputType: 'password' }
        ],
        buttons: [{
            text: '保存',
            handler: function () {
                var oldpw = Ext.getCmp('oldpw').getValue();
                if (oldpw == '') {
                    Ext.Msg.alert('提示', '必须填写旧密码');
                    return;
                }
                var newpw = Ext.getCmp('newpw').getValue();
                if (newpw == '') {
                    Ext.Msg.alert('提示', '必须填写新密码');
                    return;
                }
                var newpw_two = Ext.getCmp('newpw_two').getValue();
                if (newpw_two == '') {
                    Ext.Msg.alert('提示', '必须重复新密码');
                    return;
                }
                if (newpw != newpw_two) {
                    alert("两次输入新密码必须相同！");
                    return;
                }
                Ext.Ajax.request({
                    url: '/users/updatepassword',
                    params: { newpw: newpw, oldpw: oldpw },
                    method: 'POST',
                    success: function (response, options) {
                        var obj = Ext.JSON.decode(response.responseText);
                        obj = eval(obj);
                        if (obj.state == 0) {
                            Ext.Msg.alert("提示", "修改密码成功！");
                            _winPW.close();
                        } else {
                            Ext.Msg.alert("提示", obj.msg);
                        }
                    },
                    failure: function (response, options) {
                        Ext.MessageBox.alert('失败', '请求失败,错误码：' + response.status);
                    }
                });
            }
        }, {
            text: '关闭',
            handler: function () {
                _winPW.close();
            }
        }],
        renderTo: Ext.getBody()
    });
    _winPW.show();
}


function OpenReplacePassword() {
    var _winPw = Ext.create('Ext.Window', {
        width: 100,
        plain: true,
        items: [{
            text: '重置密码',
            listeners: {
                click: function () {
                    alert('now');
                }
            }
        }],
        renderTo: 'username'
    });
}

/**
 * 建立用户菜单
 */
function createMenu() {
    Ext.create('Ext.menu.Menu', {
        width: 100,
        plain: true,
        items: [{
            text: '重置密码',
            listeners: {
                click: function () {
                    alert('now');
                }
            }
        }],
        renderTo: 'username'
    });
    Ext.create('Ext.menu.Menu', {
        width: 100,
        plain: true,
        items: [{
            text: '修改密码',
            listeners: {
                click: function () {
                    alert('now');
                }
            }
        }],
        renderTo: 'username'
    });
}

/**
 * 退出系统
 */
function exitSys() {
    location.href = '/users/logout';
}