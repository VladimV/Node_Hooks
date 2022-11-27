const BP = require('bp-api')
//console.log('Привет от JavaScript!');

/*
const http = require("http"); 
//create a server object: 
http 
.createServer(function (req, res) { 
 res.write("<h1>Hello World!</h1>");
 res.write(req.url);
 res.write("end");
 //write a response to the client 
 
 res.end();
  //end the response 
  console.log('Привет от JavaScript!');
 }) 
 .listen(8083);
//Server runs on localhost:8083 
*/

var http = require('http');
var https = require('https');
var textBody = require("body");
var crypto = require('crypto');

http.createServer(function (req, res, opts) {
	console.log('--------------------------------------------------');
	secretKey='12345'
    textBody(req, function (err, body)  {
        var hmac = crypto.createHmac( 'md5', secretKey );
        hmac.setEncoding('base64');
        hmac.write( body );
        hmac.end();
        signature = hmac.read();

	    console.log(body);
	  



	    var parse=JSON.parse(body)
	    

        var zakaz_catalogId=parse.payload.catalogId
        console.log(zakaz_catalogId)
        var zakaz_recordId=parse.payload.recordId
        console.log(zakaz_recordId)

        console.log(parse.payload.values['1'])

        const bp=new BP('testssa136.bpium.ru','awedxzxdew@mail.ru','qwertytrewq','https',30000)

        switch(parse.hook.event) {
            case 'record.updating' :


                if(zakaz_recordId!=undefined) { // Изменение записи, а не создание. При создании тоже вызывается с recordId==undefined
                    https.get('https://test.bpium.ru/api/webrequest/request',(resp) => {
                        let data='';

                        resp.on('data',(chunk) => {
                            data+=chunk;
                        });

                        resp.on('end',() => {
                            var val=JSON.parse(data).value
                            console.log(val);
                            bp.patchRecord(zakaz_catalogId,zakaz_recordId,{
                                '2': [val]
                            })
                        });

                    }).on("error",(err) => {
                        console.log("Error: "+err.message);
                    });
                }

                break
            case 'record.created' :
                catalogId=12
                var zakaz_comment=parse.payload.values['2']
                bp.postRecord(catalogId,{
                    '1': new Date().toISOString(),
                    '2': [
                        {
                            //sectionId: '2',
                            catalogId: zakaz_catalogId,
                            //catalogTitle: 'Заказы',
                            //catalogIcon: 'content-11',
                            recordId: zakaz_recordId,
                            //recordTitle: '444444',
                            //isRemoved: false
                        }
                    ],
                    '3': zakaz_comment
                })
                break
            default:
                console.log(parse.hook.event + ' - нет обработчика')
        }
/*
        https.get('https://test.bpium.ru/api/webrequest/request', (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                console.log(JSON.parse(data).value);
            });

        }).on("error", (err) => {
                console.log("Error: " + err.message);
        });
*/





	    //console.log(body.payload.values['1']);


        // ...
	    //console.log(req.body);
    });

    res.end();
    console.log('..................                    ....................');

}).listen(8085);


