
import { Audio } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.loaderHolder}>
      <Audio
      height="100"
      width="100"
      color="#4fa94d"
      ariaLabel="audio-loading"
      wrapperStyle={{}}
      wrapperClass="wrapper-class"
      visible={true}
     />
    </div>
    );
};

