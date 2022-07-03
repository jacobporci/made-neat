import { QueryParams } from "../../pages";
import styles from "./search.module.css";

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
    onSearch({ searchKey: e.target.value, page: 1, pageSize: 10 });
  }, 500);

  return (
    <div className={styles.container}>
      <label htmlFor="search">News Title Search:&nbsp;</label>
      <input
        className={styles.search}
        id="search"
        type="search"
        onChange={handleSearch}
        defaultValue={searchKey}
      />
    </div>
  );
}
