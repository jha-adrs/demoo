import { RenovationItem, RenovationStatus } from "../data/mock-data";
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
        return `${baseClass} bg-slate-200 text-slate-800`;
      case 'in-progress':
        return `${baseClass} bg-blue-200 text-blue-800`;
      case 'done':
        return `${baseClass} bg-green-200 text-green-800`;
      case 'overdue':
        return `${baseClass} bg-red-200 text-red-800`;
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
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm my-1">{item.description}</p>
          </div>
          <div className={getStatusBadge(item.status)}>
            {getStatusText(item.status)}
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600 dark:text-slate-400">Contractor:</span>
            <span className="font-medium">{item.contractor.name}, {item.contractor.company}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600 dark:text-slate-400">Timeline:</span>
            <span className="font-medium">
              {formatDate(item.startDate)} - {formatDate(item.endDate)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600 dark:text-slate-400">Status:</span>
            <span className={
              item.status === 'overdue' ? 'text-red-600' : 
              item.status === 'done' ? 'text-green-600' : 
              'font-medium'
            }>
              {getDaysRemaining()}
            </span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <Button 
            onClick={() => setShowNotes(true)}
            variant="outline"
            className="w-full"
          >
            View Notes ({item.notes.length})
          </Button>
        </div>
      </div>

      <Dialog
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
        title={`Notes for ${item.name}`}
      >
        <div className="space-y-4">
          <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-md">
            <p className="font-medium">Project Details</p>
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
              <div>Contractor:</div>
              <div className="font-medium">{item.contractor.name}</div>
              <div>Company:</div>
              <div className="font-medium">{item.contractor.company}</div>
              <div>Contact:</div>
              <div className="font-medium">{item.contractor.phone}</div>
              <div>Email:</div>
              <div className="font-medium">{item.contractor.email}</div>
              <div>Start Date:</div>
              <div className="font-medium">{formatDate(item.startDate)}</div>
              <div>End Date:</div>
              <div className="font-medium">{formatDate(item.endDate)}</div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Contractor Notes</h3>
            {item.notes.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400">No notes available</p>
            ) : (
              <div className="space-y-3">
                {item.notes.map((note) => (
                  <div key={note.id} className="border border-slate-200 dark:border-slate-700 rounded-md p-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{note.author}</span>
                      <span className="text-slate-500 dark:text-slate-400">{formatDate(note.date)}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{note.content}</p>
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
