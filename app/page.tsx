"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "./components/sidebar";
import RenovationItemCard from "./components/renovation-item-card";
import { properties, renovationItems, Property, RenovationStatus } from "./data/mock-data";

export default function Home() {
  const [selectedProperty, setSelectedProperty] = useState<Property>(properties[0]);
  const [statusFilter, setStatusFilter] = useState<RenovationStatus | 'all'>('all');
  
  // Filter renovation items by property and status
  const propertyItems = renovationItems.filter(
    (item) => item.propertyId === selectedProperty.id && 
              (statusFilter === 'all' || item.status === statusFilter)
  );

  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-zinc-950">
      {/* Sidebar for Property Selection */}
      <Sidebar
        properties={properties}
        selectedProperty={selectedProperty}
        onSelectProperty={setSelectedProperty}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-zinc-800 shadow-sm border-b border-zinc-200 dark:border-zinc-700 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Real Estate Renovation Tracker</h1>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">{selectedProperty.name}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {selectedProperty.address}
                </p>
              </div>
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-zinc-700 shadow-sm">
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
          {/* Renovation Summary */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">Renovation Items</h2>
            <div className="flex gap-2 items-center">
              <span className="text-sm text-zinc-600 dark:text-zinc-300">
                {propertyItems.length} items
              </span>
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button 
              onClick={() => setStatusFilter('all')} 
              className={`px-4 py-1 rounded-full text-sm transition-colors ${
                statusFilter === 'all' 
                  ? "bg-slate-200 dark:bg-slate-800" 
                  : "hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setStatusFilter('in-progress')} 
              className={`px-4 py-1 rounded-full text-sm transition-colors ${
                statusFilter === 'in-progress' 
                  ? "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200" 
                  : "hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              In Progress
            </button>
            <button 
              onClick={() => setStatusFilter('not-started')} 
              className={`px-4 py-1 rounded-full text-sm transition-colors ${
                statusFilter === 'not-started' 
                  ? "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200" 
                  : "hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              Not Started
            </button>
            <button 
              onClick={() => setStatusFilter('done')} 
              className={`px-4 py-1 rounded-full text-sm transition-colors ${
                statusFilter === 'done' 
                  ? "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200" 
                  : "hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              Completed
            </button>
            <button 
              onClick={() => setStatusFilter('overdue')} 
              className={`px-4 py-1 rounded-full text-sm transition-colors ${
                statusFilter === 'overdue' 
                  ? "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200" 
                  : "hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              Overdue
            </button>
          </div>

          {/* Renovation Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {propertyItems.map((item) => (
              <RenovationItemCard key={item.id} item={item} />
            ))}
            
            {propertyItems.length === 0 && (
              <div className="col-span-full flex items-center justify-center py-12 text-slate-500 dark:text-slate-400">
                <div className="text-center">
                  <p className="text-lg">No renovation items match the current filter</p>
                  <p className="mt-1">Try selecting a different status filter or property</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
