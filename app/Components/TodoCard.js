import { format } from 'date-fns';

export default function TodoCard({ todo, isSelected, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`p-4 mb-4 border rounded-lg cursor-pointer hover:border-gray-400 ${
        isSelected ? 'border-2 border-gray-400' : 'border-gray-200'
      }`}
    >
      <h3 className="text-lg font-bold">{todo.title}</h3>
      <p className="text-sm text-gray-600">{todo.description}</p>
      <p className="text-xs text-gray-400 mt-2">
        {format(new Date(todo.createdAt), 'MMMM d, yyyy')}
      </p>
    </div>
  );
}