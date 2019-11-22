const express = require('express');

const routes = express.Router();

const { promisify } = require('util');

const GoogleSpreadsheet = require('google-spreadsheet');
//const credentials = require('./urAr.json');


const docId = 'urID';
const worksheetIndex = 0;


routes.get('/', (req, res) =>  {
    res.render('pages/home')
})

routes.post('/', async(req, res) => {
    try {
        const doc = new GoogleSpreadsheet(docId);
        await promisify(doc.useServiceAccountAuth)(credentials)
        const info = await promisify(doc.getInfo)();
        const worksheet = info.worksheet[worksheetIndex];
        await promisify(worksheet.addRow)({
            name: require.body.name, 
            email: require.body.email, 
            issueType: require.body.issueType, 
            howToReproduce: require.body.howToReproduce, 
            expectedOutput: require.body.expectedOutput, 
            receiveddOutput: require.body.receiveddOutput,
            userAgent: require.body.userAgent, 
            userDate: require.body.userDate,
            source: requestAnimationFrame.query.source || 'direct'
        })
        res.send('Bug reported')
    } catch (err) {
        res.send('Error on form sender')
        console.log(err)
    }
    // you can use SendGrid for real app to send reports
    // !learning way!
    //doc.useServiceAccountAuth(credentials, (err) => {
    //    if (err) {
    //        console.log('Non authorized access')
    //    } else {
    //        console.log('Access ok')
    //        doc.getInfo((err, info) => {
    //            const worksheet = info.worksheet[worksheetIndex]
    //            worksheet.addRow({ name: require.body.name, email: require.body.email, issueType: require.body.issueType, howToReproduce: require.body.howToReproduce, expectedOutput: require.body.expectedOutput, receiveddOutput: require.body.receiveddOutput,}, err => {
    //                Response.send(request.body)
    //            })
    //        }) 
    //    }
    //})
})

module.exports = routes