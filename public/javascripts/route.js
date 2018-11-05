//人员跟踪页面
var str = '';


(function () {
    Ext.onReady(function () {
        on();

    });
})();

//初始化地图和人员列表
function on() {
    Ext.Ajax.request({
        url: '/route/getUsers',
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
                var itemsArr = [];
                for (var i = 0; i < joRes.rows.length; i++) {
                    var element = joRes.rows[i];
                    var deptmentName = element.deptmentName;
                    var data = element.data;
                    var str = '';
                    if (data.length > 0) {
                        str = '<ol class="rectangle-list">';
                        for (var j = 0; j < data.length; j++) {
                            var model = data[j];
                            str += '<li><a onclick="javascript:clickMap(\'' + model.id + '\')">' + model.name + '</a></li>';
                        }
                        str += '</ol>';
                    }
                    itemsArr.push({
                        html: str,
                        title: deptmentName,
                        autoScroll: true,
                        border: true,
                        iconCls: 'nav'
                    });
                }
                var viewport = Ext.create('Ext.Viewport', {
                    layout: 'border',
                    items: [{
                        region: 'west',
                        id: 'west-panel',
                        title: '人员列表',
                        split: false,
                        width: 200,
                        minSize: 175,
                        maxSize: 400,
                        collapsible: false,
                        margins: '1 0 5 5',
                        cmargins: '1 5 5 5',
                        layout: 'accordion',
                        layoutConfig: {
                            animate: true
                        },
                        items: itemsArr
                    }]
                });
                /* roleStore.data. =data;*/
            }
        },
        failure: function (response, options) {
            Ext.MessageBox.alert('失败', '请求失败,错误码：' + response.status);
        }
    });
}


// var pointList = [];
var pointList = [
    {

        lng: 116.397222,
        lat: 39.90923

    },

    {

        lng: 116.397324,
        lat: 39.90923



    },

    {

        lng: 116.397461,
        lat: 39.90923

    },
    {

        lng: 116.397628,
        lat: 39.90923

    }


];
var a_mark;    //图标点
var marker;
var lineArr;
function clickMap(id) {
    map.clearMap();
    Ext.Ajax.request({
        url: '/route/GetPointsByUserid',
        method: 'POST',
        params: { userid: id },
        success: function (response, options) {
            var joRes = Ext.JSON.decode(response.responseText);
            joRes = eval(joRes);
            var data = [];
            /*  var PersonRecord = Ext.data.Record.create([
             {name: 'code', type: 'string'},
             {name: 'name', type: 'string'}
             ]);*/
            if (joRes) {
                // for (var i = 0; i < joRes.length; i++) {
                //     var element = joRes[i];
                //     pointList.push({ lng: element.longitude, lat: element.latitude })
                // }
                startRun();
                /* roleStore.data. =data;*/
            }
        },
        failure: function (response, options) {
            Ext.MessageBox.alert('失败', '请求失败,错误码：' + response.status);
        }
    });
}


function completeEventHandler(x, y) {

    marker = new AMap.Marker({
        draggable: true, //是否可拖动  
        position: new AMap.LngLat(x, y),//基点位置  
        icon: "http://vdata.amap.com/icons/b18/1/2.png", //marker图标，直接传递地址url  
        offset: new AMap.Pixel(-26, -13), //相对于基点的位置  
        autoRotation: true
    });
    marker.setMap(map);



}

function startRun() {  //开始绘制轨迹
    // for (var i = 0; i < pointList.length; i++) {
    //     var element = pointList[i];
    //     x = element.lng;
    //     y = element.lat;
    //     completeEventHandler(x, y);
    // }
    var lngX;
    var latY;
    lineArr = new Array();
    for (var i = 1; i < pointList.length; i++) {
        lngX = pointList[i].lng;
        latY = pointList[i].lat;
        lineArr.push(new AMap.LngLat(lngX, latY));
    }

    //绘制轨迹  
    var polyline = new AMap.Polyline({
        path: lineArr,
        strokeColor: "#ff0000",//线颜色  
        strokeOpacity: 1,//线透明度  
        strokeWeight: 3,//线宽  
        strokeStyle: "solid",//线样式  
    });
    polyline.setMap(map);

    // marker.moveAlong(lineArr, 5000);     //开始轨迹回放
}

