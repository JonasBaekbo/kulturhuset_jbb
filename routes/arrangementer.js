
const database = require('../config/mysql').connect();
const fs = require('fs');

module.exports = function (app) {
    // index page
    app.get('/arrangementer', function (req, res) {
        database.connect();
        let sql = `SELECT arrangementer.* , sale.navn AS 'Sal', type.navn AS 'Type' FROM(( arrangementer INNER JOIN sale ON Sal_fk = sale.ID) INNER JOIN type ON type_fk = type.ID)`;
        database.query(sql, function (err, data) {
            if (err) {
                console.log(err);
            }
            res.render('pages/arrangementer', {
                titel: "Arrangementer", arrangement: data, maaned: ["Januar", "Februar", "Marts", "April", "Maj", "Juni",
                    "Juli", "August", "September", "Oktober", "November", "December"
                ]
            })
        });
    })
    app.get('/sale', function (req, res) {
        database.connect();
        let sql = `SELECT sale.* FROM sale`;
        database.query(sql, function (err, data) {
            if (err) {
                console.log(err);
            }
            res.json(data);
        });
    })
    app.get('/arrangement/:id', function (req, res) {
        database.connect();
        let sql = `SELECT arrangementer.*, sale.navn AS 'Sal', sale.Pladser AS 'Pladser', type.navn AS 'Type' FROM(( arrangementer INNER JOIN sale ON Sal_fk = sale.ID) INNER JOIN type ON type_fk = type.ID) WHERE arrangementer.id = ?
        `;
        database.query(sql, [req.params.id], function (err, data) {
            if (err) {
                console.log(err);
            }
            res.render('pages/arrangement', {
                titel: data[0].navn, arrangement: data[0], plads: data[0].pladser, maaned: ["Januar", "Februar", "Marts", "April", "Maj", "Juni",
                    "Juli", "August", "September", "Oktober", "November", "December"]
            })
        });
    })
    app.get('/admin/retarrangement/:id', function (req, res) {
        database.connect();
        let sql = `SELECT arrangementer.*, sale.navn AS 'Sal', sale.Pladser AS 'Pladser', type.navn AS 'Type' FROM(( arrangementer INNER JOIN sale ON Sal_fk = sale.ID) INNER JOIN type ON type_fk = type.ID) WHERE arrangementer.id = ?
        `;
        database.query(sql, [req.params.id], function (err, data) {
            if (err) {
                console.log(err);
            }
            res.render('pages/admin/retarrangement', {
                titel: data[0].navn, arrangement: data[0], plads: data[0].pladser, maaned: ["Januar", "Februar", "Marts", "April", "Maj", "Juni",
                    "Juli", "August", "September", "Oktober", "November", "December"]
            })
        });
    })
    app.post('/opret', (req, res, next) => {
        let image = 'no-image.png';
        let sql = 'INSERT INTO arrangementer(navn, Pris, Dato, Sal_fk, beskrivelse, billede) VALUES (?, ?, FORMAT(dato, "yyyy-MM-ddTHH:mm:ss"), ?, ?, ?)';

        let productImage = req.body.productImage;
        console.log(req.body.dato);
        if (req.body.navn != '' && req.body.beskrivelse != '') {
            // håndter billedet, hvis der er sendt et billede 

            database.query(`INSERT INTO arrangementer(navn, Pris, Dato, Sal_fk, beskrivelse, billede) VALUES ('${req.body.navn}', ${req.body.pris}, '${req.body.dato}', '${req.body.sal_id}', '${req.body.beskrivelse}', '${req.body.productImage}')`, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('pages/admin/arrangement')
                }
            })
        } else {
            // console.log(name, price, dato, sal_id, description, image);
            res.status(400).json({
                message: 'validering fejlede'
            });
        }
    });
    app.post('/admin/retarrangement/:id', function (req, res, next) { // selve routet som har put metoden. Opdatering af produkter.
        if (req.body.navn != '' && req.body.beskrivelse != '' && !isNaN(req.body.pris)) {

            // håndter billedet, hvis der er sendt et billede 
            database.query(`UPDATE arrangementer SET navn= '${req.body.navn}', Pris = ${req.body.pris} ,Dato = '0000:00:00 00:00:00', Sal_fk = ${req.body.sal_id}, beskrivelse = '${req.body.beskrivelse}' WHERE id = ${req.params.id}`, function (err, data) {

                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/admin/arrangementer')
                }
            })
        }
    });
};
