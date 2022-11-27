const BP = require('bp-api')

var http = require('http');
var https = require('https');
var textBody = require("body");
var crypto = require('crypto');

http.createServer(function (req, res, opts) {
    textBody(req, function (err, body)  {

	    var parse=JSON.parse(body)

        var zakaz_catalogId=parse.payload.catalogId
        console.log(zakaz_catalogId)
        var zakaz_recordId=parse.payload.recordId
        console.log(zakaz_recordId)

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
                            catalogId: zakaz_catalogId,
                            recordId: zakaz_recordId,
                        }
                    ],
                    '3': zakaz_comment
                })
                break
            default:
                console.log(parse.hook.event + ' - нет обработчика')
        }
    });

    res.end();

}).listen(8085);


