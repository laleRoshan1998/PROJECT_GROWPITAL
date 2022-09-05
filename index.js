const request = require('request')
const fs = require('fs')
const cheerio = require('cheerio')
const input = require('readline-sync')

//// in order to get al links in this file
// const writeLinks = fs.createWriteStream('imageLinks.txt', 'utf8');


const URL = input.question('Enter the url:- ')


request (URL, async (err, res, html)=>{
    const all_data_URL = []
    if(err) return 'Request failed';
    console.log("Request is a successfully........");
    const data = cheerio.load(html)

    await data('img').each((index, image)=>{
        let imgLink = data(image).attr('src')  //extracting links of the image

        //// to get image links in a text file
        // const links = imgLink.concat('\n');
        // writeLinks.write(links);

        if(imgLink.search('http')){  //if found http in URL
            imgLink = URL.concat(imgLink)
            // console.log(imgLink);
        }
        all_data_URL.push(imgLink)
        console.log(all_data_URL);
    })

    const all_URL = new Set (all_data_URL)  //filter duplicate images/urls
    console.log([... all_URL]);
    [... all_URL].forEach((link, index)=>{
        const imageExt = link.slice(link.lastIndexOf('.'))  //extracting extension of image
        download(link, index.toString().concat(imageExt));
    })
})
const download = (url, filename) => {
    request.head(url, () => {
        request(url).pipe(fs.createWriteStream('./Images/'.concat(filename)));
    });

};




