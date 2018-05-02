# exa-node
=========

A small module to interface the database Exasol using JDBC

## Installation

  `npm install exa-node`

## Requirements
    * JDK (currently only x86 supported)
    * NodeJS
    * Exasol-DB-Instance

## Usage

    var EXAConn = require('exa-node');
    var testdbconn = new EXAConn("192.168.56.101", "8563", "sys", "exasol");
    testdbconn.executeQuery("select * from SYS.EXA_ALL_USERS", function (err, res) {
        console.log(res);
    });
  
  

