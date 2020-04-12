const CronJob = require('cron').CronJob;
const fetchGithub = require('./tasks/fetch-github');

const job = new CronJob('* * * * *', fetchGithub, null, true, 'America/Los_Angeles');
job.start();
