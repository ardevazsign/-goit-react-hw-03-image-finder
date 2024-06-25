import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar }  from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { getAPI } from '../pixabay-api';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';

 export class App extends Component {
  state = {
    search: '',
    page: 1,
    images: [],
    isLoading: false,
    isError: false,
    isEnd: false,
  };

   componentDidUpdate = async (_prevProps, prevState) => {
     const { search, page } = this.state;
     // Fetch new image
     if (prevState.search !== search || prevState.page !== page) {
       await this.fetchImages(search, page);
     }
   };



   fetchImages = async (search, page) => {
    
    try {
      this.setState({ isLoading: true });
      
      // fetch data from API
      const fetchedImages = await getAPI(search, page);

      const { hits, totalHits } = fetchedImages;
    
      console.log(hits, totalHits);
      // Display an error message if no match
      if (hits.length === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. please try again.'
        );
        return;
      }
      // Display a success message when page is loaded
      if (page === 1) {
        toast.success(`Hooray! We found ${totalHits} images!`);
      }
      //  Check if all available images have been loaded
      if (page * 12 >= totalHits) {
        this.setState({ isEnd: true });
        toast("We're sorry, but you've reached the end of search results.");
        }
    
      //  Update the state with the new images
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
      }));
    } catch {
      // handle any errors that occur during the API request
      this.setState({ isError: true });
      toast.error('Oops, something went wrong! Reload this page!');
    } finally {
      //  Ensure loading state is reset once the API request completes
      this.setState({ isLoading: false });
    }
  };

   handleSubmit = e => {
     e.preventDefault();

     const { search } = this.state;
     const newSearch = e.target.search.value.trim().toLowerCase();
     
     //  if new string is different from the current search string saved in state
  
     if (newSearch !== search) {
       this.setState({ search: newSearch, page: 1, images: [] });
     }
   };

   handleClick = () => {
     this.setState(prevState => ({ page: prevState.page + 1 }));
   };
  
render() {
  const { images, isLoading, isError, isEnd } = this.state;
  return (
    <div className={css.app}>
      <Searchbar onSubmit={this.handleSubmit} />
      
       {images.length >= 1 &&  <ImageGallery photos={images} /> }
       {images.length >= 2 && !isEnd && <Button onClick={this.handleClick} /> }
       {isLoading && <Loader />}
      {isError && toast.error('Oops, something went wrong! Reload this page!')}
      <Toaster position="top-left" reverseOder={false} />
    </div>
  );
 }
}

