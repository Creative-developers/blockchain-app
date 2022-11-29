const express = require('express')
const http = require('http')
const cors = require('cors')
const  puppeteer  = require('puppeteer')
require('dotenv').config();

const app = express()
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;


app.use(cors());

//using puppeteer to scrap the content of the website to get the address and their balance.

async function getTopAddresses(){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://explorer.btc.com/stats/rich-list')

    const grabAddresses = await page.evaluate(() => {
        const addressData = document.querySelectorAll('.diff-history tbody tr')
        let addressArr = []
        addressData.forEach((element,i) => {
           if(i!==0 && i <=5){
               let address = element.querySelector('.txio-address a').innerText
               let balance = element.querySelector('td:nth-child(3)').innerText
               
               addressArr.push({
                address,
                balance
               })

           }
        })
        return addressArr
    })
    await browser.close();
    return grabAddresses;
   
}

app.get('/api/getAdddresses', async (req, res) => {
    await getTopAddresses().then(addaresses => {
      return res.json(addaresses)
    })
});


server.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`);
});

process.on('unhandledRejection', err => {
    console.log(`An Error occured: ${err.message}`);
    server.close(() => process.exit(1));
})