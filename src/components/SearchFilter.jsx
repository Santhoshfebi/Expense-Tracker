export default function SearchFilter({ search, setSearch }) {
  return (
    <input
      placeholder="Search transaction..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border p-3 rounded-lg w-full"
    />
  );
}
