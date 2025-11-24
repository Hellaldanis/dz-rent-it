export default function SearchBar({ placeholder = "Search for an item to rent near you", onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('search');
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="w-full max-w-2xl rounded-full bg-background-light dark:bg-secondary-dark p-2 shadow-lg ring-1 ring-black/5">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 items-center">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-4 text-text-muted-light dark:text-text-muted-dark">search</span>
          <input 
            name="search"
            className="form-input w-full h-14 border-none bg-transparent pl-12 pr-4 text-base placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark focus:ring-0" 
            placeholder={placeholder}
          />
        </div>
        <button 
          type="submit"
          className="flex w-full md:w-auto min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-primary text-white text-base font-bold transition-opacity hover:opacity-90"
        >
          <span className="truncate">Search</span>
        </button>
      </form>
    </div>
  );
}
