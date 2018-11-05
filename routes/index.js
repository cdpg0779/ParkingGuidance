var express = require('express');
var router = express.Router();
var ccap = require('ccap');

function GetUserPermissions(req) {
	var b = true;
	if (req.session.user == null) {
		b = false;
	} else {
		if (req.session.user.permissions != "login") {
			b = false;
		}
	}
	return b;
}

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('login');
});

router.get('/main', function (req, res, next) {
	req.url = decodeURI(req.url);
	if (req.url.indexOf("?") > -1) {
		var type = req.url.split('?')[1].split("&")[0].split("=")[1];
		if (type != "") {
			var userid = "";
			var name = "";
			var unit = "";
			var unitid = "";
			try {
				userid = req.url.split('?')[1].split("&")[1].split("=")[1];
				name = req.url.split('?')[1].split("&")[2].split("=")[1];
				unit = req.url.split('?')[1].split("&")[3].split("=")[1];
				unitid = req.url.split('?')[1].split("&")[4].split("=")[1];
			} catch (error) {
				console.log(error);
				userid = "";
				name = "";
				unit = "";
				unitid = "";
			}
			req.session.user = {
				'id': userid,
				'name': name,
				'unit': unit,
				'unitid': unitid,
				'role': '',
				'permissions': 'noLogin'
			};
			//title里面填写系统名称
			res.render('index', { title: '', usr_id: userid, usr_name: name, usr_unit: unit, type: "", role: '' });
			return;
		}
	}
	var b = GetUserPermissions(req);
	if (!b) {
		res.redirect('/');
		return;
	}
	console.log(req.session.user.id);
	res.render('index', { title: '', usr_id: req.session.user.id, usr_name: req.session.user.name, usr_unit: req.session.user.unit, type: "123", role: req.session.user.role });
});

router.get('/sentiment', function (req, res, next) {
	var b = GetUserPermissions(req);
	if (!b) {
		res.redirect('/');
		return;
	}
	res.render('sentiment');
});

router.get('/sentimentlinks', function (req, res, next) {
	var b = GetUserPermissions(req);
	if (!b) {
		res.redirect('/');
		return;
	}
	res.render('sentimentlinks');
});

String.prototype.trim = function () {
	return this.replace(/(^\s*)|(\s*$)/g, '');
};

function GetRandomNum(Min, Max) {
	var Range = Max - Min;
	var Rand = Math.random();
	return (Min + Math.round(Rand * Range));
}
router.post('/GetPng', function (req, res, next) {
	var c = ccap({
		width: 256,//set width,default is 256

		height: 60,//set height,default is 60

		offset: 40,//set text spacing,default is 40

		quality: 100,//set pic quality,default is 50

		generate: function () {//Custom the function to generate captcha text

			//generate captcha text here
			var t = '';
			for (var i = 0; i < 4; i++) {
				var num = GetRandomNum(0, 9);
				t += num;
			}
			return t;//return the captcha text

		}
	});
	var ary = c.get();

	var txt = ary[0];

	var buf = ary[1];

	var data = {
		data: buf.toString('base64'),
		txt: txt
	}
	data = JSON.stringify(data);
	res.send(data);

	console.log(txt);
});

router.get('/about', function (req, res, next) {
	res.render('about.html', { fck: '关于' });
});

router.get('/pk', function (req, res, next) {
	res.render('index', { title: 'Express', init: false, ra: 223312 });
});

module.exports = router;
