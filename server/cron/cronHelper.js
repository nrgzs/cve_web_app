import cron from 'node-cron'

let task =null

export function cronHelper(action) {
  let isRunning = false;

  task = cron.schedule("*/2 * * * *", async () => {
    if (isRunning) {
      console.log("Previous task is still running. Skipping this minute.");
      return;
    }
  
    isRunning = true;
    console.log("Running scheduled CVE fetch...");
    await action();
    isRunning = false;
  });
}

export function stopCronHelper() {
  if (task) {
    task.stop(); // Stop the cron job
    console.log("Cron job stopped.");
    task = null; // Clear the reference
  } else {
    console.log("No cron job is running.");
  }
}