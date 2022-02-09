const request = require('request');
const args = process.argv.slice(2);
const fs = require('fs');
const readline = require('readline');

let r1 = readline.createInterface(process.stdin, process.stdout);
[ url, path] = args;
// console.log(url, path);


request(url, (error, response, body) => {
  console.log('statusCode:', response && response.statusCode);
  if(error)
    console.log('error:', error);
  else {
    if(response.statusCode !== 200) return;
    if(fs.existsSync(path)) {
      r1.question('The file path you provide already exists, do you want to overwrite? type Y and enter to agree:', (answer) => {
        if(answer === 'Y') {
          writeFiles(path, body);
        } else {
          return;
        }
      })
    } else {
      fs.writeFiles(path, body);
    }
  }
  
  // console.log('body:', body);
})

function writeFiles(path, body) {
  fs.writeFile(path, body, (err) => {
    if(err)
      console.log(err);
    else {
      console.log(`Donwloaded and saved ${body.length} bytes to ${path}`);
      return;
    }
  })
}



