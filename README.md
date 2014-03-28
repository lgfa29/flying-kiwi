# Flying Kiwi
`Flying Kiwi` is a test project to store [Kiwi](http://kiwiwearables.com) data
on the cloud using [Cloudant](https://cloudant.com/) as the data layer.

# Setup
The first step is to install the project's dependencies with `npm install`.

Next create a `.env` file in the root directory with your Kiwi and Cloudant
credentials. A sample file is provided in `env.sample`.

Now you are ready to run the app, just type `node app.js` and all your Kiwi
data will be stored in your Cloudant database.
