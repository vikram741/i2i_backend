const mongo = require('mongoose')

const booksSchema = mongo.Schema({
    books: [
        {
            bookid: { type: String, required: true },
            name: { type: String, require: true },
            category: { type: String, required: true },
            description: { type: String },
            author: { type: String, required: true },
            likes: { type: Number },
            viewcount: { type: Number },
            audiolinks: [
                {
                    link: { type: String },
                    userId: {type: String}
                }
            ],
            publishedLink: { type: String }
        }
    ]
})

module.exports = mongo.model('book', booksSchema);