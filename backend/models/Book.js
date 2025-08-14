const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },   // 도서명 (필수)
        author: { type: String, required: true, trim: true },  // 작가 (필수)
        description: { type: String, default: "" },            // 간단 설명
    },
    { timestamps: true } 
);

module.exports = mongoose.model("Book", bookSchema);
