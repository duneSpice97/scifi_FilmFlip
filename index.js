const form = document.getElementById("form").addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const movieInput = e.target.movieName.value;
  const yearInput = e.target.movieYear.value;

  const oMDBapi = `http://www.oMDBapi.com/?apikey=582a980c&t=${movieInput}&y=${yearInput}`;
  const tMDBapi = `http://api.themoviedb.org/3/search/movie?query=${movieInput}&api_key=c0d223e63c9747fda47653e647837001`;

  const trailerSource = document.querySelector('iframe');

  if (yearInput) {
    fetch(oMDBapi)
    .then(res => res.json())
    .then(oMDBdata => renderMovieInfo(oMDBdata, tMDBapi, trailerSource));
  } else {
    fetch(tMDBapi)
    .then(res => res.json())
    .then(tMDBdata => {
      const synopsis = document.getElementById("synopsis").innerText = `Synopsis: ${tMDBdata.results[0].overview}`;
      const movieID = tMDBdata.results[0].id;
      const keyGrabber = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=c0d223e63c9747fda47653e647837001&language=en-US`

      fetch(keyGrabber)
        .then(res => res.json())
        .then(data => {
          const key = data.results[0].key;
          trailerSource.src = `https://www.youtube.com/embed/${key}`
        })

    fetch(oMDBapi)
      .then(res => res.json())
      .then(data => {
      const poster = document.getElementById("moviePoster").src = data.Poster;
      const year = document.getElementById('year').innerText = `Year: ${data.Year}`;
      const cast = document.getElementById('cast').innerText = `Cast: ${data.Actors}`;
      const director = document.getElementById('director').innerText = `Director(s): ${data.Director}`;

      if (poster === undefined) {
        const poster = document.getElementById("moviePoster").src = `https://i.pinimg.com/550x/cb/b8/fc/cbb8fc5693e2d8560c5e8e89a728d811.jpg`;
        const synopsis = document.getElementById("synopsis").innerText = ``;
      }
      if (year === `Year: undefined`) {
        const year = document.getElementById('year').innerText = ``;
      }
      if (cast === `Cast: undefined`) {
        const cast = (document.getElementById("cast").innerText = ``);
      }
    
      if (director === `Director(s): undefined`) {
        const director = (document.getElementById("director").innerText = `*** "I'm sorry, Dave. I'm afraid I can't do that. The spelling of the film name needs adjustment." -Hal ***`);
      }
      })
    })
  }
}

function renderMovieInfo(oMDBdata, tMDBapi, trailerSource) {
  const poster = document.getElementById('moviePoster').src = oMDBdata.Poster;
  const cast = document.getElementById("cast").innerText = `Cast: ${oMDBdata.Actors}`;
  const director = document.getElementById("director").innerText = `Director(s): ${oMDBdata.Director}`;
  const year = document.getElementById('year').innerText = `Year: ${oMDBdata.Year}`
  const synopsis = document.getElementById('synopsis').innerText = `Synopsis: ${oMDBdata.Plot}`

  fetch(tMDBapi)
    .then(res => res.json())
    .then(tMDBdata => {
      const synopsis = document.getElementById("synopsis").innerText = `Synopsis: ${tMDBdata.results[0].overview}`;
      const movieID = tMDBdata.results[0].id;
      const keyGrabber = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=c0d223e63c9747fda47653e647837001&language=en-US`

      fetch(keyGrabber)
        .then(res => res.json())
        .then(data => {
          const key = data.results[0].key;
          trailerSource.src = `https://www.youtube.com/embed/${key}`
        })
      })

  if (year === `Year: undefined`) {
    const year = document.getElementById('Year').innerText = ``;
  }

  if (cast === `Cast: undefined`) {
    const cast = (document.getElementById("cast").innerText = ``);
  }

  if (director === `Director(s): undefined`) {
    const director = (document.getElementById("director").innerText = `*** "I'm sorry, Dave. I'm afraid I can't do that. The spelling of the film name needs adjustment." -Hal ***`);
  }
}

// const top100 = ['The Wizard of Oz', 'Black Panther', 'Avengers: Endgame', 'Toy Story 4', 'Mad Max: Fury Road', 'Spider-Man: Into the Spider-Verse', 'Wonder Woman', 'Logan', 'Star Wars: The Last Jedi', 'The Shape of Water', 'Thor: Ragnarok', 'E.T. The Extra-Terrestrial', 'Arrival', 'Snow White and the Seven Dwarfs', 'Star Wars: Episode VII - The Force Awakens', 'Gravity', 'Metropolis', 'The Invisible Man', 'Nosferatu, a Symphony of Horror', 'Spider-Man: Far From Home', 'Alien', 'War for the Planet of the Apes', 'Spider-Man: Homecoming', 'Shazam!', 'The Dark Knight', 'The Bride of Frankenstein', 'Dr. Strangelove', 'Captain America: Civil War', 'Blade Runner 2049', 'Pinocchio', 'Frankenstein', 'Harry Potter and the Deathly Hallows Part 2', 'The Lighthouse', 'Sorry to Bother You', 'Avengers: Infinity War', 'The Martian', 'Star Trek', 'Ant-Man and the Wasp', 'It\'s a Wonderful Life', 'Guardians of the Galaxy', 'Kubo and the Two Strings', 'Star Wars: Episode IV A New Hope', 'Invasion of the Body Snatchers', 'How to Train Your Dragon', 'Her', 'Marvel\'s The Avengers', 'WALL-E', 'Iron Man', 'Beauty and The Beast', 'The Terminator', 'Dumbo', '2001: A Space Odyssey', 'The Discreet Charm Of The Bourgeoisie', 'Doctor Strange', 'Snowpiercer', 'Live Die Repeat: Edge of Tomorrow', 'The Princess Bride', '8 1/2', 'Aliens', 'Star Wars: Episode V The Empire Strikes Back', 'Miracle on 34th Street', 'The Day the Earth Stood Still', 'X-Men: Days of Future Past', 'Pan\'s Labyrinth', 'Looper', 'Guardians of the Galaxy Vol. 2', 'Possessor: Uncut', 'Stalker', 'Beauty and the Beast (1991)', 'The Nightmare Before Christmas', 'Captain Marvel', 'Ex Machina', 'Dawn Of The Planet Of The ApeS', 'The Invisible Man', 'Onward', 'Monsters, Inc.', 'Jurassic Park', 'Groundhog DaY', 'The Seventh Seal', 'The Lord of the Rings The Two Towers', 'Spirited Away', 'Ghostbusters (1984 Original)', 'Captain America: The Winter SoldieR', 'Cloverfield Lane', 'The Vast of Night', 'Jodorowsky\'s Dune', 'The Iron Giant', 'Song Of The Sea', 'Back to the Future', 'Wings of Desire', 'Fantasia', 'Border (Gräns)', 'Annihilation', 'Forbidden Planet' 'The Hunger Games: Catching Fire', 'Young Frankenstein', 'The Lord of the Rings: The Return of the King', 'Brazil', 'Babe (1995)'];