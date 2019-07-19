import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Review from './Review';

const BookDataDiv = styled.div`
  display: flex;
  justify-content: center`;

const BookImageDiv = styled.div`
margin: 25px 50px;`;

const BookImage = styled.img`
width: 300px;`;

const ReviewContainer = styled.div`
margin: 0px 50px;
border: 10px solid #0741AD;
border-radius: 15px;
height: 700px;
overflow-y: auto;`;

class ReviewedBook extends React.Component{
  constructor(props){
    super(props)
    this.state={
      book: [],
      id: 0
    }
  }

  componentDidMount(){
    const id = this.props.location.state.id;
    this.setState({loading: true}, ()=>{
      const token= localStorage.getItem('jwt');
      const reqOptions = {
        headers:{
            Authorization:token
        }
      }
      axios.get(`http://localhost:9090/books/${id}`, reqOptions)
        .then(response => {
          this.setState({
            book: response.data.book
          })
          console.log(response);
        })
        .catch(error => {
          return error;
        })
    })
  }

  render(){
    console.log('reviewed book')
    let reviewData
    if (this.state.book.reviews){
      reviewData = this.state.book.reviews.map((review, i) => {
        return <div key={review.id}>
                <Review addoptions={review[i]} bookId={this.state.bookId} id={review.id} content={review.content} rating={review.rating} reviewer={review.reviewer} editReview = {this.props.editReview} deleteReview = {this.props.deleteReview}  />
                </div>;
      })
    }



    return(
      <BookDataDiv>
        <div>
          <h1>{this.state.book.title}</h1>
          <h2> By: {this.state.book.author}</h2>
          <BookImageDiv>
            <BookImage src={this.state.book.image} />
          </BookImageDiv>
        </div>
        <ReviewContainer>
          {reviewData}
        </ReviewContainer>
      </BookDataDiv>

    )
  }
}

export default ReviewedBook;
