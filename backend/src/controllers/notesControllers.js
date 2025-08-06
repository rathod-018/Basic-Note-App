import Note from "../models/Note.js"

export const getAllNotes = async function (req, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });// show newest first 
        res.status(200).json(notes)
    }
    catch (error) {
        console.error("Error in getAllNotes controller", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}



export const getNoteById = async function (req, res) {
    try {

        const note = await Note.findById(req.params.id)
        if (!note) return response.status(404).json({ message: "Note Not found!" })

        res.status(200).json(note)

    } catch (error) {
        console.error("Error in getNoteById controller", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export const createAllNotes = async function (req, res) {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content })

        const savedNote = await note.save()
        res.status(201).json(savedNote)

    }
    catch (error) {
        console.error("Error in createAllNotes controller", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export const updateAllNotes = async function (req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,
            { title, content }, { new: true });

        if (!updatedNote) return res.status(404).json({ message: "Note not found" })



        res.status(200).json(updatedNote)

    } catch (error) {
        console.error("Error in updateAllNotes controller", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export const deleteAllNotes = async function (req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)

        if (!deletedNote) return res.status(404).json({ message: "Note Not found" })

        res.status(200).json({ message: "Note deleted Successfully" })

    } catch (error) {
        console.error("Error in deleteAllNotes controller", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}


