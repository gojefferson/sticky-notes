
export class StickyNote {
  noteText: string = "Do the work!";
  element: HTMLElement;
  id: number;
  left: number;
  top: number;
  offsetLeft: number;
  offsetTop: number;

  setPos() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  constructor(parent: HTMLElement, id: number) {

    // create the element
    let element = document.createElement("div");
    element.classList.add("sticky-note");
    this.left = 200;
    this.top = 200;
    element.innerText = this.noteText;

    // create the top-bar and append
    let topBar = document.createElement("div");
    topBar.classList.add("top-bar");
    element.appendChild(topBar);
    element.setAttribute("data-id", String(id));

    this.element = element;
    this.setPos();
    this.id = id;
    parent.appendChild(this.element);
  }

}

export class NoteManager {
  button: HTMLElement;
  mainBox: HTMLElement;
  notes: StickyNote[] = [];
  noteCounter: number = 0;
  isDragging: boolean = false;
  noteDragging: StickyNote;

  public addNote = () => {
    this.noteCounter++;
    let newNote = new StickyNote(this.mainBox, this.noteCounter);
    this.notes.push(newNote);
  }

  public handleMove = (e: MouseEvent) => {
    console.log("I too move");
      if (this.isDragging) {
        this.noteDragging.left = e.pageX - this.noteDragging.offsetLeft;
        this.noteDragging.top = e.pageY - this.noteDragging.offsetTop;
        this.noteDragging.setPos();
        console.log("Moving!");
    }
  }

  public getNote(id: number) {
    let theNote: StickyNote = this.notes.find(function(note: StickyNote) {
      return (note.id === id);
    })
    return theNote;
  }

  public startMove = (e: MouseEvent) => {
    let thing: Element = e.srcElement;
    if (thing.classList.contains("top-bar")) {
      console.log("THAT WAS A HIT!!!");
      let noteelem = thing.parentElement;
      if (noteelem.hasAttribute("data-id")) {
        console.log(`The id is ${noteelem.getAttribute("data-id")}`);
        let thisNote = this.getNote(Number(noteelem.getAttribute("data-id")))
        this.isDragging = true;
        this.noteDragging = thisNote;
        this.noteDragging.offsetLeft = e.pageX - this.noteDragging.left;
        this.noteDragging.offsetTop = e.pageY - this.noteDragging.top;
      }
    }
  }

  public stopMove = (e: MouseEvent) => {
    this.isDragging = false;
    console.log("Stop Move!");
    this.noteDragging = undefined;
  }

  constructor(button: HTMLElement, mainBox: HTMLElement) {
    this.button = button;
    this.mainBox = mainBox;
    this.button.addEventListener("click", this.addNote);
    this.mainBox.addEventListener("mousedown", this.startMove);
    this.mainBox.addEventListener("mouseup", this.stopMove);
    this.mainBox.addEventListener("mousemove", this.handleMove);

  }  
}
