const PORT = 8080;
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { check, validationResult} = require('express-validator')
const Client = require("@replit/database");
const db = new Client();





// Middleware
app.use(cors())

app.use(express.urlencoded({
  extended: false
})); 

app.use(express.json({ limit: '1mb' }));

var urlencodedParser = bodyParser.urlencoded({
  extended: false
})

app.use(express.static('client'));

app.set('view-engine', 'ejs')


// Initlialize necessary packages, variables
const solanaweb3 = require("@solana/web3.js");
const searchpoint = process.env['endpoint'];
const solanaConnection = new solanaweb3.Connection(searchpoint)
var count = 0;
const users = []

// Sends index.html to homepage
app.get('/',(req,res) => {
  res.render('index.ejs')
});

// app.get('/results',(req,res) => {
//   res.render('results.ejs')
// });

// Post to API

app.post('/results', urlencodedParser, [
  check('tokenAddress', 'Please enter valid characters')
    .exists()
    .isLength({ min:43, max: 44})
], (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array())
  }
  var array = [];
  var tAddress = req.body.tokenAddress;
  
  // Function to get transaction data from Solana and calculates tokens leftover for querried NFT
  
  const getTransactions = async(address, numTx) => {
  
    if (tAddress == '41hh8vhJUV6zYEvRkFZoChuiYY3qTfWLjGqgwvQUyCyq' || tAddress == '5epnk3stUF9gJWp9BBLqnC1jXnDR7UjC59r2WMosvrRY' || tAddress == '3V3R3t9g3YP61Bpfw9PfgCFiSHeMifAajCeeM4gvHpxW' || tAddress == '7bBqBxCNaYgtaLmGSoaUSJfsfBrWSbW5sesWU8GM6hMe' || tAddress == '9PsEQ8kTDmEu7goDvCYEwhnWkjpN2QETFHSUrEXghjMT' || tAddress == '8qBpozmCj8WhFEetGAH3NtV4Jeky8FTyYB3J42EQLthQ' || tAddress == 'F3qU2YK5SQyCSKjy8nvE48y81WqBZ3kdKRQZhtteAsBK' || tAddress == 'AZgXR8y41MG3pTJFZUedcryXWxL1sXiXfiNzaZCh4PZE' || tAddress == 'BqET26qxYSgY4Nt7zf1GkvwRTpcb7jQqihNGW3Htv3ch' || tAddress == 'CYvzBMDh6kebUYctSAQC9E5Zj79KWdbe9rjmCj4BvrYd' || tAddress == 'CnzToHnvehvAvVpCESuwjjAANsoFaSiqAG43zWxDygRA' || tAddress == 'GjKP5BTkY6u1aTdqKizaNo2F3ifp2EYrw6ujJFYdaZa8' || tAddress == 'J4RZwn1Bcbvpa7kGW8hKeuuofcBWRBs11URfac1rh7y6' || tAddress == 'HD7GcAemGLUQCabPNApgmVDjis8eJUYfT8Uk86aMZgmJ' || tAddress == '3oParvX4GT3dRGY3FGtNRXBj81w28AXTfwhuNn8i4dfD' || tAddress == 'HLxeSbBQca5B6SX7RZvFD6zZX1wpuJ45EcYTzLiUP7QE' || tAddress == '3SuZjzhA6vTukqEisLqKPpSdgroX45TG3Woui5ZnMY11' || tAddress == 'rXKEXcmVHMjKLJNFwfE2oDFn37rD4ouPAKkL4PTKmMV') {  

      
      const pubKey = new solanaweb3.PublicKey(address);
      let transactionList = await solanaConnection.getSignaturesForAddress(pubKey, {limit:numTx});
      let signatureList = transactionList.map(transaction=>transaction.signature);
      let transactionDetails = await solanaConnection.getParsedTransactions(signatureList);
      
      transactionList.forEach((transaction, i) => {
        const date = new Date(transaction.blockTime*1000);
        const transactionInstructions = transactionDetails[i].transaction.message.instructions;
          transactionInstructions.forEach((instruction, n)=>{
              if (instruction.programId.toString().includes('DhLdVv54bx1fcZikMNySEE6pFGQkAsZsZ5m9HNtSg4g')) {
                array.push(`${date}`);  
              }
              if (instruction.programId.toString().includes('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr')) {
                array.push(`${date}`);  
              }
            });
        });
      
      const tokens = 192600;
      var tokensLeft = 0
      
      var date_object = new Date();
      var milliseconds = new Date().getTime();
      
      array.forEach(timeDate)
      
      function timeDate(item, index, arr) {
        arr[index] = date_object.setTime(Date.parse(item));
      };
      
      var day = 0;
      
      if ((array.length-1)== 0) {
        day += milliseconds - array[0]
      }
      else {
        for (let x = array.length-1; x>=0; x-=2) {
            if (x <= 0) {
                day += milliseconds - array[x]
            }
            else {
                day += array[x-1] - array[x]
            }
        };
      };
      
      day = day/86400000
      
      tokensLeft = Math.round(tokens - (1070 * day))
      
       if (tokensLeft >= 0) {
         return res.json(Math.round(tokensLeft))
       };
      
       if (tokensLeft < 0) {
         return res.json("none")
      };

      
      
    } else if ( tAddress == '4Dvr5s72qwpsh81XHfkug7tjZK3eQG7GXrCiNUQV8r5J' || tAddress == 'Hk2WtGZWf9PcxEJrnXdU8Xv76svZ5Yx96doQKKMZdYjX') {  

      
      const pubKey = new solanaweb3.PublicKey(address);
      let transactionList = await solanaConnection.getSignaturesForAddress(pubKey, {limit:numTx});
      let signatureList = transactionList.map(transaction=>transaction.signature);
      let transactionDetails = await solanaConnection.getParsedTransactions(signatureList);
      
      transactionList.forEach((transaction, i) => {
        const date = new Date(transaction.blockTime*1000);
        const transactionInstructions = transactionDetails[i].transaction.message.instructions;
          transactionInstructions.forEach((instruction, n)=>{
              if (instruction.programId.toString().includes('DhLdVv54bx1fcZikMNySEE6pFGQkAsZsZ5m9HNtSg4g')) {
                array.push(`${date}`);  
              }
              if (instruction.programId.toString().includes('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr')) {
                array.push(`${date}`);  
              }
            });
        });
      const tokens = 1926000;
      var tokensLeft = 0
      
      var date_object = new Date();
      var milliseconds = new Date().getTime();
      
      array.forEach(timeDate)
      
      function timeDate(item, index, arr) {
        arr[index] = date_object.setTime(Date.parse(item));
      };
      
      var day = 0;
      
      if ((array.length-1)== 0) {
        day += milliseconds - array[0]
      }
      else {
        for (let x = array.length-1; x>=0; x-=2) {
            if (x <= 0) {
                day += milliseconds - array[x]
            }
            else {
                day += array[x-1] - array[x]
            }
        };
      };
      
      day = day/86400000
      
      tokensLeft = Math.round(tokens - (10700 * day))
      
       if (tokensLeft >= 0) {
         return res.json(Math.round(tokensLeft))
       };
      
       if (tokensLeft < 0) {
         return res.json("none")
      };

      
     
    } else {
            
      const pubKey = new solanaweb3.PublicKey(address);
      let transactionList = await solanaConnection.getSignaturesForAddress(pubKey, {limit:numTx});
      let signatureList = transactionList.map(transaction=>transaction.signature);
      let transactionDetails = await solanaConnection.getParsedTransactions(signatureList);
      
      transactionList.forEach((transaction, i) => {
        const date = new Date(transaction.blockTime*1000);
        const transactionStatus = transactionDetails[i].meta.err;
        const transactionInstructions = transactionDetails[i].transaction.message.instructions;
          transactionInstructions.forEach((instruction, n)=>{
              if (instruction.programId.toString().includes('DhLdVv54bx1fcZikMNySEE6pFGQkAsZsZ5m9HNtSg4g')  && (transactionStatus == null)) {
                array.push(`${date}`);  
              }
              if (instruction.programId.toString().includes('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr')  && (transactionStatus == null)) {
                array.push(`${date}`);  
              }
            });
        });
      const tokens = 19260;
      var tokensLeft = 0;
      
      var date_object = new Date();
      var milliseconds = new Date().getTime();
      
      array.forEach(timeDate)
      
      function timeDate(item, index, arr) {
        arr[index] = date_object.setTime(Date.parse(item));
      };
      
      var day = 0;
      
      if ((array.length-1) == 0) {
        day += milliseconds - array[0]
      }
      else {
        for (let x = array.length-1; x>=0; x-=2) {
            if (x <= 0) {
                day += milliseconds - array[x]
            }
            else {
                day += array[x-1] - array[x]
            }
        };
      };
      
      day = day/86400000
      
      tokensLeft = Math.round(tokens - (107 * day))
      
      if (tokensLeft == 19260) {
         return res.json("May contain 19260, DYOR")
      }; 
      if (tokensLeft >= 0) {
         return res.json(Math.round(tokensLeft))
       };

        if (tokensLeft < -6240) {
          return res.json("0")
        };
      
       if (tokensLeft < 0 && tokensLeft > -6240) {
         res.json("0 unless PFP upgraded then add 3120/6240 to "+tokensLeft+" confirm with team on bonus month on top of already extra month")
      };
      
    };
  };
  
  getTransactions(tAddress, 1000)

});
  

// Checking for any changes in server
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});

