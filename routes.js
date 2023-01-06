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
      var img_name = file.name;

      if (file.minetype == 'image/jpeg' || file.minetype == 'image/png' || file.minetype == 'image/gif') {

         file.mv('public/image/upload_images/' + file.name, function (err) {

            if (err)
               return res.status(500).send(err);
                  var sql = "INSERT INTO `node-table`(`id`, `first-name`, `last-name`, `profile`, `number`, `username`, `password`) VALUES (' "+ fname +" ','"+ lname + "', '"+ mob + "', '" + name + "', '"+ pass + "', '" + img_name + "' )"

                  var query = db.query(sql, function(err, result) {
                     res.redirect('/profile/'+result.insertID);
                  })

         })
      }else{
         message =  'this fromat is not allowd , please upload with .png .jpeg and .gif';
         res.render('index.ejs', {message:message});
      }

   }else {
      res.render('index');
   }
}