import { PenBoxIcon, Trash2Icon } from "lucide-react";
import { formateDate } from "../lib/utils.js";
import { Link } from "react-router";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // to get rid of the default behavier

    if (!window.confirm("Are you sure you want to delete this note??")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id)); //get rid of the deleted one
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in deleting Note", error);
      toast.error("Faied to deleted Note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 transition-all duration-300 border-t-4 border-[#22c55e] border-solid shadow-[0_-4px_10px_0_#22c55e40] hover:shadow-[0_-4px_15px_0_#22c55e80]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>

        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formateDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenBoxIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
