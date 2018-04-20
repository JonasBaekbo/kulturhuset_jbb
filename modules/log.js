var fs = require('fs');
var dateFormat = require('dateformat');
module.exports = {

    'login': (user, ip) => {
        var d = new Date(Date.now());
        var n = dateFormat(d, "dd/mm/yyyy - h:MM:ss");
        fs.appendFile("./log/login.txt", `${n}\n--------------------------- \n ${ip} - ${user} logged in \r\n--------------------------- \n`, function (err) {
            //    if (err) throw err;
            console.log("Updated log file");
        })
    },
    'logout': (user, ip) => {
        var d = new Date(Date.now());
        var n = dateFormat(d, "dd/mm/yyyy - h:MM:ss");
        fs.appendFile("./log/login.txt", `${n}\n--------------------------- \n ${ip} - ${user} logged out \r\n--------------------------- \n`, function (err) {
            //    if (err) throw err;
            console.log("Updated log file");
        })
    }
}
