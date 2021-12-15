var express = require('express');
var app = express();
const http = require('http');
const getfilelist = require("google-drive-getfilelist");

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  var folder_id = req.query['folder_id'];
  getfilelist.GetFileList(
    {
      auth: "AIzaSyClNXOohHrbsQFYrz_jx_c_sVH9ry8Ec1M",
      fields: "files(id)",
      id: folder_id,
    },
    (err, resp) => {
      if (err) {
        console.log(err);
        res.render('home', {
           file_list:[] 
        });
        return;
      }
      const fileList = resp.fileList.flatMap(({ files }) => files);
      res.render('home2', {
         file_list:fileList 
      });
    }
  );
});

app.listen(process.env.PORT || 5000);
