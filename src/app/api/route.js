//ROUTES

//1. Create todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todotable (todo_description) VALUES($1) RETURNING *", [description]);
        res.status(201).json("New task was created"); // Send back the newly created todo
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message }); // Send back an error response
    }
});