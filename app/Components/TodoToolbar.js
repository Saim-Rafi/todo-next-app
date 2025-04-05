export default function TodoToolbar() {
    return (
      <div className="flex space-x-4 border-b pb-4 mb-4">
        <button className="font-bold">B</button>
        <button className="italic">I</button>
        <button className="underline">U</button>
        <div className="border-r mx-2"></div>
        <button>≡</button>
        <button>≡≡</button>
        <button>≡≡≡</button>
        <div className="border-r mx-2"></div>
        <button>•</button>
        <button>1.</button>
        <div className="border-r mx-2"></div>
        <button>↓</button>
        <button>T</button>
      </div>
    );
  }