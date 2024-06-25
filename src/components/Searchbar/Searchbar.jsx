import css from './Searchbar.module.css';
import { TfiSearch } from 'react-icons/tfi';


export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.searchFormButton}>
          
          <span className={css.searchFormButtonLable}><TfiSearch /></span>
        </button>
        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder=" Search image and photos"
          name="search"
        />
      </form>
    </header>
  );
};