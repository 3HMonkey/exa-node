'use strict';

var JDBC = require('jdbc');
var jinst = require('jdbc/lib/jinst');



class DBConn {


    constructor(ip, port, username, password) {
        this.ip = ip;
        this.port = port;
        this.username = username;
        this.password = password;

        this.config = {
            drivername: 'com.exasol.jdbc.EXADriver',
            url: 'jdbc:exa:' + ip + ':' + port + ';schema=SYS;user=' + username + ';password=' + password,
            minpoolsize: 2,
            maxpoolsize: 50,
            properties: {}
        };
    }

    display() {
        console.log(this.ip + " " + this.port + " " + this.username + " " + this.password + " " + this.config);
    }

    createJVM() {
        if (!jinst.isJvmCreated()) {
            jinst.addOption("-Xrs");
            jinst.setupClasspath(['./lib/exajdbc.jar']);
            return true;
        }
    }

    initializeConnection() {
        if(this.createJVM() == true){
            var hsqldb = new JDBC(this.config);

            hsqldb.initialize(function (err) {
                if (err) {
                    console.log(err);
                }
            });
            this.connection = hsqldb;
            return this.connection;
        }
        return false;
    }


    getAllUsers(callback) {
        var hsqldb = this.initializeConnection()
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
    }

    executeQuery(query, callback) {
        var hsqldb = this.initializeConnection()
        hsqldb.reserve(function (err, connObj) {
            console.log("Using connection: " + connObj.uuid);
            var conn = connObj.conn;
            conn.createStatement(function (err, statement) {
                statement.executeQuery(query, function (err, resultSet) {
                    callback(err, null);
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
}

module.exports = DBConn;


/*
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
};*/