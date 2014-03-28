var config = require('./config');
var kiwi = require('./lib/kiwi');
var nano = require('nano')(config.cloudant.authenticatedUrl);

nano.db.list(function(err, body) {
  if (err) return console.log(err);

  if (body.indexOf(config.cloudant.database) === -1) {
    createKiwiDatabase();
    storeKiwiData();
  } else {
    storeKiwiData();
  }
});

function createKiwiDatabase() {
  nano.db.create(config.cloudant.database, function(err, body) {
    if (err) return console.log(err);
    console.log('Database ' + config.cloudant.database + ' created');
  });
}

function storeKiwiData() {
  kiwi.listen(config, function(data) {
    var kiwiDB = nano.use('kiwi');

    kiwiDB.insert(data, function(err, body) {
      if (err) return console.log(err);
      process.stdout.write('.');
    })
  });
}
