import { Property } from "../data/mock-data";
import Image from "next/image";

interface SidebarProps {
  properties: Property[];
  selectedProperty: Property | null;
  onSelectProperty: (property: Property) => void;
}

export default function Sidebar({ properties, selectedProperty, onSelectProperty }: SidebarProps) {
  return (
    <div className="w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-full overflow-y-auto">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-semibold">Properties</h2>
      </div>
      <div className="py-2">
        {properties.map((property) => (
          <button
            key={property.id}
            onClick={() => onSelectProperty(property)}
            className={`w-full text-left p-3 flex items-center space-x-3 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ${
              selectedProperty?.id === property.id ? "bg-slate-200 dark:bg-slate-800" : ""
            }`}
          >
            <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={property.image}
                alt={property.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <p className="font-medium truncate">{property.name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                {property.address}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
