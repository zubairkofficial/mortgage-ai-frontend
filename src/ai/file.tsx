import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Search, ChevronLeft, ChevronRight, RefreshCw, BookmarkIcon, MoreVertical, Phone, Video, Info, Mic, Smile, Send, Download, Link, Check, User, Users, Settings, Moon, Image, Clock, PlusCircle } from 'lucide-react';

// Create a global color theme
const colors = {
  primary: '#6366f1', // Indigo color for primary elements
  secondary: '#f3f4f6', // Light gray for secondary elements
  accent: '#a855f7', // Purple for accent
  border: '#e5e7eb', // Light border color
  background: '#ffffff', // White background
  text: '#1f2937', // Dark text
  textLight: '#9ca3af', // Light text
  success: '#22c55e', // Green for success messages
};

export default function ChatInterface() {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-white text-gray-800">
      {/* Navigation Bar */}
      <div className="flex items-center p-2 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <ChevronLeft className="w-6 h-6 text-gray-500" />
          <ChevronRight className="w-6 h-6 text-gray-500" />
          <RefreshCw className="w-5 h-5 text-gray-500" />
        </div>
        <div className="flex-1 mx-2">
          <div className="flex items-center border border-gray-200 rounded-md px-3 py-1 bg-gray-50">
            <span className="text-gray-600 text-sm">themesdesign.in/vhato/layouts/index.html</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <BookmarkIcon className="w-5 h-5 text-gray-500" />
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-xs">
            G
          </div>
          <MoreVertical className="w-5 h-5 text-gray-500" />
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-72 border-r border-gray-200 flex flex-col bg-white">
          {/* Sidebar Header */}
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Messages <span className="text-sm text-gray-500">(128)</span></h2>
          </div>

          {/* Search Bar */}
          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search here..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md focus:outline-none"
              />
            </div>
          </div>

          {/* Favorites Section */}
          <div className="px-4 pb-2">
            <h3 className="text-xs font-medium text-gray-500 mb-2">FAVOURITES</h3>
          </div>

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto">
            {/* Contact 1 - Active */}
            <div className="px-4 py-3 flex items-center hover:bg-gray-100 cursor-pointer border-l-4 border-indigo-500">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  <img src="/api/placeholder/40/40" alt="Victoria Lane" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900">Victoria Lane</h4>
                  <span className="text-xs font-medium bg-red-100 text-red-600 px-2 py-0.5 rounded-full">18</span>
                </div>
                <p className="text-sm text-gray-600 truncate">Hey, I'm going to meet a friend of</p>
              </div>
            </div>

            {/* Contact 2 */}
            <div className="px-4 py-3 flex items-center hover:bg-gray-100 cursor-pointer">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  <img src="/api/placeholder/40/40" alt="Etta McDaniel" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900">Etta McDaniel</h4>
                </div>
                <p className="text-sm text-gray-600 truncate">Yeah everything is fine. Our next me...</p>
              </div>
            </div>

            {/* Contact 3 */}
            <div className="px-4 py-3 flex items-center hover:bg-gray-100 cursor-pointer">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center overflow-hidden text-white">
                  JP
                </div>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900">James Pinard</h4>
                </div>
                <p className="text-sm text-gray-600 truncate">Wow that's great!</p>
              </div>
            </div>

            {/* Contact 4 */}
            <div className="px-4 py-3 flex items-center hover:bg-gray-100 cursor-pointer">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  <img src="/api/placeholder/40/40" alt="Ronald Downey" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900">Ronald Downey</h4>
                </div>
                <p className="text-sm text-gray-600 truncate">Why I try the to get demo data follo...</p>
              </div>
            </div>

            {/* Direct Messages Section */}
            <div className="px-4 py-3 flex justify-between items-center">
              <h3 className="text-xs font-medium text-gray-500">DIRECT MESSAGES</h3>
              <button className="w-6 h-6 flex items-center justify-center bg-emerald-500 rounded-md text-white">
                <PlusCircle className="w-4 h-4" />
              </button>
            </div>

            {/* Contact 5 */}
            <div className="px-4 py-3 flex items-center hover:bg-gray-100 cursor-pointer">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  <img src="/api/placeholder/40/40" alt="Nicholas Staten" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900">Nicholas Staten</h4>
                </div>
                <p className="text-sm text-gray-600 truncate">Pleased to meet you again!</p>
              </div>
            </div>

            {/* Contact 6 */}
            <div className="px-4 py-3 flex items-center hover:bg-gray-100 cursor-pointer">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  <img src="/api/placeholder/40/40" alt="Kathryn Swarey" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900">Kathryn Swarey</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200 flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div className="ml-3 flex-1">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">My Profile</h4>
                  <div>
                    <Moon className="w-5 h-5 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="py-3 px-6 border-b border-gray-200 flex items-center justify-between bg-white">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  <img src="/api/placeholder/40/40" alt="Victoria Lane" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-gray-900">Victoria Lane</h4>
                <p className="text-xs text-green-500">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Search className="w-5 h-5 text-gray-500" />
              <Phone className="w-5 h-5 text-gray-500" />
              <Video className="w-5 h-5 text-gray-500" />
              <BookmarkIcon className="w-5 h-5 text-gray-500" />
              <Info className="w-5 h-5 text-gray-500" />
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {/* Time Header */}
            <div className="text-center mb-6">
              <span className="bg-white text-gray-500 text-xs px-3 py-1 rounded-full">Today</span>
            </div>

            {/* File Attachment Message */}
            <div className="flex justify-end mb-4">
              <div className="max-w-md">
                <div className="bg-purple-100 rounded-lg p-3">
                  <div className="flex items-center justify-between bg-white rounded-md p-3 border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
                        <Link className="w-5 h-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">design-phase-1-approved.pdf</p>
                        <p className="text-xs text-gray-500">12.5 MB</p>
                      </div>
                    </div>
                    <div>
                      <Download className="w-5 h-5 text-gray-500" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end mt-1">
                  <span className="text-xs text-gray-500 mr-1">10:16 am</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
              </div>
            </div>

            {/* Audio Message */}
            <div className="flex justify-start mb-4">
              <div className="max-w-md">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="flex items-center">
                    <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                      <div className="ml-1">►</div>
                    </button>
                    <div className="mx-3 text-gray-600 text-sm">
                      0:00 / 0:00
                    </div>
                    <div className="w-32 h-1 bg-gray-200 rounded-full"></div>
                    <div className="ml-3">
                      <Mic className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="ml-3">
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Message */}
            <div className="flex justify-start mb-4">
              <div className="max-w-md">
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="relative">
                    <img src="/api/placeholder/350/200" alt="Video Thumbnail" className="rounded-lg w-full" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-red-600 bg-opacity-80 flex items-center justify-center">
                        <div className="ml-1 w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white"></div>
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                        <img src="/api/placeholder/32/32" alt="Channel" className="w-full h-full object-cover" />
                      </div>
                      <span className="ml-2 text-white font-medium text-sm">DreamWorks Madag...</span>
                    </div>
                  </div>
                </div>
                <div className="mt-1">
                  <span className="text-xs text-gray-500">10:25 am</span>
                </div>
              </div>
            </div>

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center text-gray-500 text-sm mt-2">
                <span>Victoria Lane is typing</span>
                <span className="ml-1 flex">
                  <span className="animate-bounce mx-0.5">.</span>
                  <span className="animate-bounce mx-0.5" style={{ animationDelay: '0.2s' }}>.</span>
                  <span className="animate-bounce mx-0.5" style={{ animationDelay: '0.4s' }}>.</span>
                </span>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex items-center">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <MoreVertical className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Smile className="w-6 h-6" />
              </button>
              <div className="flex-1 mx-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Mic className="w-6 h-6" />
              </button>
              <button className="p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Windows Activation Banner */}
      <div className="fixed bottom-0 right-0 left-0 bg-white border-t border-gray-200 p-2 flex justify-between items-center">
        <div className="flex space-x-4">
          <div className="flex items-center justify-center w-8 h-8">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-3 h-3 bg-blue-500"></div>
              <div className="w-3 h-3 bg-green-500"></div>
              <div className="w-3 h-3 bg-yellow-500"></div>
              <div className="w-3 h-3 bg-red-500"></div>
            </div>
          </div>
          <div className="w-5 h-5 flex items-center justify-center">
            <Search className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex items-center justify-center">
            <Image className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">G</div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 rounded bg-yellow-500"></div>
          </div>
        </div>
        <div className="flex items-center text-xs text-gray-700">
          <Clock className="w-4 h-4 mr-1" />
          <span>12:25 PM</span>
          <span className="mx-1">|</span>
          <span>5/21/2025</span>
        </div>
      </div>
    </div>
  );
}