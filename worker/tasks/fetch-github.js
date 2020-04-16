const fetch = require('node-fetch');
const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");

const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://jobs.github.com/positions.json';

async function fetchGithub() {
  let resultCount = 1;
  let onPage = 0;
  const allJobs = [];

  // fetch all pages
  while (resultCount > 0) {
    try {
      const result = await fetch(`${baseURL}?page=${onPage}`);
      const jobs = await result.json();
      resultCount = jobs.length;
      allJobs.push(...jobs);
      console.log('got', resultCount, 'jobs from page', onPage);
      onPage++;
    }
    catch (e) {
      console.log(e)
    }
  }

  console.log('got', allJobs.length, 'total jobs');

  // filter jobs
  const juniorJobs = allJobs.filter(job => {
    const jobTitle = job.title.toLowerCase();

    return !(jobTitle.includes('senior') ||
      jobTitle.includes('manager') ||
      jobTitle.includes('sr.') ||
      jobTitle.includes('architect') ||
      jobTitle.includes('team-lead') ||
      jobTitle.includes('team lead') ||
      jobTitle.includes('lead') ||
      jobTitle.includes('vice-president') ||
      jobTitle.includes('director') ||
      jobTitle.includes('tech lead'));
  });

  console.log('filtered down to', juniorJobs.length);

  // set in redis
  const success = await setAsync('github', JSON.stringify(juniorJobs));

  console.log({success});
}

module.exports = fetchGithub;
