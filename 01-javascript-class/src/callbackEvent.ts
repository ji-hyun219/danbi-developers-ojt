import { EventEmitter } from "events";

const event = new EventEmitter();

event.on("hello", (result) => {
  console.log(result)
})

setInterval(() => {
  event.emit("hello", "world")
}, 2000)