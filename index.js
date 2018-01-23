const express = require('express');
const expressVue = require('express-vue');
const schedule = require('node-schedule');
const fetch = require('isomorphic-fetch');
const path = require('path');
const controller = require('./models/index');

const app = express();
const PORT = process.env.PORT || 3000;

const vueOptions = {
  rootPath: path.join(__dirname, './views'),
  layout: {
    start: '<div>',
    end: '</div>'
  }
};

const expressVueMiddleware = expressVue.init(vueOptions);
app.use(expressVueMiddleware);

app.get('/', async(req, res) => {
  const problems = await controller.getProblemsFromCategory('SEMANA 1');
  const data = {
    category: 'SEMANA 1',
    problems
  };
  res.renderVue('main', data, { head: { title: 'Training Info' } });
});

app.listen(PORT, () => {
  console.log('Server is on');
});
