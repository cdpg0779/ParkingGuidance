/**
 * 用户登录界面
 */
(function () {
    Ext.onReady(function () {
        //Ext.require(['ux.LoginUser']);
    });
})();

var data = '';

function refreshCode() {
    Ext.Ajax.request({
        url: '/GetPng',
        method: 'POST',
        success: function (response, options) {
            var joRes = Ext.JSON.decode(response.responseText);
            data = joRes.txt;
            $("#yanzhengma").val('');
            $("#img_code").attr('src', "data:image/jpeg;base64," + joRes.data);
        },
        failure: function (response, options) {
            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误码：' + response.status);
        }
    });
}

function loginNow() {
    var nm = Ext.getDom('usr').value;
    var ps = Ext.getDom('pwd').value;
    var yanzhengma = Ext.getDom('yanzhengma').value;
    if (nm != "admin") {
        Ext.Msg.alert("提示", '只允许管理员登录！');
        refreshCode();
        return;
    }
    if (nm == '') {
        Ext.Msg.alert("提示", '请输入用户名！');
        refreshCode();
        return;
    }
    if (ps == '') {
        Ext.Msg.alert("提示", '请输入密码 ！');
        refreshCode();
        return;
    }
    if (yanzhengma == '') {
        Ext.Msg.alert("提示", '请输入验证码 ！');
        refreshCode();
        return;
    }
    if (yanzhengma.toLowerCase() != data.toLowerCase()) {
        Ext.Msg.alert("提示", '验证码错误！');
        refreshCode();
        return;
    }
    Ext.Ajax.request({
        url: 'users/login',
        params: { usr: nm, pwd: ps },
        method: 'GET',
        success: function (response, options) {
            var joRes = Ext.JSON.decode(response.responseText);
            if (joRes.sigin == '1') {
                //登陆成功之后加载角色权限进入session
                location.href = '/main';
                /*
                 var userStore = Ext.create("Ext.data.Store", {
                 model: 'ux.LoginUser'
                 });
                 userStore.add({id:joRes.id,name:joRes.name,sigin:joRes.sigin});
                 userStore.sync();*/
            }
            else {
                alert("错误的用户名或密码,登录失败");
                // showQuikTipMessage('错误的用户名或密码,登录失败!', 'loginpanel');
            }
        },
        failure: function (response, options) {
            Ext.Msg.alert("提示", '请求超时或网络故障,错误码：' + response.status);
        }
    });
}

function showQuikTipMessage(msg, cid) {
    Ext.tip.QuickTipManager.init();

    Ext.apply(Ext.tip.QuickTipManager.getQuickTip(), {
        maxWidth: 200,
        minWidth: 100,
        showDelay: 1
    });

    Ext.tip.QuickTipManager.register({
        target: cid,
        text: msg,
        width: 200,
        dismissDelay: 2000
    });
}

var jic = {
    /**
     * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed
     * @param {Image} source_img_obj The source Image Object
     * @param {Integer} quality The output quality of Image Object
     * @return {Image} result_image_obj The compressed Image Object
     */

    compress: function (source_img_obj, quality, output_format) {

        var mime_type = "image/jpeg";
        if (output_format != undefined && output_format == "png") {
            mime_type = "image/png";
        }


        var cvs = document.createElement('canvas');
        //naturalWidth真实图片的宽度
        cvs.width = source_img_obj.naturalWidth;
        cvs.height = source_img_obj.naturalHeight;
        var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
        var newImageData = cvs.toDataURL(mime_type, quality / 100);
        var result_image_obj = new Image();
        result_image_obj.src = newImageData;
        return result_image_obj;
    }
}