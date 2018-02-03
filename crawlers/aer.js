const fetch = require('isomorphic-fetch');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.aceptaelreto.com/user/profile.php?id=';

module.exports.crawl = (users, problem_codes) => {
  return Promise.all(users.map(user => {
    return fetch(BASE_URL+user).then(response => {
      return response.text();
    }).then(body => {
      const $ = cheerio.load(body, { decodeEntities: false });
      const solved_problems = $('.table-hover > tr').toArray()
        .filter(node => ($(node).attr('class') || '').indexOf('danger') === -1)
        .map(node => $(node).text());
      const unsolved_problems = $('.table-hover > tr').toArray()
        .filter(node => ($(node).attr('class') || '').indexOf('danger') !== -1)
        .map(node => $(node).text());
      return problem_codes.map(problem_code => {
        return {
          user,
          problem_code,
          domain: 'AER',
          solved: solved_problems.some(problem => problem.indexOf(problem_code) !== -1),
          tried: unsolved_problems.some(problem => problem.indexOf(problem_code) !== -1),
        };
      });
    });
  }));
};
