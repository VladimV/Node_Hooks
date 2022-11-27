const BP = require('bp-api')



//const bp = new BP('testssa13.bpium.ru','testssa13', 'qwertytrewq', 'https', timeout(30000))
//const bp = new BP('testssa13.bpium.ru','v1234v@mail.ru', 'qwertytrewq', 'https', 30000)
const bp = new BP('testssa136.bpium.ru','awedxzxdew@mail.ru', 'qwertytrewq', 'https', 30000)

var catalogId=11


const records = bp.getAllRecords(catalogId, {
    //filters: [
    //  {
    //    fieldId: 1,
    //    //value: [1]
    //    value: 1
    //  }
    //]
})

console.log(records);

records.then(function(result) {
    //var parse=JSON.parse('{a:1}')
    //var parse=JSON.parse(result)
    //console.log(parse) 
    //console.log(result.toString()) 
    console.log(result) 
    console.log(result[0].values) 
    console.log(result[0].values['1'])
})


//bp.patchRecord(catalogId, records[0].id, {
//  3: [{catalogId:2, recordId: 3}]
//})


var recordId=1


 //bp.patchRecord(catalogId, recordId, {
 //   '1':['2']
 //})



catalogId=12
bp.postRecord(catalogId,{
    '1': new Date().toISOString(),
    '2': [
        {
            //sectionId: '2',
            catalogId: '11',
            //catalogTitle: 'Заказы',
            //catalogIcon: 'content-11',
            recordId: '2',
            //recordTitle: '444444',
            //isRemoved: false
        }
    ],
    '3': 'Комм'
})

 //@param {int|string} catalogId id каталога в который будет добавлена запись
 //  * @param {Object} data Данные для добавления в bpium {"2": "test text", "3": [1,2]}
 //  * @returns идентификатор созданной записи, пример - {"id": "31015"}
 //  */
 // async postRecord(catalogId, data = {}) {

