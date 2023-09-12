Linkagem do node.js com uma biblioteca local.

let books = [
{ id: 1, title: "Livro l" },
{ id: 2, title: "Livro 2" },
{ id: 3, title: "Livro 3" },
];

app.get("/books", (req, res) => {
res.json(books);
});
// pesquisa Array livros
app.get("/books/:id", (req, res) => {
const bookId = parseInt(req.params.id);

const book = books.find((book) => book.id === bookId);

if (book) {
res.json(book);
} else {
res.status(404).send("Livro não encontrado");
}
});

app.post("/post-example", (req, res) => {
const newBook = req.body;
books.push(newBook);
res.json(newBook);
});

app.put("/update-book/:id", (req, res) => {
const bookId = parseInt(req.params.id);
const newTitle = req.body.title;

const bookToUpdate = books.find((book) => book.id === bookId);

if (bookToUpdate) {
bookToUpdate.title = newTitle;
res.json(bookToUpdate);
} else {
res.status(404).send("Livro não encontrado");
}
});

app.delete("/delete-book/:id", (req, res) => {
const bookId = parseInt(req.params.id);

const indexToRemove = books.findIndex((book) => book.id === bookId);

if (indexToRemove !== -1) {
const removedBook = books.splice(indexToRemove, 1);
res.json(removedBook[0]);
} else {
res.status(404).send("Livro não encontrado");
}
});
\Q3
