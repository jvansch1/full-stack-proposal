
json.name beer.name
json.id beer.id
json.style beer.style
json.brewery_id beer.brewery_id
json.brewery_name beer.brewery.name
json.checkins beer.checkins
json.brewery beer.brewery, partial: 'api/breweries/beer_index_helper', as: :brewery
json.ABV beer.ABV
json.IBU beer.IBU
json.created_at time_ago_in_words(beer.created_at)
json.updated_at time_ago_in_words(beer.updated_at)
json.image_url asset_path(beer.image.url(:thumb))
