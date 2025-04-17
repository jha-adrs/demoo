"use client";

import { useState } from "react";
import Sidebar from "../components/sidebar";
import RenovationItemCard from "../components/renovation-item-card";
import { properties, renovationItems, Property } from "../data/mock-data";
import Image from "next/image";
import { Dialog } from "../components/ui/dialog";
import { Button } from "../components/ui/button";

export default function RenovationTracker() {
  const [selectedProperty, setSelectedProperty] = useState<Property>(properties[0]);
  const [isPropertySheetOpen, setIsPropertySheetOpen] = useState(false);
  
  // Filter renovation items for the selected property
  const propertyItems = renovationItems.filter(
    (item) => item.propertyId === selectedProperty.id
  );

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      {/* Sidebar - only visible on larger screens */}
      <div className="hidden md:block">
        <Sidebar
          properties={properties}
          selectedProperty={selectedProperty}
          onSelectProperty={setSelectedProperty}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Renovation Tracker</h1>
            <div 
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => setIsPropertySheetOpen(true)}
            >
              <div className="text-right">
                <p className="font-medium">{selectedProperty.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {selectedProperty.address}
                </p>
              </div>
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm">
                <Image
                  src={selectedProperty.image}
                  alt={selectedProperty.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Renovation Items</h2>
            <div className="flex gap-2 items-center">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {propertyItems.length} items
              </span>
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button className="px-4 py-1 bg-slate-200 dark:bg-slate-800 rounded-full text-sm">
              All
            </button>
            <button className="px-4 py-1 rounded-full text-sm hover:bg-slate-200 dark:hover:bg-slate-800">
              In Progress
            </button>
            <button className="px-4 py-1 rounded-full text-sm hover:bg-slate-200 dark:hover:bg-slate-800">
              Not Started
            </button>
            <button className="px-4 py-1 rounded-full text-sm hover:bg-slate-200 dark:hover:bg-slate-800">
              Completed
            </button>
            <button className="px-4 py-1 rounded-full text-sm hover:bg-slate-200 dark:hover:bg-slate-800">
              Overdue
            </button>
          </div>

          {/* Renovation Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {propertyItems.map((item) => (
              <RenovationItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Property Selection Side Sheet - appears on smaller screens */}
      <Dialog
        isOpen={isPropertySheetOpen}
        onClose={() => setIsPropertySheetOpen(false)}
        title="Select Property"
        position="right"
      >
        <div className="overflow-y-auto max-h-[70vh]">
          <div className="py-2 space-y-1">
            {properties.map((property) => (
              <button
                key={property.id}
                onClick={() => {
                  setSelectedProperty(property);
                  setIsPropertySheetOpen(false);
                }}
                className={`w-full text-left p-3 flex items-center space-x-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ${
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
      </Dialog>
    </div>
  );
}
