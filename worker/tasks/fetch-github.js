const fetch = require('node-fetch');

const baseURL = 'https://jobs.github.com/positions.json';

async function fetchGithub() {
  let resultCount = 1;
  let onPage = 0;
  const allJobs = [];

  while (resultCount > 0) {
    const result = await fetch(`${baseURL}?page=${onPage}`);
    const jobs = await result.json();
    resultCount = jobs.length;
    allJobs.push(...jobs);
    console.log('got', resultCount, 'jobs', onPage);
    onPage++;
  }

  console.log('got', allJobs.length, 'total jobs');
}

fetchGithub();

module.exports = fetchGithub;
