## Week 1 Assignment: Flixster

Submitted by: **Nicole Wong**

Estimated time spent: **12** hours spent in total

Deployed Application (optional): [Flixster Deployed Site](https://youtu.be/mP21DsqEMCY)

### Application Features

#### CORE FEATURES

- [X] User can view a list of current movies from The Movie Database API as a grid view
  - The grid element should have an id of `movies-grid`
  - Each movie wrapper element should have a class of `movie-card`
- [X] For each movie displayed, user can see the following details:
  - Title - the element should have a class of `movie-title`
  - Image - the `img` element should have a class of `movie-poster`
  - Votes - the element should have a class of `movie-votes`
- [X] User can load more current movies by clicking a button at the bottom of the list
  - The button should have an id of `load-more-movies-btn`.
  - When clicked, the page should not refresh.
  - New movies should simply be added to the bottom
- [X] Allow users to search for movies and display them in a grid view
  - There should be a search input element with an id of `search-input`
  - Users should be able to type into the input
  - When a user hits 'Enter', it should send a search request to the movies API
  - The results from the search should be displayed on the page
  - There should be a close icon with an id of `close-search-btn` that exits the search, clears results, and shows the current movies displayed previously
- [X] Website accounts for basic HTML/CSS accessibility features
- [X] Website should be responsive

#### STRETCH FEATURES

- [ ] Deploy website using GitHub Pages. 
- [X] Allow user to view more details about a movie within a popup.
- [ ] Improve the user experience through CSS & animation.
- [X] Allow movie video trailers to be played using [embedded YouTube](https://support.google.com/youtube/answer/171780?hl=en)
- [ ] Implement anything else that you can get done to improve the app functionality!

### Walkthrough Video
https://user-images.githubusercontent.com/65055587/174411841-b47c37b6-215a-4cfc-acf9-3582b7b40cb8.mp4
### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

Topics such as asynchronous Javascript, interacting with DOM elements, and utilizing API calls helped me develop the project for this week. As we needed to use the Movie Database API to retrieve the latest movies and also make the screen interactive, it was helpful to learn the concepts prior to implementing it. It took some time for me to experiment with CSS and different layouts so that the positioning of the images and text would appear centered on the page. As I have limited experience in coding with JavaScript, I felt unprepared to implement the 

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
If I had more time, I would have used consistent styling such as a color theme and common font families. I would have also chosen to change the display of the modal popup so that the video frame is larger and the extra details only appear when a button is clicked so that the user is not overloaded with information. Right now, my movie grid does not wrap certain titles that are longer so the border is not consistent. 

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

I had difficulty with embedding the youtube video because I did not realize that the youtube key was only present in the movie details which required calling the movie details API with the movie id. I noticed that my friend had colored stars based on the ratings which I thought was cool and a "Get More Details" button in the popup. 

### Open-source libraries used

- Add any links to open-source libraries used in your project.

### Shout out

Give a shout out to somebody from your cohort that especially helped you during your project. This can be a fellow peer, instructor, TA, mentor, etc.
