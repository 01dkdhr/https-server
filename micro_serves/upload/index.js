var path = require('path'),
    fs = require('fs'),
    formidable = require('formidable');

module.exports = {
    onRequest(req, res) {
        if (req.url == '/micro-serves/upload') {
            res.writeHead(200, {'content-type': 'text/html'});
            res.end(
                '<form action="upload/uploadfile" enctype="multipart/form-data" method="post">'+
                '<input type="text" name="title"><br>'+
                '<input type="file" name="upload" multiple="multiple"><br>'+
                '<input type="submit" value="Upload">'+
                '</form>'
            );
        } else if (req.url == '/micro-serves/upload/uploadfile') {
            var form = new formidable.IncomingForm(),
            files = [],
            fields = [];

            form.uploadDir = path.join(__dirname, 'upload_files');

            form
                .on('field', function(field, value) {
                    console.log(field, value);
                    fields.push([field, value]);
                })
                .on('file', function(field, file) {
                    console.log(field, file);
                    files.push([field, file]);
                })
                .on('end', function() {
                    console.log('-> upload done');
                    // 重命名
                    files.forEach((item) => {
                        const file = item[1];
                        var newPath = path.join(__dirname, file.name);
                        if (fs.existsSync(newPath)) {
                            fs.unlinkSync(newPath);
                        }
                        fs.rename(file.path, newPath);
                        file.path = newPath;
                    });
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.write('received fields:\n\n '+JSON.stringify(fields, null, 4));
                    res.write('\n\n');
                    res.end('received files:\n\n '+JSON.stringify(files, null, 4));
                });
            form.parse(req);
        } else {
            res.writeHead(404, {'content-type': 'text/plain'});
            res.end('404');
        }
    }
};