import React from 'react';
import HeroSlider from "../components/Hero_slider";
import RecentlyUpdated from "../components/RecentlyUpdated";
import Trending from "../components/Trending";
import MyMovieCard from "../components/MyMovieCard";

export default function Home() {
  return (
    <>
      <HeroSlider/>
      <RecentlyUpdated/>
      <Trending/>
      <MyMovieCard which_genre={() => "Action"} />
      <MyMovieCard which_genre={() => "Adventure"} />
      <MyMovieCard which_genre={() => "Animation"} />
      <MyMovieCard which_genre={() => "Comedy"} />
      <MyMovieCard which_genre={() => "Crime"} />
      {/* <MyMovieCard which_genre={() => "Documentary"} /> */}
      <MyMovieCard which_genre={() => "Drama"} />
      <MyMovieCard which_genre={() => "Family"} />
      <MyMovieCard which_genre={() => "Fantasy"} />
      <MyMovieCard which_genre={() => "History"} />
      <MyMovieCard which_genre={() => "Horror"} />
      <MyMovieCard which_genre={() => "Music"} />
      <MyMovieCard which_genre={() => "Mystery"} />
      <MyMovieCard which_genre={() => "Romance"} />
      <MyMovieCard which_genre={() => "SciFi"} />
      <MyMovieCard which_genre={() => "TVMovie"} />
      <MyMovieCard which_genre={() => "Thriller"} />
      <MyMovieCard which_genre={() => "War"} />
      <MyMovieCard which_genre={() => "Western"} />
    </>
  )
}
