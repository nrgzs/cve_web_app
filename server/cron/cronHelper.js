import { CronJob } from "cron";

export function cronHelper(action) {
  // Ensure action is a function before creating the CronJob
  if (typeof action !== 'function') {
    throw new Error('The action provided to cronHelper must be a function');
  }

  const cronJob = new CronJob(
    "0 * * * * *", // cronTime - Runs every hour in this case
    action,
    null, // onComplete
    true // start
  );

  console.log("Scheduler started. Executing action every minute.");
}