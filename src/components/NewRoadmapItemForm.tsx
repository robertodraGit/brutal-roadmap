
import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { RoadmapItemProps } from './RoadmapItem';

interface NewRoadmapItemFormProps {
  onAdd: (item: Omit<RoadmapItemProps, 'id' | 'onUpdate' | 'onDelete'>) => void;
}

const NewRoadmapItemForm = ({ onAdd }: NewRoadmapItemFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    status: 'planned' as RoadmapItemProps['status']
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim()) return;
    
    onAdd(formData);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      status: 'planned'
    });
    
    setIsOpen(false);
  };

  return (
    <div className="relative mb-16">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="brutalist-button flex items-center gap-2"
          aria-label="Add new roadmap item"
        >
          <Plus className="w-5 h-5" />
          <span>ADD NEW ITEM</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="roadmap-item space-y-4">
          <div>
            <label htmlFor="title" className="block text-xs uppercase tracking-wider mb-1">Title</label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Task title"
              className="brutalist-input"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-xs uppercase tracking-wider mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Task description"
              rows={3}
              className="brutalist-input"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-xs uppercase tracking-wider mb-1">Date</label>
              <input
                id="date"
                name="date"
                type="text"
                value={formData.date}
                onChange={handleChange}
                placeholder="YYYY-MM-DD"
                className="brutalist-input"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-xs uppercase tracking-wider mb-1">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="brutalist-input"
              >
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button 
              type="button"
              onClick={() => setIsOpen(false)}
              className="brutalist-button bg-muted"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="brutalist-button"
            >
              Add Project
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewRoadmapItemForm;
