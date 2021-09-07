 
 import http from 'http'; 
 import fs from 'fs'; 
 import path from 'path'; 
  
 
 const serverPath = path.dirname(process.argv[1]); 
 const homeworks = JSON.parse(fs.readFileSync(path.join(serverPath, 'static', 'homeworks.json'), 'utf-8')); 

  
 const PORT = 5000; 
  
 const server = http.createServer((req, res) => { 
     if (req.url === '/homework' || req.url === '/homework/') { 
         res.write(` 
         <!DOCTYPE html> 
             <html lang="en"> 
             <head> 
                 <meta charset="UTF-8"> 
                 <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
                 <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
                 <title>Document</title> 
                 <link rel="stylesheet" href="/styles/style.css">
                 <link rel="icon" href="data:;base64,iVBORw0KGgo=">
             </head> 
             <body> 
                 <ol> 
         `); 
         homeworks.forEach(homework => { 
             res.write(`<li><a href="/homework/${homework._id}">${homework.title}<a/></li>`); 
         }); 
  
         res.write(` 
                 </ol> 
             </body> 
         </html> 
         `); 
         
         res.end(); 
     }else if(req.url.split('/')[2] !== ''){
         let idHM = req.url.split('/')[2];
         res.write(` 
         <!DOCTYPE html> 
             <html lang="en"> 
             <head> 
                 <meta charset="UTF-8"> 
                 <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
                 <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
                 <title>Document</title> 
                 <link rel="stylesheet" href="/styles/style.css">
                 <link rel="icon" href="data:;base64,iVBORw0KGgo=">
             </head> 
             <body>
             `);
             homeworks.filter(function(homework){
                 if(homework._id === idHM){
                     res.write(`<div>${homework.description}</div>`);
                 }
             }); 
             res.write(` 
          </body> 
        </html> 
     `);
       res.end();      
     }else { 
  
         const indexPath = path.join(serverPath, 'static', req.url); 
  
         fs.readFile(indexPath, (err, htmlContent) => { 
             if (err) { 
                 res.statusCode = 400; 
                 res.end(); 
             } 
             console.log(`sending ${req.url} ${htmlContent.length} bytes`); 
             res.end(htmlContent); 
         }); 
     } 
 }); 
  
 server.listen(PORT, () => { 
     console.log('Server is running ' + PORT); 
 });