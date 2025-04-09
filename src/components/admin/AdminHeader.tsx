
import React from 'react';
import { ShieldAlert, Bell, User, BadgeIndianRupee } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <header className="w-full bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/admin" className="flex items-center gap-2">
              <ShieldAlert className="h-6 w-6 text-amber-600" />
              <span className="text-xl font-bold">Admin Panel</span>
            </Link>
          </div>
          
          <SearchBar onSearch={(query) => console.log("Admin search:", query)} />
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-1 text-amber-600">
              <BadgeIndianRupee className="h-5 w-5" />
              <span className="font-medium">INR</span>
            </div>
            
            <button className="relative p-2 rounded-full hover:bg-slate-100">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                3
              </span>
            </button>
            
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-amber-600 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium">Admin</span>
            </div>
            
            <Link to="/" className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors">
              View Site
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
