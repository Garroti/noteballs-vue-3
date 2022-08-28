import { defineStore } from "pinia";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { db } from "@/js/firebase";
import { useStoreAuth } from "@/stores/storeAuth";

let notesCollectionRef;
let notesCollectionQuery;

let getNotesSnapshot = null;

export const useStoreNotes = defineStore("storeNotes", {
  state: () => {
    return {
      notes: [
        // {
        //   id: "id1",
        //   content:
        //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, pariatur, delectus quisquam est sed praesentium iste ab corruptisuscipit illo saepe cumque dolorem ducimus veniam quod animi suntsapiente. Necessitatibus?",
        // },
        // {
        //   id: "id2",
        //   content: "This is a short note",
        // },
      ],
      notesLoaded: false,
    };
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth();
      notesCollectionRef = collection(db, "users", storeAuth.user.id, "notes");
      notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));
      this.getNotes();
    },
    async getNotes() {
      this.notesLoaded = false;

      if (getNotesSnapshot) getNotesSnapshot();

      getNotesSnapshot = onSnapshot(
        notesCollectionQuery,
        (querySnapshot) => {
          let notes = [];
          querySnapshot.forEach((doc) => {
            let note = {
              id: doc.id,
              content: doc.data().content,
              date: doc.data().date,
            };
            notes.push(note);
          });

          this.notes = notes;
          this.notesLoaded = true;
        },
        (error) => {
          console.log("error.message: ", error.message);
        }
      );
    },
    clearNotes() {
      this.notes = [];
    },
    async addNotes(newNoteContent) {
      let currentDate = new Date().getTime(),
        date = currentDate.toString();

      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date,
      });
    },
    async deleteNote(id) {
      await deleteDoc(doc(notesCollectionRef, id));
    },
    async updateNote(id, content) {
      await updateDoc(doc(notesCollectionRef, id), {
        content,
      });
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
