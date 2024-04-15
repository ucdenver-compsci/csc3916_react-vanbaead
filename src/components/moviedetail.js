import React, { Component } from 'react';
import { fetchMovie, submitReview } from "../actions/movieActions";
import {connect} from 'react-redux';
import {Card, ListGroup, ListGroupItem, Form, Button } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import { Image } from 'react-bootstrap';

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.handleReview = this.handleReview.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));
        }
    }

    handleReview(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const reviewData = {
            review: formData.get("review"),
            rating: formData.get("rating"),
            movieId: formData.get("movieId"),
            username: this.props.username
        };
        const { dispatch } = this.props;
        dispatch(submitReview(reviewData));
    }

    render() {
        const DetailInfo = () => {
            if (!this.props.selectedMovie) {
                return <div>Loading....</div>
            }

            return (
                <Card>
                    <Card.Header>Movie Detail</Card.Header>
                    <Card.Body>
                        <Image className="image" src={this.props.selectedMovie.imageUrl} thumbnail />
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem>{this.props.selectedMovie.title}</ListGroupItem>
                        <ListGroupItem>
                            {this.props.selectedMovie.actors.map((actor, i) =>
                                <p key={i}>
                                    <b>{actor.actorName}</b> {actor.characterName}
                                </p>)}
                        </ListGroupItem>
                        <ListGroupItem><h4><BsStarFill/> {this.props.selectedMovie.avgRating}</h4></ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {this.props.selectedMovie.reviews.map((review, i) =>
                            <p key={i}>
                                <b>{review.username}</b>&nbsp; {review.review}
                                &nbsp;  <BsStarFill /> {review.rating}
                            </p>
                        )}
                    </Card.Body>
                    <Card.Body>
                        <Form onSubmit={this.handleReview}>
                            <Form.Group controlId="review">
                                <Form.Label>Review</Form.Label>
                                <Form.Control as="textarea" rows={3} name="review" required />
                            </Form.Group>
                            <Form.Group controlId="rating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control type="number" min="0" max="5" name="rating" required />
                            </Form.Group>
                            <input type='hidden' name='movieId' value={this.props.selectedMovie._id} />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            )
        }

        return (
            <DetailInfo />
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedMovie: state.movie.selectedMovie,
        username: state.auth.username
    }
}

export default connect(mapStateToProps)(MovieDetail);

