export default function Layout({ children, post, mostpopular }) {
  return (
    <div className="flex justify-between flex-col lg:flex-row w-full gap-15">
      <aside className="lg:w-3/4 w-full">{post}</aside>

      <main className="lg:w-1/4 pt-15 w-full">{mostpopular ?? children}</main>
    </div>
  );
}
