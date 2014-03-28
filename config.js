var config = {}

// check if server is running on BlueMix
if (process.env.VCAP_SERVICES) {
  // parse VCAP_SERVICES credentials for Cloudant
  var vcapJson = JSON.parse(process.env.VCAP_SERVICES);
  var vcapCredentials = vcapJson.user-provided[0].credentials;
}

config.cloudant = {};
config.kiwi = {};

if (vcapCredentials) {
  config.cloudant.username = vcapCredentials.username;
  config.cloudant.password = vcapCredentials.password;
  config.cloudant.database = vcapCredentials.database;
} else {
  loadEnvFile();
  config.cloudant.username = process.env.CLOUDANT_USERNAME;
  config.cloudant.password = process.env.CLOUDANT_PASSWORD;
  config.cloudant.database = process.env.CLOUDANT_DATABASE;

}
config.cloudant.authenticatedUrl = 'https://' +
                                      config.cloudant.username + ':' +
                                      encodeURIComponent(config.cloudant.password) +
                                      '@' + config.cloudant.username + '.cloudant.com';

config.kiwi.deviceId = process.env.KIWI_DEVICE_ID;
config.kiwi.password = process.env.KIWI_PASSWORD;
config.kiwi.socketUrl = 'http://build.kiwiwearables.com:8080';

module.exports = config;

function loadEnvFile() {
  var fs = require('fs');

  var env = fs.readFileSync('.env', 'utf-8');
  var envVars = env.split("\n");

  for (var index in envVars) {
    var keyValue = envVars[index].split('=');
    if (keyValue.length == 2) {
      process.env[keyValue[0]] = keyValue[1];
    }
  }
}
