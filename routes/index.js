const database = require('../config/mysql').connect();


module.exports = function (app) {
	// index page
	app.get('/', function (req, res) {
		res.render('pages/index', { titel: "Forside" })
	})
	app.get('/om', function (req, res) {
		res.render('pages/om', { titel: "Om Os" })
	})
	app.get('/kategori', function (req, res) {
		database.connect();
		let sql = `SELECT * FROM type`;
		database.query(sql, function (err, data) {
			if (err) {
				console.log(err);
			}
			res.json(data);
		});
	})
};
