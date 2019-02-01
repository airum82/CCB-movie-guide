# CCB-movie-guide
## Author
<strong>Arram Mandel</strong>
<hr>

## Github:
<strong>https://github.com/airum82</strong>
<hr>

## Description:
<p>This project is a UI that is set up to interact with The IMDB API. It displays the first 20 movies under the categories now playing, popular and top rated. It also lets you search by title for specific movies within those three categories. While I built this project with React, I chose not to use Redux as my state was not that large and did not need to be shared between that many components. I also decided not to use the React Context API because I never needed to pass a prop down more than two levels. Much of the logic is handled by react-router which allowed me to base style changes and what is rendered off of pathnames.</p>
<hr>

## Tech Stack:
<ul>
  <li>React</li>
  <li>React-router</li>
  <li>CSS</li>
  <li>React-Loader-Spinner</li>
  <li>Enzyme</li>
  <li>Jest</li>
</ul>
<hr>
## Next Steps:
<ul>
  <li>Add in functionality to grab movies from multiply pages in each category</li>
  <li>Allow search by genre if possible</li>
</ul>
<hr>
## Screenshots:
### Home Page:
<img src="https://github.com/airum82/CCB-movie-guide/blob/master/Screen%20Shot%202019-02-01%20at%201.19.22%20PM.png" alt="the home page which shows now playing movies">
<h3>Movie Details Page:</h3>
<img src="https://github.com/airum82/CCB-movie-guide/blob/master/Screen%20Shot%202019-02-01%20at%201.20.05%20PM.png" alt="the movie details page which shows additional information about the movie">
<h3>Search Results Page</h3>
<img src="https://github.com/airum82/CCB-movie-guide/blob/master/Screen%20Shot%202019-02-01%20at%201.20.26%20PM.png" alt="the movie search results page">
<hr>
<h2>Installation:</h2>
<ol>
  <li>clone this repo</li>
  <li>cd into it and run ```npm install```<li>
  <li>open the .env.example file in the root directory and put in your API key</li>
  <li>Rename the .env.example file to .env</li>
  <li>```
    npm start
  ```</li>
  <li>```npm test``` to test files</li>
  <li>```npm run lint``` to run eslint</li>
</ol>
``` npm test ```
