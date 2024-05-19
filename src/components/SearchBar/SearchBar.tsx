import { useList } from '../../hooks/useList';
import '../../styles/SearchBar.css';

import { IoIosSearch } from 'react-icons/io';

const SearchBar = () => {
  const { context } = useList();
  const { searchTerm, setSearchTerm } = context;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const placeholderText =
    context.listType === 'tvshows' ? 'Search TV Shows' : 'Search Movies';

  return (
    <div className="search-bar">
      <IoIosSearch className="icon" color="black" />
      <input
        className="search-field"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholderText}
      />
    </div>
  );
};

export default SearchBar;
