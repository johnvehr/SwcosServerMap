'use strict';

var _ = require('lodash');
var xls = require('excel');
var fs = require('fs');
var util = require('util');
var path = require('path')

// Get list of uploads
exports.index = function(req, res) {
  var options = {
    encoding: 'utf8'
  }
  fs.readFile('server/api/data/swcosJsData.json',options,function(err,data){
    res.json(data);
  })
  //res.json([]);
}

exports.read = function(req, res){
  fs.readdir(path.join(__dirname, '/excel'),function(err,files){
    res.json(files)
  })
}

exports.write = function(req,res){
  var data_to_write = JSON.stringify(req.body)
  console.log(data_to_write)
  fs.writeFile('server/api/data/swcosJsData.json',data_to_write,function(err){
    if (err) return console.log(err);
  })
}

exports.upload = function(req,res,next){
  /*fs.readdir(path.join(__dirname, '/excel'),function(err,files){
    files.forEach(function(file){
      if(req.files.file.filename == file){

      }
    })
  })*/

  function convertToJSON(array){
    var first = array[0].join()
    var headers = first.split(',');

    var jsonData = [];
    for ( var i = 1, length = array.length; i < length; i++ )
      {
        //RE WRITE LOOP - ADDING TOO MUCH
        var withComma = array[i]
        var withOutComma = []
        for(var x in withComma){
          withOutComma.push(withComma[x].replace(/,/g,""))
        }
        var myRow = withOutComma.join();
        console.log(myRow)
        //var myRow = array[i].join()
        var row = myRow.split(',');

        var data = {};
        for ( var x = 0; x < row.length; x++ )
          {
            data[headers[x]] = row[x];
          }
          data['lat'] = null
          data['lng'] = null
          jsonData.push(data);

        }
        return jsonData;
      }

      var xls_file = req.files.file.path.toString();
      xls(xls_file, function(err,data){
        if(err) throw err;

        var data_for_map = JSON.stringify(convertToJSON(data));
        //var data_for_client = JSON.stringify(data) //this is raw data before conv
        res.json(data_for_map)
        /*fs.writeFile('test_file.json',data_for_map,function(err){
          if (err) return console.log(err);
        })*/
      })
}
