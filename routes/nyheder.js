const database = require('../config/mysql').connect();


module.exports = function (app) {
    // index page
    app.get('/nyheder', function (req, res) {
        database.connect();
        let sql = `SELECT arrangementer.*, sale.navn AS 'Sal', type.navn AS 'Type' FROM(( arrangementer INNER JOIN sale ON Sal_fk = sale.ID) INNER JOIN type ON type_fk = type.ID) WHERE arrangementer.Dato + INTERVAL 8 DAY
        `;
        database.query(sql, function (err, data) {
            if (err) {
                console.log(err);
            }
            res.render('pages/nyheder', {
                titel: "Nyheder", arrangement: data, data, maaned: ["Januar", "Februar", "Marts", "April", "Maj", "Juni",
                    "Juli", "August", "September", "Oktober", "November", "December"
                ]
            })
        });
    })
};