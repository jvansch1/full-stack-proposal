import React from 'react';
import { hashHistory } from 'react-router';

const RATING_SCALE = [0,.25,.50,.75,1,1.25,1.50,1.75,2, 2.25,2.50, 2.75, 3, 3.25, 3.50, 3.75, 4, 4.25, 4.5, 4.75, 5];

class CheckinForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      description: "",
      rating: null,
      beer_id: props.beer.id
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createCheckin(this.state).then(() => hashHistory.push(`beers/${this.props.beer.id}`));
  }

  cancelSubmit(e) {
    e.preventDefault();
    hashHistory.push(`/beers/${this.props.beer.id}`)
  }

  update(property) {
    return e => {
      e.preventDefault();
      this.setState({[property]: e.target.value})
    }
  }

  render() {
    return (
      <div height='100%' width='100%'>
        <div id='transparent-background'>
        </div>
        <div id='checkin-form-container'>
          <section id='checkin-title'>
            <span>Check-in</span>
          </section>
          <form id='checkin-form' onSubmit={this.handleSubmit.bind(this)}>
            Description
            <input onChange={this.update('description')}type='text'></input>
            <br />
            Rating
            <select onChange={this.update('rating')}>
              {
                RATING_SCALE.map(rating => {
                  return <option  value={rating} key={rating}>{rating}</option>
                })
              }
            </select>
            <br />
            <input onSubmit={this.handleSubmit.bind(this)} className='checkin-button' type='submit' value="Confirm"/>
            <input onClick={this.cancelSubmit.bind(this)} className='checkin-button' type='submit' value="Cancel"/>
          </form>
        </div>
      </div>
    )
  }
};

export default CheckinForm;
