const express = require("express");
const Book=require("../Model/Book");

const getAllBooks=async(req,res)=>{
    let books
    try {
     books  = await Book.find();

    } catch (error) {
        console.log(error);
    }
    if(!books)
    {
        return res.status(404).json({
            message:"No Books Found"
        })
    }
    return res.status(200).json({books: books})
}

const addBook=async (req, res) =>{
    let book;
    const {name,author,description,price,available,image}=req.body;
    try{
        book=new Book({
            name,
            author,
            description,
            price,
            available,
            image
        });
        await book.save();
    }catch(error){
        console.log(error);

    }

    if(!book){
        return res.status(500).json({
            message:"Book not added"
        })
    }
    return res.status(200).json({
        message:"Book added",
        book
    })
}

const getById =async(req,res)=>{
    const id=req.params.id
    let book;
    try{
        book=await Book.findById(id);
    }catch(error){
        console.log(error);
    }
    if(!book){
        return res.status(404).json({
            message:"Book not found"
        })
    }
    return res.status(200).json({
        book
    })
}

const updateBook = async (req, res) => {
    const id = req.params.id;
    const { name, author, description, price, available,image } = req.body;
    let book;
    try {
        book = await Book.findByIdAndUpdate(id, {
            name,
            author,
            description,
            price,
            available,
            image
        }, { new: true }); // Set { new: true } to return the updated document
    } catch (error) {
        console.log(error);
    }
    if (!book) {
        return res.status(500).json({
            message: "Book not updated"
        });
    }
    return res.status(200).json({
        message: "Book updated",
        book
    });
};


const deleteBook=async (req, res) => {
    const id= req.params.id;
    let book;
    try {
        book = await Book.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }
    if (!book) {
        return res.status(500).json({
            message: "Book not deleted"
        });
    }
    return res.status(200).json({
        message: "Book deleted Successfully",
        book
    });
}

exports.getAllBooks=getAllBooks
exports.addBook=addBook
exports.getById=getById
exports.updateBook=updateBook
exports.deleteBook=deleteBook