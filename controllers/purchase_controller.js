const { v4: uuidv4 } = require('uuid');
const db = require('../config/db')
const { executeQuery, executeInsert } = require('../config/db')

async function getPurchaseList(req, res, next){
    try{
        console.log('get purchased content for'+req.user.email)
        let query =  "SELECT content_id FROM purchased_content where email = '"+req.user.email+"'";
        const result = await executeQuery(query);
        console.log("query result"+result)
        res.send(result)
    }catch(err){
        console.error('getMyList function error:', err);
        next(err)
    }
}

async function updatePurchaseContent(req, res, next){
    try{
        console.log('update purchased content for'+req.user+'-'+req.body);
        const purchaseId = req.body.purchaseId;
        const contentId = req.body.contentId;
        const uuid = uuidv4();
        if(contentId && purchaseId){
            const email = req.user.email
            const insertValues = { param1: uuid, param2: email, param3: purchaseId, param4: contentId };
            console.log(insertValues)
            let insertQuery = "insert into purchased_content (id, email, purchase_id, content_id) values (@param1, @param2, @param3, @param4)"
            let insertResult = await executeInsert(insertQuery,insertValues);
            if(insertResult){
                res.send("purchased content updated")
            }else{
                res.send("-1")
            }
        }else{
            console.error('invalid request');
            res.send("invalid request");
        }
        
    }catch(err){
        console.error('updatePurchaseContent function error:', err);
        next(err)
    }
}

module.exports = {
    getPurchaseList,
    updatePurchaseContent
  };