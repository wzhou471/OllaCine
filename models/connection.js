var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
}

mongoose.connect('mongodb+srv://wzhou:vR21soAYsWEnwjPN@cluster0-3szkh.mongodb.net/OllaCine?retryWrites=true&w=majority',
    options,    
    function(err) {
        console.log(err);
    }
);

module.exports = mongoose