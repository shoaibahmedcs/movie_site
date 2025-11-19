import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import movies from "../data/movies.json";
import './Hero_slider.css';
import { TbRubberStampOff } from "react-icons/tb";


export default function Hero_slider() {
    function randomIndex(min = 0, max = movies.length - 1) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function formatDate(dateString) {
        if (!dateString) return '';
        
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Handle format: YYYY-MM-DD or DD/MM/YYYY
        let day, month, year;
        
        if (dateString.includes('/')) {
            // Format: DD/MM/YYYY
            const parts = dateString.split('/');
            day = parts[0];
            month = parseInt(parts[1]) - 1;
            year = parts[2];
        } else {
            // Format: YYYY-MM-DD
            const parts = dateString.split('-');
            year = parts[0];
            month = parseInt(parts[1]) - 1;
            day = parts[2];
        }
        
        return `${day} ${months[month]}, ${year}`;
    }
    const images = [
    {
        original: "https://image.tmdb.org/t/p/original" + movies[41].backdrop_path,
        thumbnail: "https://image.tmdb.org/t/p/original"+ movies[41].poster_path,
        title : movies[41].title ,
        description: movies[41].overview,
        releaseDate: movies[41].release_date,
        rating: movies[41].vote_average,
    },
    {
        original: "https://image.tmdb.org/t/p/original" + movies[198].backdrop_path,
        thumbnail: "https://image.tmdb.org/t/p/original"+ movies[198].poster_path,
        title : movies[198].title ,
        description: movies[198].overview,
        releaseDate: movies[198].release_date,
        rating: movies[198].vote_average,
    },
    {
        original: "https://image.tmdb.org/t/p/original" + movies[7].backdrop_path,
        thumbnail: "https://image.tmdb.org/t/p/original"+ movies[7].poster_path,
        title : movies[7].title ,
        description: movies[7].overview,
        releaseDate: movies[7].release_date,
        rating: movies[7].vote_average,
    },
    {
        original: "https://image.tmdb.org/t/p/original" + movies[10].backdrop_path,
        thumbnail: "https://image.tmdb.org/t/p/original"+ movies[10].poster_path,
        title : movies[10].title ,
        description: movies[10].overview,
        releaseDate: movies[10].release_date,
        rating: movies[10].vote_average,    
    },
     {
        original: "https://image.tmdb.org/t/p/original" + movies[15].backdrop_path,
        thumbnail: "https://image.tmdb.org/t/p/original"+ movies[15].poster_path,
        title : movies[15].title ,
        description: movies[15].overview,
        releaseDate: movies[15].release_date,
        rating: movies[15].vote_average,
    },
    {
        original: "https://image.tmdb.org/t/p/original" + movies[12].backdrop_path,
        thumbnail: "https://image.tmdb.org/t/p/original"+ movies[12].poster_path,
        title : movies[12].title ,
        description: movies[12].overview,
        releaseDate: movies[12].release_date,
        rating: movies[12].vote_average,
    },
    {
        original: "https://image.tmdb.org/t/p/original" + movies[1].backdrop_path,
        thumbnail: "https://image.tmdb.org/t/p/original"+ movies[1].poster_path,
        title : movies[1].title ,
        description: movies[1].overview,
        releaseDate: movies[1].release_date,
        rating: movies[1].vote_average,
    },
    {
        original: "https://image.tmdb.org/t/p/original" + movies[2913].backdrop_path,
        thumbnail: "https://image.tmdb.org/t/p/original"+ movies[2913].poster_path,
        title : movies[2913].title ,
        description: movies[2913].overview,
        releaseDate: movies[2913].release_date,
        rating: movies[2913].vote_average,
    },
    {
        original: "https://image.tmdb.org/t/p/original" + movies[718].backdrop_path,
        thumbnail: "https://image.tmdb.org/t/p/original"+ movies[718].poster_path,
        title : movies[718].title ,
        description: movies[718].overview,
        releaseDate: movies[718].release_date,
        rating: movies[718].vote_average,   
    },
    {
        original: "https://image.tmdb.org/t/p/original" + movies[21].backdrop_path,
        thumbnail: "https://image.tmdb.org/t/p/original"+ movies[21].poster_path,
        title : movies[21].title ,
        description: movies[21].overview,
        releaseDate: movies[21].release_date,
        rating: movies[21].vote_average,    
    },
    {
        original: "https://image.tmdb.org/t/p/original" + movies[120].backdrop_path,
        thumbnail: "https://image.tmdb.org/t/p/original"+ movies[120].poster_path,
        title : movies[120].title ,
        description: movies[120].overview,
        releaseDate: movies[120].release_date,
    },
    {
        original: "https://image.tmdb.org/t/p/original" + movies[43].backdrop_path,
        thumbnail: "https://image.tmdb.org/t/p/original"+ movies[43].poster_path,
        title : movies[43].title ,
        description: movies[43].overview,
        releaseDate: movies[43].release_date,
        rating: movies[43].vote_average,
    },
    {
        original: "https://image.tmdb.org/t/p/original" + movies[110].backdrop_path,
        thumbnail: "https://image.tmdb.org/t/p/original"+ movies[110].poster_path,
        title :movies[110].title,
        description: movies[110].overview,
        releaseDate: movies[110].release_date,
        rating: movies[110].vote_average,   
    },
];

function renderMovieItem(item) {
    return (
        <div className="movie-slide">
            <img src={item.original} className="slide-image" />

            <div className="movie-info">
                <h2 className="movie-title">{item.title}</h2>

                <div className="movie-meta">
                    <span>{formatDate(item.releaseDate)}</span>
                    <span>{item.rating} ⭐</span>
                </div>

                <p className="movie-description">{item.description}</p>

                <div className="buttons">
                    <button className="watch-now">Watch Now ▶</button>
                    <button className="watch-later">Watch Later</button>
                </div>
            </div>
        </div>
    );
}



    return (
        
            // <ImageGallery items={images}
            //     showNav={false}
            //     autoPlay={true}
            //     showPlayButton = {false}
            //     showFullscreenButton = {false}
            //     showBullets = {true}
            //     showThumbnails ={false}
            //     bulletClass ="bulletClass"
            //     additionalClass="mygallery"
            // />
        <ImageGallery
            items={images}
            renderItem={renderMovieItem}
            showNav={false}
            autoPlay={false}
            showPlayButton={false}
            showFullscreenButton={false}
            showBullets={true}
            showThumbnails={false}
            bulletClass="bulletClass"
            additionalClass="mygallery"
        />


        
    );
}