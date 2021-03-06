var express = require('express');
const app = express();

app.put('/message/:id', (req, res) => {
    sha1 = require('crypto')
            .createHash('sha1')
            .update(new Date().toDateString() + req.params.id)
            .digest('hex');
    res.end(sha1);
});
const port = process.argv[2] || 3000;
app.listen(port);