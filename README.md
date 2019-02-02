# CCB-movie-guide
## Author
<strong>Arram Mandel</strong>
<hr>

## Github:
<strong>https://github.com/airum82</strong>
<hr>

## Description:
This project is a UI that is set up to interact with The Movie Db API. It displays the first 20 movies under the categories now playing, popular and top rated. It also lets you search by title for specific movies within those three categories. While I built this project with React, I chose not to use Redux as my state was not that large and did not need to be shared between that many components. I also decided not to use the React Context API because I never needed to pass a prop down more than two levels. Much of the logic is handled by react-router which allowed me to base style changes and what is rendered off of pathnames.
<hr>

## Tech Stack:
- React
- React-router
- CSS
- React-Loader-Spinner
- Enzyme
- Jest
<hr>

## Next Steps:
- Add in functionality to grab movies from multiply pages in each category
- Allow search by genre if possible
- Do final configuration for deployment
<hr>

## Screenshots:

### Home Page:
<img src="https://github.com/airum82/CCB-movie-guide/blob/master/Screen%20Shot%202019-02-01%20at%201.19.22%20PM.png" alt="the home page which shows now playing movies">
<h3>Movie Details Page:</h3>
<img src="https://github.com/airum82/CCB-movie-guide/blob/master/Screen%20Shot%202019-02-01%20at%201.20.05%20PM.png" alt="the movie details page which shows additional information about the movie">
<h3>Search Results Page</h3>
<img src="https://github.com/airum82/CCB-movie-guide/blob/master/Screen%20Shot%202019-02-01%20at%201.20.26%20PM.png" alt="the movie search results page">
<hr>

## Installation:
  - clone this repo
  - cd into it and run ```npm install```
  - open the .env.example file in the root directory and put in your API key
  - Rename the .env.example file to .env
  - ```npm start``` to start in development mode
  - ```npm test``` to test files
  - ```npm run lint``` to run eslint
