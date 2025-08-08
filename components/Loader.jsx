export default function Loader() {
  return (
    <div className="flex justify-center mb-2">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce delay-100" />
        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce delay-200" />
      </div>
    </div>
  );
}
