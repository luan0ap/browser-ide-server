const path = require('path');

const feathers = require('feathers');
const feathersHooks = require('feathers-hooks');
const feathersRest = require('feathers-rest');
const feathersSocketio = require('feathers-socketio');
const feathersConfiguration = require('feathers-configuration');

const setup = require('./app.setup');
const services = require('./services');
const middleware = require('./middleware');
const hooks = require('./hooks');

const app = feathers();
app.configure(feathersConfiguration(path.join(__dirname, '..')));
app.configure(setup);

app.use('/', feathers.static(app.get('public')));

app.configure(feathersHooks());
app.configure(feathersRest());
app.configure(feathersSocketio());
app.configure(services);
app.configure(middleware);
app.hooks(hooks);

module.exports = app;
