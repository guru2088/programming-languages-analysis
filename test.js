const fs = require("fs")
const path = require("path")

const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push({path : path.join(__dirname, dirPath, "/", file) , ext:  file.split('.')[file.split('.').length - 1]})
    }
  })
  return arrayOfFiles
}

async function main(){

  const result = await getAllFiles(".")
  let summary = {}
  for (const [i, value] of result.entries()) {
    if(value["ext"] in summary){
      summary[value.ext]  = summary[value.ext] + 1
    }
    else{
      summary[value.ext]  = 1
    }
    if(i === result.length - 1){
      console.log ({summary : summary, results: result })
    }
  }
}

main()




//
// const fs = require('fs');
//
//
// // fs.readdir(testFolder, (err, files) => {
// //
// //   files.forEach(file => {
// //     if(!fs.lstatSync("../" + file).isDirectory()){
// //       result.push({"file" : file, "ext" :  file.split('.')[file.split('.').length - 1]})
// //     }
// //     else{
// //       console.log("Directory --- " + file)
// //
// //     }
// //   });
// //
// //   for (const [i, value] of result.entries()) {
// //     if(value["ext"] in summary){
// //       summary[value.ext]  = summary[value.ext] + 1
// //     }
// //     else{
// //       summary[value.ext]  = 1
// //     }
// //     if(i === result.length - 1){
// //       console.log({summary : summary, results: result})
// //     }
// //   }
// // });
//
//
//  function listfiles(path){
//     console.log("---------------" , path)
//     let result  = []
//     let summary = {}
//     let dirs = []
//     var promise=new Promise(function(resolve, reject) {
//       fs.readdir(path, (err, files) => {
//         console.log(files)
//         files.forEach(file => {
//           console.log(path + "/"+  file)
//           if(!fs.lstatSync(path + "/"+  file).isDirectory()){
//             result.push({"file" : path + "/"+  file, "ext" :  file.split('.')[file.split('.').length - 1]})
//           }
//           else{
//             dirs.push(file)
//
//           }
//         });
//         for (const [i, value] of result.entries()) {
//           if(value["ext"] in summary){
//             summary[value.ext]  = summary[value.ext] + 1
//           }
//           else{
//             summary[value.ext]  = 1
//           }
//           if(i === result.length - 1){
//             resolve ({summary : summary, results: result , dirs: dirs})
//           }
//         }
//       });
//     });
//     return promise;
// }
//
// async function main(){
//   var results = await listfiles(".");
//
//   console.log(results)
//   console.log(results["dirs"])
//
//   for (const [i, value] of results["dirs"].entries()) {
//     console.log(i,value)
//     if(value !== ".git"){
//       var final_results = await listfiles(value);
//       console.log(final_results)
//     }
//
//   }
//
// }
//
//
// main()
