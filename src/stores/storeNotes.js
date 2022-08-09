import { defineStore } from "pinia";

export const useStoreNotes = defineStore("storeNotes", {
  state: () => {
    return {
      notes: [
        {
          id: "id1",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, pariatur, delectus quisquam est sed praesentium iste ab corruptisuscipit illo saepe cumque dolorem ducimus veniam quod animi suntsapiente. Necessitatibus?",
        },
        {
          id: "id2",
          content: "This is a short note",
        },
      ],
    };
  },
  actions: {
    addNotes(newNoteContent) {
      let currentDate = new Date().getTime(),
        id = currentDate.toString();

      let note = {
        id,
        content: newNoteContent,
      };

      this.notes.unshift(note);
    },
    deleteNote(id) {
      this.notes = this.notes.filter((n) => n.id !== id);
    },
    updateNote(id, content) {
      let index = this.notes.findIndex((n) => n.id === id);
      this.notes[index].content = content;
    },
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter((n) => n.id === id)[0].content;
      };
    },
    totalNotesCount: (state) => {
      return state.notes.length;
    },
    totalCharactersCount: (state) => {
      let count = 0;
      state.notes.forEach((n) => {
        count += n.content.length;
      });
      return count;
    },
  },
});
