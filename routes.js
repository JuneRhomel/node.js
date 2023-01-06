
exports.index = function (req, res) {
   message = " ";
   if (req.method == "POST") {
      var post = req.body;
      var name = req.user_name;
      var pass = req.password;
      var fname = req.first_name;
      var lname = req.last_name;
      var mob = req.mob_no;

      if (!req.files)
         return res.status(400).send('No FIle were upload.')

      var file = req.files.uploaded_image;
      var fileType = file.mimetype
      var img_name = file.name;

      if (fileType == 'image/jpeg' || fileType == 'image/png' || fileType == 'image/gif') {
         console.log('send')
         file.mv('public/images/upload_images/' + file.name, function (err) {

            if (err)
               return res.status(500).send(err);
                  var sql = "INSERT INTO `node-table`(`id`, `first-name`, `last-name`, `profile`, `number`, `username`, `password`) VALUES (' "+ fname +" ','"+ lname + "', '"+   img_name  + "', '" + name   + "', '"+  name   + "', '" + pass + "' )"

                  var query = db.query(sql, function(err, result) {
                     // error insertId
                     res.redirect('profile/'+ result.insertId);
                  })

         })
      }else{
         message =  'this fromat is not allowd , please upload with .png .jpeg and .gif';
         res.render('index.ejs', {message: message});
      }

   }else {
      res.render('index');
   }
}

exports.profile = function(req, res) {
   var message = '';
   var id = req.params.id;
   var sql = "SELECT * FROM `node-table` WHERE `id` = '" + id +"' ";
   db.query(sql, function(err, result) {
      if(result.length <= 0)
      message = "Profile not Found!"

      res.render('profile.ejs',{data:result, message,message});
   })
}