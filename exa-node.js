var JDBC = require('jdbc');
var jinst = require('jdbc/lib/jinst');

if (!jinst.isJvmCreated()) {
    jinst.addOption("-Xrs");
    jinst.setupClasspath(['./lib/exajdbc.jar']);
    console.log('Jvm created!');
}


var config = {

    drivername: 'com.exasol.jdbc.EXADriver',
    url: 'jdbc:exa:192.168.56.101:8563;schema=SYS;user=sys;password=exasol',
    minpoolsize: 2,
    maxpoolsize: 50,
    properties: {}
};


var hsqldb = new JDBC(config);

hsqldb.initialize(function (err) {
    if (err) {
        console.log(err);
    }


});


module.exports = {

    getAllUsers: function (callback) {
        hsqldb.reserve(function (err, connObj) {
            console.log("Using connection: " + connObj.uuid);
            var conn = connObj.conn;
            conn.createStatement(function (err, statement) {
                statement.executeQuery("select * from SYS.EXA_ALL_USERS", function (err, resultSet) {
                    callback(err, null)
                    if (err) {
                        console.log(err);
                        return err;
                    }
                    resultSet.toObjArray(function (err, results) {

                        if (err) {
                            console.log(err);
                            return err;
                        }
                        callback(err, results);
                    });
                });
            });
        });
    },
    getAllTables: function (callback) {
        hsqldb.reserve(function (err, connObj) {
            console.log("Using connection: " + connObj.uuid);
            var conn = connObj.conn;
            conn.createStatement(function (err, statement) {
                statement.executeQuery("select * from SYS.EXA_ALL_TABLES", function (err, resultSet) {
                    callback(err, null)
                    if (err) {
                        console.log(err);
                        return err;
                    }
                    resultSet.toObjArray(function (err, results) {

                        if (err) {
                            console.log(err);
                            return err;
                        }
                        callback(err, results);
                    });
                });
            });
        });
    }
};