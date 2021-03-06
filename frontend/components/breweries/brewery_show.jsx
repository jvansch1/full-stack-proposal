import React from 'react';
import HeaderContainer from '../header/header_container';
import BreweryCheckinListItem from '../checkins/brewery_checkin_list_item'
import { Link } from 'react-router'

class BreweryShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      mounted: false,
      loaded: false
    }
  }

  componentDidMount() {
    this.setState({mounted: true})
    this.state = this.props.fetchBrewery(this.props.params.breweryId)
  }

  componentWillReceiveProps(newProps) {
    this.state = newProps.brewery
  }

  componentWillUnmount() {
    if (this.state.mounted) {
      this.setState({mounted: false})
    }
  }

  averageRating() {
    let sum = 0;
    this.props.brewery.checkins.forEach(checkin => {
      sum += checkin.rating;
    })
    let average = sum / this.props.brewery.checkins.length;
    return average
  }

  renderDefault(url) {
    if (url === "default_beer_Image.png") {
      return "/assets/default_beer_Image-d8dd9df1ee45f3e09adcebba7e936cc54c9ad5cfc3981630a80143bb7f1b9ba4.png"
    }
    return url
  }

  breweryShowRight() {
    return (
      <div id='brewery-show-right'>
        <h1 id='brewery-beer-header'>Beers by {this.props.brewery.name}</h1>
        <ul>
          {
            this.props.brewery.top_beers.map((beerArray, idx) => {
            return (
                <li id='brewery-show-top-beer-item' key={idx}>
                  <img id='brewery-show-top-beer-image' src={this.renderDefault(beerArray[1])} />
                  <ul id='brewery-show-top-beer-info'>
                    <Link to={`beers/${beerArray[0].id}`}>
                      <li id='top-name'>
                        {beerArray[0].name}
                      </li>
                    </Link>
                    <Link to={`breweries/${this.props.brewery.id}`}>
                      <li id='top-brewery-name'>
                        {this.props.brewery.name}
                      </li>
                    </Link>
                  </ul>
                </li>
              )
          })
        }
        </ul>
      </div>
    )
  }

  breweryShowLeft() {
    const ratingLength = `${this.averageRating() * 25}px`
    return (
      <div id='brewery-show-left'>
        <section className='breweryShow'>
          <div id='brewery-name-flex'>
            <img className='brewery-image' src={this.props.brewery.image_url} />
            <span className='brewery-show-name'>
              {this.props.brewery.name}
            </span>
            <span className='brewery-show-location'>
              {this.props.brewery.city}, {this.props.brewery.state}
            </span>
          </div>
          <div className='beer-show-star-ratings-css'>
            <div className='beer-show-star-ratings-css-top' style={{width: ratingLength}} >
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>

            <div className='beer-show-star-ratings-css-bottom'>
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
          </div>
          <div className='brewery-checkin-stats'>
            <span className='checkin-count'>
              <p className='first'>
                Checkins: {this.props.brewery.checkins.length}
              </p>
              <p className='second'>
                &nbsp;Unique: {this.props.brewery.unique_checkins}
              </p>
            </span>
          </div>
          <ul id='brewery-stats'>
            <li>{this.props.brewery.checkins.length} Ratings</li>
            <li>{this.props.brewery.beers} beers</li>
            <li>Date Added - {this.props.brewery.created_at} ago</li>
          </ul>
        </section>
        <div id='brewery-checkin-list-wrapper'>
          {this.props.brewery.checkins.map((checkin) => {
            return <BreweryCheckinListItem checkin={checkin} brewery={this.props.brewery} key={checkin.id}/>
          })
        }
      </div>
    </div>
    )
  }

  renderSpinner() {
    if (!this.state.loaded) {
      return (
        <div>
          <HeaderContainer />
          <div className='loader'></div>
          <div className='spinner-background'></div>
        </div>
      )
    }
  }

  render() {
    if (this.props.brewery === undefined || this.props.brewery.checkins === undefined) {
      return (
        <div>
          {this.renderSpinner()}
        </div>
      )
    } else {
      return (
        <div>
          <HeaderContainer />
          <div id='brewery-page-container'>
            {this.breweryShowLeft()}
            {this.breweryShowRight()}
          </div>
        </div>
      )
    }
  }
}

export default BreweryShow;
