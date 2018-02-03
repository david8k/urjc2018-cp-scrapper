const fetch = require('isomorphic-fetch');
const cheerio = require('cheerio');

const BASE_URL = 'http://www.spoj.com/users/';

module.exports.crawl = (users, problem_codes) => {
  return Promise.all(users.map(user => {
    return fetch(BASE_URL+user).then(response => {
      return response.text();
    }).then(body => {
      const $ = cheerio.load(body, { decodeEntities: false });
      const solved_problems = $('table.table:nth-child(2) > tbody > tr > td').toArray().map(node => $(node).text());
      const unsolved_problems = $('table.table:nth-child(4) > tbody > tr > td').toArray().map(node => $(node).text());
      return problem_codes.map(problem_code => {
        return {
          user,
          problem_code,
          domain: 'SPOJ',
          solved: solved_problems.some(problem => problem.indexOf(problem_code) !== -1),
          tried: unsolved_problems.some(problem => problem.indexOf(problem_code) !== -1),
        };
      });
    });
  }));
};
