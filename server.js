'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const server= express();
server.use(cors());
server.use(express.json());

const PORT = process.env.PORT || 3010;

const mongoose = require('mongoose');

let BookModel;
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/books');
 // await mongoose.connect(process.env.MONGO_URL);
  const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    email: String
  });

  BookModel = mongoose.model('Books', bookSchema);

// seedData();
}

async function seedData()
{

  const book1 = new BookModel
  ({
    title: 'Systems Engineering of Software-Enabled Systems',
    description: 'A comprehensive review of the life cycle processes, methods, and techniques used to develop and modify software-enabled systems Systems Engineering of Software-Enabled Systems offers an authoritative review of the most current methods and techniques that can improve the links between systems engineering and software engineering. ',
    status: 'Available',
        email: 'yousefmando1998@gmail.com'
  });
  const book2 = new BookModel
  ({
    title: 'Cracking the Behavioral Interviews',
    description: 'Over the past several years of interviewing candidates, we have come across a large number of talented engineers who have excellent technical competencies but also have considerable discomfort in explaining the details of a current project and how its design challenges were resolved. In this book, we have collected the behavioral questions most frequently presented in software engineering interviews.',
    status: 'Available',
   
    email: 'yousefmando1998@gmail.com'
  });
  const book3 = new BookModel
  ({
    title: 'Engineering Safe and Secure Software Systems',
    description: 'This first-of-its-kind resource offers a broad and detailed understanding of software systems engineering from both security and safety perspectives. Addressing the overarching issues related to safeguarding public data and intellectual property, the book defines such terms as systems engineering, software engineering, security, and safety as precisely as possible, making clear the many distinctions, commonalities, and interdependencies among various disciplines. ',
    status: 'Available',
   
    email: 'yousefmando1998@gmail.com'
  });

  await book1.save()
  await book2.save()
  await book3.save()

}
server.get('/', homeHandler);
server.get('/getBook',getBookHandler);
server.post('/addBook',addBookHandler);
server.delete('/deleteBook/:id',deleteBookHandler);
function homeHandler(req,res){

  res.send('Home Page');
}
function getBookHandler(req,res) 
{
  const email = req.query.email
  BookModel.find({email:email},(error,result)=>{
    if(error)
    {
      console.log(error);
    }
    else
    {
      res.send(result)
      console.log(result);
    }
  })
}

async function addBookHandler(req,res){
  console.log(req.body);
 
  const {title, description, status, email} = req.body;
  await BookModel.create({ 
    title: title,
    description: description,
    status: status,
    email :email
  });

  BookModel.find({email:email},(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        res.send(result);
    }
})
}

function deleteBookHandler(req,res){
  const bookId = req.params.id;
  const ownerEmail = req.query.email;
  KittenModel.deleteOne({_id:catId},(err,result)=>{
      
      BookModel.find({email:ownerEmail},(err,result)=>{
          if(err)
          {
              console.log(err);
          }
          else
          {
              res.send(result);
          }
      })

  })


}
server.listen(PORT, () => console.log(`listening on ${PORT}`));
