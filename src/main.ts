import { StickyNote, NoteManager } from "./models";


let mainBox: HTMLElement = document.body;
let newNoteButtom: HTMLElement = document.getElementById("new-note");
let manager = new NoteManager(newNoteButtom, mainBox);
