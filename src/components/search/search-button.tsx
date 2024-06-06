import Button from '@/components/ui/button';
import { SearchIcon } from '@/components/icons/search-icon';
import { useSearch } from '@/components/search/search-view';

export default function SearchButton({
  className = 'flex',
}: {
  className?: string;
}) {
  const { openSearch } = useSearch();
  return (
    <Button
      variant="icon"
      aria-label="Search"
      className={className}
      onClick={openSearch}
    >
      <div className="flex flex-row items-center">
        <SearchIcon className="icon-md w-4 h-4 fill-current inline h-5 w-5 fill-gray-700 dark:fill-gray-400" />
        <span className="ml-2 text-gray-500 whitespace-nowrap">
          Search millions of books by title, author, or ISBN
        </span>
      </div>
      
    </Button>
    

  );
}
