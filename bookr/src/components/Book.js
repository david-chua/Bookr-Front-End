import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


 const BookContainer = styled.div`
  width: 300px;
  height: 600px;
  margin: 10px;
 `;

class Book extends React.Component{
  constructor(props){
    super(props)
    this.state={
      book: [],
      id: null
    }
  }

  render(){
    const book = this.props.book;
    const imageLink = this.props.book.image;
    return(
      <BookContainer>
        { imageLink ? <img src={book.image} alt={book.title}/> : "No Thumbnail Found"}
        <Link to={{pathname: `books/${book.id}`, state: { id: book.id, title: book.title, author: book.author, publisher: book.publisher, image: book.image}}}><h1> {book.title} </h1></Link>
        <h2> {book.author} </h2>
      </BookContainer>
    )
  }
}

export default Book;
