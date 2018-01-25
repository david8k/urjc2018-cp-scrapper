const controller = require('./models/index');
const spoj = require('./crawlers/spoj');
const aer = require('./crawlers/aer');

main = async() => {
  const users = (await controller.getUsers()).map(user => user.aer_handler);
  const problems = (await controller.getProblems()).map(problem => problem.problem_code);
  const responses = (await aer.crawl(users, problems)).reduce((a,b) => a.concat(b), []);
  await Promise.all(responses.map(async(response) => {
    if(response.solved){
      return await controller.solveProblem(response.problem_code, response.domain, response.user);
    }
    return Promise.resolve(null);
  }));
}

main();
