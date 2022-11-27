const BP = require('bp-api')

const bp = new BP('testssa136.bpium.ru','awedxzxdew@mail.ru', 'qwertytrewq', 'https', 30000)

var catalogId=12


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
    console.log(result) 
    console.log(result[0].values) 
    console.log(result[1].values)
})