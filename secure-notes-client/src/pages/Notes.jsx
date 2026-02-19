import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  




 const fetchNotes = async () => {
  try {
    setLoading(true);
    const res = await api.get("/notes");
    setNotes(res.data);
  } catch (err) {
    console.error("Error fetching notes");
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    fetchNotes();
  }, []);

 const createNote = async () => {
  if (!title.trim() || !content.trim()) return;

  try {
    await api.post("/notes", { title, content });

    setTitle("");
    setContent("");

    fetchNotes();  
  } catch (err) {
    setError("Failed to create note.");
  }
};


  // Delete note
  const deleteNote = async (id) => {
  const confirmed = window.confirm("Are you sure you want to delete this note?");
  if (!confirmed) return;

  try {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    await api.delete(`/notes/${id}`);
  } catch (err) {
    fetchNotes();
  }
};


  const startEditing = (note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  
  //Save-button
  const updateNote = async (id) => {
  try {
    await api.put(`/notes/${id}`, {
  title: editTitle,
  content: editContent,
});


    setEditingId(null);
    fetchNotes();
  } catch (err) {
    console.error("Error updating note");
  }
};

//logout
const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg font-semibold">Loading...</div>
    </div>
  );
}

const filteredNotes = notes.filter((note) =>
  note.title.toLowerCase().includes(search.toLowerCase()) ||
  note.content.toLowerCase().includes(search.toLowerCase())
);



 return (
  
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-4xl mx-auto">

      {/* Header */}
      {error && (
      <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
        {error}
        </div>
      )}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Your Notes</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"

/>


      {/* Create Note Card */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h3 className="text-xl font-semibold mb-4">Add New Note</h3>

        <input
          placeholder="Title"
          className="w-full p-2 border rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          className="w-full p-2 border rounded mb-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
  onClick={createNote}
  disabled={loading}
  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
>
  {loading ? "Adding..." : "Add Note"}
</button>

        </div>

      {/* Notes Grid */}
{/* Notes Grid */}

{filteredNotes.length === 0 ? (

  notes.length === 0 ? (
    <div className="bg-white p-10 rounded-2xl shadow text-center">
      <h3 className="text-xl font-semibold mb-2">No notes yet</h3>
      <p className="text-gray-500">
        Create your first note to get started.
      </p>
    </div>
  ) : (
    <div className="bg-white p-10 rounded-2xl shadow text-center">
      <h3 className="text-xl font-semibold mb-2">No results found</h3>
      <p className="text-gray-500">
        Try a different search term.
      </p>
    </div>
  )

) : (

  <div className="grid md:grid-cols-2 gap-6">
    {filteredNotes.map((note) => (
      <div
        key={note.id}
        className="bg-white p-6 rounded-2xl shadow transition duration-300 hover:shadow-xl hover:-translate-y-1"
      >

        {editingId === note.id ? (
          <>
            <input
              className="w-full p-2 border rounded mb-2"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <textarea
              className="w-full p-2 border rounded mb-2"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />

            <div className="flex gap-3">
              <button
                onClick={() => updateNote(note.id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
              >
                Save
              </button>

              <button
                onClick={() => setEditingId(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-lg font-bold mb-2">{note.title}</h3>
            <p className="text-gray-700 mb-4">{note.content}</p>

            <div className="flex gap-3">
              <button
                onClick={() => startEditing(note)}
                className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 transition"
              >
                Edit
              </button>

              <button
                onClick={() => deleteNote(note.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </>
        )}

      </div>
    ))}
  </div>

)}



    </div>
  </div>
);

}

export default Notes;

