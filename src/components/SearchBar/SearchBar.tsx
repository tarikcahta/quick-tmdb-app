import { useList } from '../../hooks/useList';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useList();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
