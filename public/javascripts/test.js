 (function(){
 	Ext.onReady(function(){
 		var win = Ext.create('Ext.window.Window',{
 			width:300,
 			height:560,
 			title:'我插',
 			renderTo:Ext.getBody(),
 			resizable:false,
 			frame:true,
 			closeable:true,
 			items:{
 				xtype:'button',
 				text:'取消',
 				x:30,
 				y:50,
 				listeners:{
 					click:function(){
 						Ext.MessageBox.alert("ExtJS", "Hello ExtJS");
 						win.close();
 					}
 				}
 			},
 			listeners:{
 				close:function(){
 					Ext.MessageBox.alert("我发", "我退出");
 				}
 			}
 		});
 		win.show();
 	});
 })();
