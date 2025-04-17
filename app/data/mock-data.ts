// Mock data for the Real Estate Renovation Tracker

export interface Property {
  id: string;
  name: string;
  address: string;
  image: string;
}

export type RenovationStatus = 'not-started' | 'in-progress' | 'done' | 'overdue';

export interface Contractor {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
}

export interface RenovationItem {
  id: string;
  propertyId: string;
  name: string;
  description: string;
  contractor: Contractor;
  startDate: string;
  endDate: string;
  status: RenovationStatus;
  notes: Note[];
}

export interface Note {
  id: string;
  date: string;
  content: string;
  author: string;
  images?: string[];
}

// Sample Properties
export const properties: Property[] = [
  {
    id: '1',
    name: 'Riverside Cottage',
    address: '123 River Road, Riverdale, NY 10471',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Downtown Loft',
    address: '456 Main Street, New York, NY 10001',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Suburban Manor',
    address: '789 Oak Drive, White Plains, NY 10601',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop'
  }
];

// Sample Contractors
export const contractors: Contractor[] = [
  {
    id: '1',
    name: 'John Smith',
    company: 'Smith Construction',
    phone: '(555) 123-4567',
    email: 'john@smithconstruction.com'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    company: 'Elite Renovations',
    phone: '(555) 987-6543',
    email: 'sarah@eliterenovations.com'
  },
  {
    id: '3',
    name: 'Mike Chen',
    company: 'Chen Electrical',
    phone: '(555) 456-7890',
    email: 'mike@chenelectrical.com'
  },
  {
    id: '4',
    name: 'Diana Rodriguez',
    company: 'Clean Cut Carpentry',
    phone: '(555) 789-0123',
    email: 'diana@cleancutcarpentry.com'
  },
  {
    id: '5',
    name: 'Robert Williams',
    company: 'Williams Plumbing',
    phone: '(555) 234-5678',
    email: 'robert@williamsplumbing.com'
  }
];

// Generate 30 sample renovation items
const renovationTypes = [
  { name: 'Plaster Repair', description: 'Repair damaged plaster on walls and ceilings' },
  { name: 'Heating System', description: 'Install new high-efficiency heating system' },
  { name: 'Roof Replacement', description: 'Complete replacement of roof shingles and underlayment' },
  { name: 'Kitchen Remodel', description: 'Full kitchen renovation including cabinets and appliances' },
  { name: 'Bathroom Renovation', description: 'Update bathroom fixtures and tiles' },
  { name: 'Flooring Installation', description: 'Install hardwood flooring throughout the property' },
  { name: 'Window Replacement', description: 'Replace old windows with energy-efficient models' },
  { name: 'Exterior Painting', description: 'Paint all exterior surfaces' },
  { name: 'Interior Painting', description: 'Paint interior walls and trim' },
  { name: 'Deck Construction', description: 'Build new outdoor deck' },
  { name: 'Fence Installation', description: 'Install perimeter fence' },
  { name: 'Landscaping', description: 'Complete landscape design and installation' },
  { name: 'Electrical Wiring', description: 'Update electrical system to code' },
  { name: 'Plumbing Upgrade', description: 'Replace old pipes and fixtures' },
  { name: 'Insulation', description: 'Add insulation to attic and walls' },
  { name: 'Drywall Installation', description: 'Install new drywall in renovated areas' },
  { name: 'Concrete Foundation Repair', description: 'Fix cracks and issues in foundation' },
  { name: 'Cabinet Installation', description: 'Install new cabinets in kitchen and bathrooms' },
  { name: 'Countertop Installation', description: 'Install granite or quartz countertops' },
  { name: 'Appliance Installation', description: 'Install and connect new appliances' },
  { name: 'HVAC System', description: 'Install new heating, ventilation, and air conditioning system' },
  { name: 'Gutter Installation', description: 'Install new gutters and downspouts' },
  { name: 'Siding Replacement', description: 'Replace damaged or outdated siding' },
  { name: 'Staircase Renovation', description: 'Rebuild or refinish staircase' },
  { name: 'Lighting Fixtures', description: 'Update all lighting fixtures' },
  { name: 'Shower Installation', description: 'Install new shower systems' },
  { name: 'Tile Work', description: 'Install tile flooring and backsplashes' },
  { name: 'Carpet Installation', description: 'Install new carpeting in bedrooms' },
  { name: 'Smart Home System', description: 'Install smart home automation system' },
  { name: 'Security System', description: 'Install comprehensive security system' }
];

// Random note content templates
const noteTemplates = [
  "Materials have been delivered. We're ready to start work tomorrow.",
  "Hit a snag with the supplier. Materials will be delayed by 3 days.",
  "Found some unexpected issues behind the wall. Will need additional budget approval.",
  "Work is proceeding ahead of schedule. Might finish early if weather holds.",
  "Quality of initial work wasn't up to standard. Had to redo a section.",
  "Inspection passed successfully. Moving to the next phase now.",
  "Client requested a change to the original plan. Need to adjust timeline.",
  "Local permit office is backlogged. Waiting on final approval before continuing.",
  "Subcontractor did an excellent job. Work quality exceeds expectations.",
  "Weather delays have pushed us back a bit, but we're still aiming to finish on time."
];

// Generate random renovation items
const generateRenovationItems = (): RenovationItem[] => {
  const items: RenovationItem[] = [];
  const statuses: RenovationStatus[] = ['not-started', 'in-progress', 'done', 'overdue'];
  
  // 10 items for each property
  properties.forEach(property => {
    for (let i = 0; i < 10; i++) {
      const renovationType = renovationTypes[Math.floor(Math.random() * renovationTypes.length)];
      const contractor = contractors[Math.floor(Math.random() * contractors.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      // Generate random dates
      const today = new Date();
      const startOffset = Math.floor(Math.random() * 30) - 15; // -15 to +15 days from today
      const startDate = new Date();
      startDate.setDate(today.getDate() + startOffset);
      
      const durationDays = Math.floor(Math.random() * 30) + 5; // 5 to 35 days duration
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + durationDays);
      
      // Generate random notes (1-5 notes per item)
      const notes: Note[] = [];
      const noteCount = Math.floor(Math.random() * 5) + 1;
      for (let j = 0; j < noteCount; j++) {
        const noteDate = new Date(startDate);
        noteDate.setDate(startDate.getDate() + Math.floor(Math.random() * durationDays));
        
        notes.push({
          id: `note-${property.id}-${i}-${j}`,
          date: noteDate.toISOString().split('T')[0],
          content: noteTemplates[Math.floor(Math.random() * noteTemplates.length)],
          author: contractor.name
        });
      }
      
      items.push({
        id: `item-${property.id}-${i}`,
        propertyId: property.id,
        name: renovationType.name,
        description: renovationType.description,
        contractor,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        status,
        notes
      });
    }
  });
  
  return items;
};

export const renovationItems: RenovationItem[] = generateRenovationItems();
