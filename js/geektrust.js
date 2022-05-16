const { ProcessWaterManagement } = require('./processWaterManagement');

fs = require('fs');
const filename = process.argv[2];



fs.readFile(filename, 'utf8', function (err, data) {
    const processWaterManagement = new ProcessWaterManagement();
    if (err) {
        return console.log(err);
    }
    processWaterManagement.populateWaterInput(data);
});