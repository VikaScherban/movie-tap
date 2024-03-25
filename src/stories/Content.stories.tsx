import React from 'react';
import {Meta, StoryFn} from '@storybook/react';
import Content from "../components/content/Content";
import {GenreTitle} from "../constants/genres-const";
import {SortByOptions} from "../constants/sort-control-const";

export default {
    title: 'Components/Content',
    component: Content,
} as Meta;

const Template: StoryFn<typeof Content> = (args) => <Content {...args} />;

export const Default = Template.bind({});
Default.args = {
    data: {
        sortBy: SortByOptions.releaseDate.value,
        activeGenre: 'Comedy',
        movieList: [
            {
                id: 0,
                poster_path: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/adventure-movie-poster-template-design-7b13ea2ab6f64c1ec9e1bb473f345547_screen.jpg?ts=1636999411',
                title: 'Movie 1',
                release_date: '01.01.01',
                genres: [GenreTitle.Horror, GenreTitle.Documentary],
                vote_average: 7.4,
                runtime: 184,
                overview: 'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra',
            },
            {
                id: 1,
                poster_path: 'https://www.tallengestore.com/cdn/shop/products/1917_-_Sam_Mendes_-_Hollywood_War_Film_Classic_English_Movie_Poster_a12704bd-2b25-4aa7-8c8d-8f40cf467dc7_large.jpg?v=1582781089',
                title: 'Movie 2',
                release_date: '04.02.99',
                genres: [GenreTitle.Crime, GenreTitle.Documentary],
                vote_average: 8.1,
                runtime: 192,
                overview: 'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra',
            },
            {
                id: 2,
                poster_path: 'https://artofthemovies.co.uk/cdn/shop/products/IMG_2672-955819.jpg?v=1686847908',
                title: 'Movie 3',
                release_date: '14.10.11',
                genres: [GenreTitle.Documentary],
                vote_average: 9.4,
                runtime: 154,
                overview: 'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra',
            },
        ]
    },
    onMovieSelected: (id: number) => console.log("Movie selected:", id),
};
