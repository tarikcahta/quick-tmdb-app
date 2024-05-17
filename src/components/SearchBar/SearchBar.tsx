import { useList } from '../../hooks/useList';

const SearchBar = () => {
  const { context } = useList();
  const { searchTerm, setSearchTerm } = context;

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
