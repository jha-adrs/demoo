"use client";

import { useState } from "react";
import Sidebar from "../components/sidebar";
import RenovationItemCard from "../components/renovation-item-card";
import { properties, renovationItems, Property } from "../data/mock-data";
import Image from "next/image";

export default function RenovationTracker() {
  const [selectedProperty, setSelectedProperty] = useState<Property>(properties[0]);
  
  // Filter renovation items for the selected property
  const propertyItems = renovationItems.filter(
    (item) => item.propertyId === selectedProperty.id
  );

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      {/* Sidebar */}
      <Sidebar
        properties={properties}
        selectedProperty={selectedProperty}
        onSelectProperty={setSelectedProperty}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Renovation Tracker</h1>
            <div className="flex items-center gap-4">
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
    </div>
  );
}
