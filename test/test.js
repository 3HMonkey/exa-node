'use strict';

var expect = require('chai').expect;
var DBConn = require('../exa-node.js');
var numFormatter = require('../index');

describe('#numFormatter', function () {
    it('should convert single digits', function () {
        var result = numFormatter(1);
        expect(result).to.equal('1');
    });

    it('should convert double digits', function () {
        var result = numFormatter(12);
        expect(result).to.equal('12');
    });

    it('should convert triple digits', function () {
        var result = numFormatter(123);
        expect(result).to.equal('123');
    });

    it('should convert 4 digits', function () {
        var result = numFormatter(1234);
        expect(result).to.equal('1,234');
    });

    it('should convert 5 digits', function () {
        var result = numFormatter(12345);
        expect(result).to.equal('12,345');
    });

    it('should convert 6 digits', function () {
        var result = numFormatter(123456);
        expect(result).to.equal('123,456');
    });

    it('should convert 7 digits', function () {
        var result = numFormatter(1234567);
        expect(result).to.equal('1,234,567');
    });

    it('should convert 8 digits', function () {
        var result = numFormatter(12345678);
        expect(result).to.equal('12,345,678');
    });

    /*it('tests db connection', function (done) {
        ExaNode.getAllUsers(function (err, results) {
            if (err) {
                console.log('Scotty, we have an error!!');
                return;
            }
            if (results != null) {

                expect(results[0].USER_NAME).to.equal('SYS');
                done();


            }

        });
        //expect(results[0].USER_NAME).to.equal('SYS');

    });*/


});

describe('#Checking DB relations:', function () {
    it('checking config example', function () {
        var testdbconn = new DBConn("192.168.56.101", "8563", "sys", "exasol");
        expect(testdbconn.ip).to.equal('192.168.56.101');
        expect(testdbconn.port).to.equal('8563');
        expect(testdbconn.username).to.equal('sys');
        expect(testdbconn.password).to.equal('exasol');

    });



    it('Checking Test Tables', function (done) {
        var testdbconn = new DBConn("192.168.56.101", "8563", "sys", "exasol");
        testdbconn.getAllUsers(function (err, results) {
            if (err) {
                console.log('Scotty, we have an error!!');
                return;
            }
            if (results != null) {

                expect(results[0].USER_NAME).to.equal('SYS');
                done();


            }

        });
        // expect(testdbconn.initializeConnection()).to.equal(null);

    });
});