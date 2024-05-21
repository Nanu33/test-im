// /* eslint-disable */
// const fs = require('fs');
// const packageJson = require('./package.json');
 
// const appVersion = packageJson.version;
 
// const jsonData = {
//  version: appVersion
// };
 
// var jsonContent = JSON.stringify(jsonData);
// console.log("JsonDAta" + jsonContent)
 
// fs.writeFile('./public/meta.json', jsonContent, 'utf8', function(err) {
//  if (err) {
//    console.log('An error occured while writing JSON Object to meta.json');
//    return console.log(err);
//  }
 
//  console.log('meta.json file has been saved with latest version number');
// });


// // /* eslint-disable */
// // const fs = require('fs');
// // const packageJson = require('./package.json');
 
// // const appVersion = packageJson.version;
 
// // const jsonData = {
// //  version: appVersion
// // };
 
// // var jsonContent = JSON.stringify(jsonData);
// // console.log("JsonDAta" + jsonContent)
 
// // fs.writeFile('./public/meta.json', jsonContent, 'utf8', function(err) {
// //  if (err) {
// //    console.log('An error occured while writing JSON Object to meta.json');
// //    return console.log(err);
// //  }
 
// //  console.log('meta.json file has been saved with latest version number');
// // });

// // /* eslint-disable */
// // const fs = require('fs');
// // const packageJson = require('./package.json');

// // const appVersion = packageJson.version;

// // const jsonData = {
// //   version: appVersion
// // };

// // const jsonContent = JSON.stringify(jsonData);

// // // Write to the public folder
// // fs.writeFile('./public/meta.json', jsonContent, 'utf8', function(err) {
// //   if (err) {
// //     console.error('An error occurred while writing JSON Object to meta.json in the public folder');
// //     return console.error(err);
// //   }

// //   console.log('meta.json file has been saved with the latest version number in the public folder');
// // });

// // // Write to the build folder
// // const buildDir = './build';
// // if (!fs.existsSync(buildDir)) {
// //   fs.mkdirSync(buildDir);
// // }

// // fs.writeFile(`${buildDir}/meta.json`, jsonContent, 'utf8', function(err) {
// //   if (err) {
// //     console.error('An error occurred while writing JSON Object to meta.json in the build folder');
// //     return console.error(err);
// //   }

// //   console.log('meta.json file has been saved with the latest version number in the build folder');
// // });

// /* eslint-disable */
// const fs = require('fs');
// const packageJson = require('./package.json');
 
// const appVersion = packageJson.version;
 
// const jsonData = {
//  version: appVersion
// };
 
// var jsonContent = JSON.stringify(jsonData);
// console.log("JsonDAta" + jsonContent)
 
// fs.writeFile('./public/meta.json', jsonContent, 'utf8', function(err) {
//  if (err) {
//    console.log('An error occured while writing JSON Object to meta.json');
//    return console.log(err);
//  }
 
//  console.log('meta.json file has been saved with latest version number');
// });

/* eslint-disable */
const fs = require('fs');
const packageJson = require('./package.json');

const appVersion = packageJson.version;

const jsonData = {
  version: appVersion
};

const jsonContent = JSON.stringify(jsonData);

// Write to the public folder
fs.writeFile('./public/meta.json', jsonContent, 'utf8', function(err) {
  if (err) {
    console.error('An error occurred while writing JSON Object to meta.json in the public folder');
    return console.error(err);
  }

  console.log('meta.json file has been saved with the latest version number in the public folder');
});

// Write to the build folder
const buildDir = './build';
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

fs.writeFile(`${buildDir}/meta.json`, jsonContent, 'utf8', function(err) {
  if (err) {
    console.error('An error occurred while writing JSON Object to meta.json in the build folder');
    return console.error(err);
  }

  console.log('meta.json file has been saved with the latest version number in the build folder');
});

