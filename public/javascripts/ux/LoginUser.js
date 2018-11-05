/**
 * 用户模型
 */
 Ext.define('ux.LoginUser',{
 	extend:'Ext.data.Model',
 	fields:[{
 		name:'id',type:'String',defaultValue:''
 	},{
 		name:'name',type:'String',defaultValue:''
 	},{
 		name:'sigin',type:'boolean',defaultValue: false, convert:function(value,rec){
 			if(value=='1')
 				return true;
 			return false;
 		}
 	}],
 	proxy:{
 		proxy: {
	        type: 'sessionstorage',
	        id: 'myProxyKey'
    	}
 	}
 });