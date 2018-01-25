const express = require('express');
const expressVue = require('express-vue');
const schedule = require('node-schedule');
const fetch = require('isomorphic-fetch');
const path = require('path');
const controller = require('./models/index');
const aer = require('./crawlers/aer');
const spoj = require('./crawlers/spoj');

const app = express();
const PORT = process.env.PORT || 3000;

const vueOptions = {
  rootPath: path.join(__dirname, './views'),
  layout: {
    start: '<div>',
    end: '</div>'
  },
  vue: {
    head: {
      title: 'Curso de Programación Competitiva',
      meta: [
        {
          style: './static/style.css'
        },
        {
          style: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
        },
        {
          script: 'https://code.jquery.com/jquery-3.2.1.slim.min.js'
        },
        {
          script: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js'
        },
        {
          script: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js'
        },
      ]
    }
  }
};

const expressVueMiddleware = expressVue.init(vueOptions);
app.use(expressVueMiddleware);

app.get('/', async(req, res) => {
  const problems = await controller.getProblemsFromCategory('SEMANA 1');
  const users = await controller.getUsers();
  const users_problems = await controller.getUserProblemsFromCategory('SEMANA 1');
  const rows = [];
  const cols = [];
  const matrix = new Array(users.length)
    .fill(null)
    .map(() => new Array(problems.length));
  users.forEach(user => {
    rows.push(user.identifier);
  });
  problems.forEach(problem => {
    cols.push({ url: problem.url, code: problem.problem_code });
  });
  users.forEach((user, i) => {
    problems.forEach((problem, j) => {
      matrix[i][j] = users_problems.some((user_prob) => {
        return user_prob.users.identifier === user.identifier &&
          problem.url === user_prob.problems.url && user_prob.solved;
      });
    });
  });
  const data = {
    category: 'SEMANA 1',
    problems,
    cols,
    rows,
    matrix
  };
  res.renderVue('main', data, { head: { title: 'Training Info' } });
});

app.listen(PORT, () => {
  console.log('Server is on');
});

schedule.scheduleJob('*/20 * * * *', async() => {
  const aer_users = (await controller.getUsers()).map(user => user.aer_handler);
  const spoj_users = (await controller.getUsers()).map(user => user.spoj_handler);
  const aer_problems = (await controller.getProblems()).filter(p => p.domain === 'AER').map(p => p.problem_code);
  const spoj_problems = (await controller.getProblems()).filter(p => p.domain === 'SPOJ').map(p => p.problem_code);
  const aer_responses = (await aer.crawl(aer_users, aer_problems)).reduce((a,b) => a.concat(b), []);
  await Promise.all(aer_responses.map(async(response) => {
    if(response.solved){
      return await controller.solveProblem(response.problem_code, response.domain, response.user);
    }
    return Promise.resolve(null);
  }));
  const spoj_responses = (await spoj.crawl(spoj_users, spoj_problems)).reduce((a,b) => a.concat(b), []);
  await Promise.all(spoj_responses.map(async(response) => {
    if(response.solved){
      return await controller.solveProblem(response.problem_code, response.domain, response.user);
    }
    return Promise.resolve(null);
  }));
});
