import { RenovationItem, RenovationStatus, properties } from "../data/mock-data";
import { Button } from "./ui/button";
import { useState } from "react";
import { Dialog } from "./ui/dialog";


interface RenovationItemCardProps {
  item: RenovationItem;
}

export default function RenovationItemCard({ item }: RenovationItemCardProps) {
  const [showNotes, setShowNotes] = useState(false);

  // Format dates for better readability
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short',
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  // Determine status badge style
  const getStatusBadge = (status: RenovationStatus) => {
    const baseClass = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'not-started':
        return `${baseClass} bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200`;
      case 'in-progress':
        return `${baseClass} bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200`;
      case 'done':
        return `${baseClass} bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200`;
      case 'overdue':
        return `${baseClass} bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200`;
      default:
        return baseClass;
    }
  };

  // Calculate days remaining
  const getDaysRemaining = () => {
    const today = new Date();
    const endDate = new Date(item.endDate);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (item.status === 'done') {
      return 'Completed';
    }
    
    return diffDays > 0 
      ? `${diffDays} days remaining` 
      : diffDays === 0 
        ? 'Due today' 
        : `${Math.abs(diffDays)} days overdue`;
  };

  // Human readable status
  const getStatusText = (status: RenovationStatus) => {
    switch (status) {
      case 'not-started':
        return 'Not Started';
      case 'in-progress':
        return 'In Progress';
      case 'done':
        return 'Completed';
      case 'overdue':
        return 'Overdue';
      default:
        return status;
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-zinc-600 dark:text-zinc-300 text-sm my-1">{item.description}</p>
          </div>
          <div className={getStatusBadge(item.status)}>
            {getStatusText(item.status)}
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">Contractor:</span>
            <span className="font-medium">{item.contractor.name}, {item.contractor.company}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">Timeline:</span>
            <span className="font-medium">
              {formatDate(item.startDate)} - {formatDate(item.endDate)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">Status:</span>
            <span className={
              item.status === 'overdue' ? 'text-rose-600' : 
              item.status === 'done' ? 'text-emerald-600' : 
              'font-medium'
            }>
              {getDaysRemaining()}
            </span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
          <Button 
            onClick={() => setShowNotes(true)}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            View Notes ({item.notes.length})
          </Button>
        </div>
      </div>

      <Dialog
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
        title={`Notes for ${item.name}`}
      >
        <div className="space-y-6">
          {/* Property image and details at the top */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-1 h-48 md:h-full relative rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10"></div>
              <div className="absolute bottom-3 left-3 z-20">
                <div className={getStatusBadge(item.status)}>
                  {getStatusText(item.status)}
                </div>
              </div>
              <img 
                src={item.propertyId ? properties.find(p => p.id === item.propertyId)?.image : ''} 
                alt="Property" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            
            <div className="md:col-span-2 bg-zinc-100 dark:bg-zinc-800/70 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-400 mb-3">Project Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Contractor:</span>
                    <span className="font-medium">{item.contractor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Company:</span>
                    <span className="font-medium">{item.contractor.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Phone:</span>
                    <span className="font-medium">{item.contractor.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Email:</span>
                    <span className="font-medium">{item.contractor.email}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Start Date:</span>
                    <span className="font-medium">{formatDate(item.startDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">End Date:</span>
                    <span className="font-medium">{formatDate(item.endDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Status:</span>
                    <span className={
                      item.status === 'overdue' ? 'font-medium text-rose-600 dark:text-rose-400' : 
                      item.status === 'done' ? 'font-medium text-emerald-600 dark:text-emerald-400' : 
                      item.status === 'in-progress' ? 'font-medium text-indigo-600 dark:text-indigo-400' :
                      'font-medium'
                    }>
                      {getDaysRemaining()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes section */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Contractor Notes
            </h3>
            
            {item.notes.length === 0 ? (
              <p className="text-zinc-500 dark:text-zinc-400">No notes available</p>
            ) : (
              <div className="space-y-6">
                {item.notes.map((note) => (
                  <div key={note.id} className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 bg-white dark:bg-zinc-900/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-indigo-700 dark:text-indigo-400">{note.author}</span>
                      <span className="text-zinc-500 dark:text-zinc-400 text-sm px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full">{formatDate(note.date)}</span>
                    </div>
                    <p className="text-zinc-700 dark:text-zinc-300 mb-3">{note.content}</p>
                    
                    {/* Images in the note */}
                    {note.images && note.images.length > 0 && (
                      <div className="mt-4">
                        <div className={`grid ${note.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
                          {note.images.map((image, index) => (
                            <div key={index} className="relative aspect-video rounded-md overflow-hidden">
                              <img 
                                src={image} 
                                alt={`Progress photo ${index + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
}
