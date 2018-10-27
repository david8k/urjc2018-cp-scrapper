const express = require('express');
const expressVue = require('express-vue');
const schedule = require('node-schedule');
const fetch = require('isomorphic-fetch');
const path = require('path');
const controller = require('./models/index');
const aer = require('./crawlers/aer');
const spoj = require('./crawlers/spoj');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET = process.env.TG_SECRET || require('./keys').TG_SECRET || '0';

const YEARS_SUPPORTED = [2018, 2019];
const CATEGORIES = {
  2018: ['SEMANA 1', 'SEMANA 2-1', 'SEMANA 2-2', 'SEMANA 3', 'SEMANA 4', 'SEMANA 5'],
  2019: ['SEMANA 1']
};

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
          style: '/style.css'
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
        {
          script: 'https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.min.js'
        },
      ]
    }
  }
};

const expressVueMiddleware = expressVue.init(vueOptions);
app.use(expressVueMiddleware);
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get(/^\/(\d{4})\/(SEMANA\%20\d+(\-\d+)?)\/$/, async(req, res) => {
  const year = Number(req.params[0]);
  const category = req.params[1];
  const problems = await controller.getProblemsFromCategory(year, category);
  const users = await controller.getUsers(year);
  const users_problems = await controller.getUserProblemsFromCategory(year, category);
  const rows = [];
  const cols = [];
  const matrix = new Array(users.length)
    .fill(null)
    .map(() => new Array(problems.length));
  users.forEach(user => {
    rows.push(user.identifier);
  });
  problems.forEach(problem => {
    cols.push({ url: problem.url, code: problem.problem_code, difficulty: new Array(problem.difficulty).fill('*').join('') });
  });
  users.forEach((user, i) => {
    problems.forEach((problem, j) => {
      matrix[i][j] = users_problems.map((user_prob) => {
        if(user_prob.users.identifier === user.identifier &&
          problem.url === user_prob.problems.url && user_prob.solved) return 0;
        if(user_prob.users.identifier === user.identifier &&
          problem.url === user_prob.problems.url && user_prob.tried) return 1;
        return 2;
      }).sort((a,b) => a-b)[0];
    });
  });
  const data = {
    category: category,
    problems,
    cols,
    rows,
    matrix,
    year
  };
  res.renderVue('week', data, { head: { title: 'URJC Training - ' + category } });
});

app.get(/^\/api\/(\d{4})\/users_problems\/(SEMANA\%20\d+(\-\d+)?)\/$/, async(req, res) => {
  const year = Number(req.params[0]);
  const category = req.params[1];
  const users_problems = await controller.getUserProblemsFromCategory(year, category);
  res.send(users_problems);
});

app.get(/^\/api\/(\d{4})\/problems\/(SEMANA\%20\d+(\-\d+)?)\/$/, async(req, res) => {
  const year = Number(req.params[0]);
  const category = req.params[1];
  const problems = await controller.getProblemsFromCategory(year, category);
  res.send(problems);
});

app.get(/^\/api\/(\d{4})\/users\/$/, async(req, res) => {
  const year = Number(req.params[0]);
  const users = await controller.getUsers(year);
  res.send(users);
});


app.get('/', async(req, res) => {
  const years = YEARS_SUPPORTED;
  res.renderVue('archive', { years }, { head: { title: 'Training Info' } });
});

app.delete(/^\/api\/problem\/$/, async(req, res) => {
  const { url, api_secret } = req.body;
  if(api_secret != SECRET){
    res.status(403);
    res.send({ success: false, error: 'Secret error' });
  }
  else{
    await controller.removeProblem(url);
    res.status(200);
    res.send({ success: true });
  }
});

app.delete(/^\/api\/user\/$/, async(req, res) => {
  const { identifier, api_secret } = req.body;
  if(api_secret != SECRET){
    res.status(403);
    res.send({ success: false, error: 'Secret error' });
  }
  else{
    await controller.removeUser(identifier);
    res.status(200);
    res.send({ success: true });
  }
});

app.post(/^\/api\/problem\/$/, async(req, res) => {
  const { problem_code, domain, category, url, difficulty, api_secret } = req.body;
  if(api_secret !== SECRET){
    res.status(403);
    res.send({ success: false, error: 'API Secret is not valid' });
  }
  else{
    if(!problem_code || !domain || !category || !url || !difficulty){
      res.status(400);
      res.send({ error: 'Fields are not present', success: false });
    }
    else{
      const stars = Number(difficulty);
      if(isNaN(stars) || stars < 1 || stars > 5){
        res.status(400);
        res.send({ success: false, error: 'Difficulty should be a number ranging from 1 to 5' });
      }
      else{
        const response = controller.createProblem({ problem_code, domain, category, url, difficulty });
        if(response.error){
          res.status(400);
          res.send({ error, success: false });
        }
        else{
          res.status(200);
          res.send({ success: true });
        }
      }
    }
  }
});

app.post(/^\/api\/user\/$/, async(req, res) => {
  const { spoj_handler, aer_handler, identifier, api_secret } = req.body;
  if(api_secret !== SECRET){
    res.status(403);
    res.send({ success: false, error: 'API Secret is not valid' });
  }
  else{
    if(!spoj_handler || !aer_handler || !identifier){
      res.status(400);
      res.send({ error: 'Fields are not present', success: false });
    }
    else{
      if(isNaN(aer_handler)){
        res.status(400);
        res.send({ error: 'AER handler should be a number', success: false });
      }
      else{
        controller.createUser({ identifier, spoj_handler, aer_handler });
        res.status(200);
        res.send({ success: true });
      }
    }
  }
});

app.get(/^\/(\d{4})\/$/, async(req, res) => {
  const year = Number(req.params[0]);
  const users = await controller.getUsers(year);
  const rows = [];
  const cols = CATEGORIES[year];
  const acs = new Array(users.length).fill(null).map(() => {
    return { total: 0, current: 0 };
  });
  const noks = new Array(users.length).fill(null).map(() => {
    return { total: 0, current: 0 };
  });
  const matrix = new Array(users.length)
    .fill(null)
    .map(() => new Array(CATEGORIES[year].length));
  users.forEach(user => {
    rows.push(user.identifier);
  });
  await Promise.all(users.map(async(user, i) => {
    return Promise.all(CATEGORIES[year].map(async(category, j) => {
      matrix[i][j] = await controller.getProblemsCount(user, category, year);
      acs[i].current += matrix[i][j].solved;
      acs[i].total += matrix[i][j].total;
      noks[i].current += matrix[i][j].tried;
      noks[i].total += matrix[i][j].total;
    }));
  }));
  for(let i=0;i<users.length;i++){
    for(let j=0;j<i;j++){
      if(acs[j].current < acs[i].current){
        let tmp = acs[j];
        acs[j] = acs[i];
        acs[i] = tmp;
        tmp = noks[j];
        noks[j] = noks[i];
        noks[i] = tmp;
        tmp = matrix[j]; 
        matrix[j] = matrix[i];
        matrix[i] = tmp;
        tmp = rows[j];
        rows[j] = rows[i];
        rows[i] = tmp;
      }
      else if(acs[j].current == acs[i].current && noks[j].current < noks[i].current){
        let tmp = acs[j];
        acs[j] = acs[i];
        acs[i] = tmp;
        tmp = noks[j];
        noks[j] = noks[i];
        noks[i] = tmp;
        tmp = matrix[j]; 
        matrix[j] = matrix[i];
        matrix[i] = tmp;
        tmp = rows[j];
        rows[j] = rows[i];
        rows[i] = tmp;
      }
    }
  }
  const data = {
    cols,
    rows,
    matrix,
    acs,
    noks,
    year,
  };
  res.renderVue('main', data, { head: { title: 'Training Info' } });
});

app.listen(PORT, () => {
  console.log('Server is on');
});

schedule.scheduleJob('*/20 * * * *', async() => {
  const aer_users = (await controller.getUsers(2019)).map(user => user.aer_handler);
  const spoj_users = (await controller.getUsers(2019)).map(user => user.spoj_handler);
  const aer_problems = (await controller.getProblems(2019)).filter(p => p.domain === 'AER').map(p => p.problem_code);
  const spoj_problems = (await controller.getProblems(2019)).filter(p => p.domain === 'SPOJ').map(p => p.problem_code);
  const aer_responses = (await aer.crawl(aer_users, aer_problems)).reduce((a,b) => a.concat(b), []);
  await Promise.all(aer_responses.map(async(response) => {
    if(response.solved || response.tried){
      return await controller.solveProblem(response.problem_code, response.domain, response.user, response.solved, response.tried);
    }
    return Promise.resolve(null);
  }));
  const spoj_responses = (await spoj.crawl(spoj_users, spoj_problems)).reduce((a,b) => a.concat(b), []);
  await Promise.all(spoj_responses.map(async(response) => {
    if(response.solved || response.tried){
      return await controller.solveProblem(response.problem_code, response.domain, response.user, response.solved, response.tried);
    }
    return Promise.resolve(null);
  }));
});
