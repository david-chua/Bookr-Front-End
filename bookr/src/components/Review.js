import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactStars from 'react-stars';
import styled from 'styled-components';
import EditModal from './EditModal';



const ReviewDiv = styled.div`
  position: relative
  margin: 50px 200px;
  display: flex;
  align-items: flex-start;
  flex-direction: column`;

const IndividualReviewDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  h3{
    margin-top: 23px;
    margin-left: 30px;
  }`;

const ButtonFlexDiv = styled.div`
display: flex;
`;

const Button = styled.button`
margin: 0px 10px 0px 0px;
font-size: 1.4em;
padding: 10px 15px;`;

const EditButton = styled(Button)`
background: #0741AD;
color: #FFF;`;

const DeleteButton = styled(Button)`
background: #D82B21;
color: #FFF;`;

const DeleteMessage = styled.div`
  display: flex;
  width: 400px;
  align-items: center;
  text-align: center;
  background: red;
  color: white;
  font-size: 1.5em;
  height: 100px;

  p{
    margin: auto;
  }`;


class Review extends React.Component {
  constructor(props){
    super(props)
    this.state={
      display: 'none',
      message: '',
    }
  }

  showModal = () => {
    this.setState({display: 'block'})
  };

  hideModal = () => {
    this.setState({display: 'none'})
  };

  deleteReview = e => {
    e.preventDefault();
    const token = localStorage.getItem('jwt');
    const reqOptions ={
      headers: {
        Authorization:token
      }
    }
    const review_id = this.props.id;
    this.props.deleteReview(review_id, reqOptions);
    this.setState({message: 'Review deleted'})
    window.setTimeout(() => {
      this.props.history.push('/userpage')
    }, 1000);
  }

  render(){
    return(
      <ReviewDiv>
        { this.state.message &&
          <DeleteMessage>
            <p>
              {this.state.message}
            </p>
          </DeleteMessage>
        }
        <div>
          <ReactStars
          count={5}
          color2={'#E57452'}
          size={25}
          edit={false}
          value={this.props.rating}/>
        </div>
        <IndividualReviewDiv>
            <h2> {this.props.reviewer} says:</h2>
            <h3> {this.props.content}</h3>
        </IndividualReviewDiv>
        <ButtonFlexDiv>
        <EditButton onClick={this.showModal} > Edit </EditButton>
        <DeleteButton onClick={this.deleteReview}> Delete </DeleteButton>
        </ButtonFlexDiv>
        <EditModal editReview={this.props.editReview} id={this.props.id} bookId={this.props.bookId} rating={this.props.rating} content={this.props.content} reviewer={this.props.reviewer} show={this.state.display} handleClose={this.hideModal} />
      </ReviewDiv>
    )

  }

}

export default withRouter(Review);
