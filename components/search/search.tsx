import { QueryParams } from "../../pages";

type Props = {
  onSearch: (params: QueryParams) => void;
  searchKey: string;
};

const debounce = (func: Function, delay: number, { leading }: any = {}) => {
  let timerId: NodeJS.Timeout;

  return (...args: any) => {
    if (!timerId && leading) {
      func(...args);
    }
    clearTimeout(timerId);

    timerId = setTimeout(() => func(...args), delay);
  };
};

export default function Search({ onSearch, searchKey }: Props) {
  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch({ searchKey: e.target.value });
  }, 500);

  return (
    <div>
      <label htmlFor="search">Search:&nbsp;</label>
      <input
        id="search"
        type="search"
        onChange={handleSearch}
        defaultValue={searchKey}
      />
    </div>
  );
}
