import path from 'path';

import feathers from 'feathers';
import feathersHooks from 'feathers-hooks';
import feathersRest from 'feathers-rest';
import feathersSocketio from 'feathers-socketio';
import feathersConfiguration from 'feathers-configuration';

import setup from './app.setup';
import services from './services';
import middleware from './middleware';
import hooks from './hooks';

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

export default app;
