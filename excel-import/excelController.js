const User = require("./excelModel");
const csv = require("csvtojson");
const xlsx = require('xlsx');
const fs = require('fs');

const importExcel = async (req, res) => {
    try {
        var userData = [];

        const workbook = xlsx.readFile(req.file.path);
        const sheet_name_list = workbook.SheetNames;
        const data = xlsx.utils.sheet_to_csv(workbook.Sheets[sheet_name_list[0]]);
        fs.writeFileSync(req.file.path, data, 'utf-8');

        try {
            csv().fromFile(req.file.path).then(async (response) => {
                for (let x = 0; x < response.length; x++) {
                    userData.push({
                        name: response[x].name,
                        email: response[x].email,
                        phone: response[x].phone
                    })
                }

                await User.insertMany(userData);
            })
        } catch (error) {
            res.send({ status: 400, success: false, msg: error.message });

        }
        res.send({ status: 200, success: true, msg: "running" });
    } catch (error) {
        res.send({ status: 400, success: false, msg: error.message });
    }
}

module.exports = importExcel;