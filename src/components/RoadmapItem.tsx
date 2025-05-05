
import { useState } from 'react';
import { Check, Calendar, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RoadmapItemProps {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'in-progress' | 'planned';
  onUpdate: (id: string, data: Partial<RoadmapItemProps>) => void;
  onDelete: (id: string) => void;
}

const RoadmapItem = ({ 
  id,
  title, 
  description, 
  date, 
  status, 
  onUpdate,
  onDelete 
}: RoadmapItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title,
    description,
    date,
    status
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(id, editData);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div 
      className={cn(
        "roadmap-item group", 
        status === 'completed' && "before:content-[''] before:absolute before:left-0 before:top-1/2 before:h-1 before:w-4 before:bg-primary",
      )}
      data-status={status}
    >
      {!isEditing ? (
        <>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">{title}</h3>
            <button 
              onClick={handleEdit}
              className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Edit roadmap item"
            >
              <Pencil className="w-5 h-5 text-primary" />
            </button>
          </div>
          <p className="mb-4 text-sm md:text-base">{description}</p>
          <div className="flex justify-between items-center text-xs md:text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{date}</span>
            </div>
            <div className="flex items-center">
              {status === 'completed' && <Check className="w-4 h-4 text-primary mr-1" />}
              <span className={cn(
                status === 'in-progress' && "text-primary",
                status === 'completed' && "line-through"
              )}>
                {status.replace('-', ' ')}
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div>
            <label htmlFor={`title-${id}`} className="block text-xs uppercase tracking-wider mb-1">Title</label>
            <input
              id={`title-${id}`}
              name="title"
              value={editData.title}
              onChange={handleChange}
              className="brutalist-input"
            />
          </div>
          <div>
            <label htmlFor={`description-${id}`} className="block text-xs uppercase tracking-wider mb-1">Description</label>
            <textarea
              id={`description-${id}`}
              name="description"
              value={editData.description}
              onChange={handleChange}
              rows={3}
              className="brutalist-input"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor={`date-${id}`} className="block text-xs uppercase tracking-wider mb-1">Date</label>
              <input
                id={`date-${id}`}
                name="date"
                value={editData.date}
                onChange={handleChange}
                className="brutalist-input"
              />
            </div>
            <div>
              <label htmlFor={`status-${id}`} className="block text-xs uppercase tracking-wider mb-1">Status</label>
              <select
                id={`status-${id}`}
                name="status"
                value={editData.status}
                onChange={handleChange}
                className="brutalist-input"
              >
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between pt-2">
            <button 
              onClick={() => onDelete(id)}
              className="text-destructive hover:underline"
            >
              Delete
            </button>
            <div className="space-x-2">
              <button 
                onClick={() => setIsEditing(false)}
                className="brutalist-button bg-muted"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="brutalist-button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapItem;
