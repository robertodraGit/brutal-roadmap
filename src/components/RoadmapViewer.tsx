
import { useState, useEffect, useRef } from 'react';
import RoadmapItem, { RoadmapItemProps } from './RoadmapItem';
import NewRoadmapItemForm from './NewRoadmapItemForm';
import { cn } from '@/lib/utils';
import { toast } from "@/components/ui/sonner";
import { initialRoadmapItems } from '@/utils/items';

const RoadmapViewer = () => {
  const [roadmapItems, setRoadmapItems] = useState<Array<Omit<RoadmapItemProps, 'onUpdate' | 'onDelete'>>>([]);
  const [filter, setFilter] = useState<RoadmapItemProps['status'] | 'all'>('all');
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Try to load from localStorage first
    const savedItems = localStorage.getItem('roadmapItems');
    if (savedItems) {
      try {
        setRoadmapItems(JSON.parse(savedItems));
      } catch (e) {
        console.error('Failed to parse saved roadmap items:', e);
        setRoadmapItems(initialRoadmapItems);
      }
    } else {
      // If nothing in localStorage, use initialRoadmapItems
      setRoadmapItems(initialRoadmapItems);
    }
  }, []);

  // Save to localStorage whenever roadmapItems changes
  useEffect(() => {
    if (roadmapItems.length > 0) {
      localStorage.setItem('roadmapItems', JSON.stringify(roadmapItems));
    }
  }, [roadmapItems]);

  // Add scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('card-visible');
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );
    
    // Get all card elements
    const cards = document.querySelectorAll('.roadmap-card');
    cards.forEach(card => {
      observer.observe(card);
    });
    
    return () => {
      cards.forEach(card => {
        observer.unobserve(card);
      });
    };
  }, [roadmapItems, filter]);

  const handleAddItem = (item: Omit<RoadmapItemProps, 'id' | 'onUpdate' | 'onDelete'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString()
    };
    
    setRoadmapItems(prev => [newItem, ...prev]);
    toast.success("Project added to roadmap");
    
    // Animate scroll to new item
    setTimeout(() => {
      if (itemsRef.current) {
        itemsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleUpdateItem = (id: string, data: Partial<RoadmapItemProps>) => {
    setRoadmapItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...data } : item
      )
    );
    toast.success("Project updated");
  };

  const handleDeleteItem = (id: string) => {
    setRoadmapItems(prev => prev.filter(item => item.id !== id));
    toast.success("Project removed from roadmap");
  };

  const filteredItems = filter === 'all' 
    ? roadmapItems 
    : roadmapItems.filter(item => item.status === filter);

  return (
    <div className="min-h-screen">
      <div className="relative snap-section h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-6xl md:text-9xl lg:text-[10rem] font-display uppercase font-black text-foreground max-w-4xl leading-none">
          <span className="inline-block animate-fade-in">TideScript</span>
          <br />
          <span className="text-primary inline-block animate-fade-in delay-100">ROADMAP</span>
        </h1>
        <p className="mt-8 text-xl md:text-2xl max-w-lg animate-fade-in delay-200">
          Scroll down to explore our project timeline and upcoming milestones.
        </p>
        <div className="absolute bottom-8 animate-bounce">
          <div className="text-primary text-4xl">↓</div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-24 pt-12 snap-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="roadmap-title mb-12">Roadmap</h2>
          
          <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
            <NewRoadmapItemForm onAdd={handleAddItem} />
            
            <div className="flex gap-2 flex-wrap">
              <button 
                onClick={() => setFilter('all')}
                className={cn(
                  "brutalist-button",
                  filter === 'all' ? "bg-primary" : "bg-secondary"
                )}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('planned')}
                className={cn(
                  "brutalist-button",
                  filter === 'planned' ? "bg-primary" : "bg-secondary"
                )}
              >
                Planned
              </button>
              <button 
                onClick={() => setFilter('in-progress')}
                className={cn(
                  "brutalist-button",
                  filter === 'in-progress' ? "bg-primary" : "bg-secondary"
                )}
              >
                In Progress
              </button>
              <button 
                onClick={() => setFilter('completed')}
                className={cn(
                  "brutalist-button",
                  filter === 'completed' ? "bg-primary" : "bg-secondary"
                )}
              >
                Completed
              </button>
            </div>
          </div>
          
          <div 
            ref={itemsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
          >
            {filteredItems.map((item, index) => (
              <div 
                key={item.id}
                className="roadmap-card opacity-0 translate-y-12"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <RoadmapItem 
                  {...item}
                  onUpdate={handleUpdateItem}
                  onDelete={handleDeleteItem}
                />
              </div>
            ))}
            
            {filteredItems.length === 0 && (
              <div className="col-span-full text-center py-16">
                <p className="text-2xl text-muted-foreground">No tasks found for this filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="grain"></div>
    </div>
  );
};

export default RoadmapViewer;
