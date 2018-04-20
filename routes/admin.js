const database = require('../config/mysql').connect();


module.exports = function (app) {
    // index page
    app.get('/admin/arrangementer', function (req, res) {
        var user = req.session.user;
        var userId = req.session.userId;

        if (userId == null) {
            res.redirect("/login");
            return;
        }
        database.connect();
        let sql = `SELECT arrangementer.* , sale.navn AS 'Sal', type.navn AS 'Type' FROM(( arrangementer INNER JOIN sale ON Sal_fk = sale.ID) INNER JOIN type ON type_fk = type.ID)`;
        database.query(sql, function (err, data) {
            if (err) {
                console.log(err);
            }
            res.render('pages/admin/arrangementer', {
                titel: "Arrangementer", arrangement: data, maaned: ["Januar", "Februar", "Marts", "April", "Maj", "Juni",
                    "Juli", "August", "September", "Oktober", "November", "December"
                ]
            })
        });
    })
    app.get('/admin/opretarrangement', function (req, res) {
        var user = req.session.user;
        var userId = req.session.userId;

        if (userId == null) {
            res.redirect("/login");
            return;
        }
        res.render('pages/admin/opretarrangement', { titel: "Om Os" })
    })
    app.get('/slet/:id', function (req, res) {
        var user = req.session.user;
        var userId = req.session.userId;

        if (userId == null) {
            res.redirect("/login");
            return;
        }
        database.query(`DELETE FROM arrangementer WHERE id = ${req.params.id}`, (error, rows) => {
            res.json(rows);
        });
    });
};
