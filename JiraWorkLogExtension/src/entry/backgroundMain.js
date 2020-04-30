import { BackgroundTask } from "../background/index"; 

console.log("Start background");
const task = new BackgroundTask();
task.start();