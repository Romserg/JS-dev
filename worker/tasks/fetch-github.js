const fetch = require('node-fetch');
const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

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
    console.log('got', resultCount, 'jobs from page', onPage);
    onPage++;
  }

  // set in redis
  console.log('got', allJobs.length, 'total jobs');
  const success = await setAsync('github', JSON.stringify(allJobs));

  console.log({success});
}

module.exports = fetchGithub;
