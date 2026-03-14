import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Info, AlertTriangle, X } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
}

interface NotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
}

export function NotificationPopup({ isOpen, onClose, notifications }: NotificationPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile or to close on click outside */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] md:hidden"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20, x: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl border border-white/10 bg-[#121212] shadow-2xl backdrop-blur-xl"
            style={{ originX: 1, originY: 0 }}
          >
            <div className="flex items-center justify-between border-b border-white/5 p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10">
                  <Bell className="h-4 w-4 text-purple-400" />
                </div>
                <h3 className="text-sm font-semibold text-white">Notifications</h3>
              </div>
              <button 
                onClick={onClose}
                className="rounded-full p-1 text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[380px] overflow-y-auto py-2 custom-scrollbar">
              {notifications.length > 0 ? (
                notifications.map((notif, index) => (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`group flex gap-3 px-4 py-3 transition-colors hover:bg-white/5 ${!notif.read ? 'bg-white/[0.02]' : ''}`}
                  >
                    <div className="mt-1 shrink-0">
                      {notif.type === 'success' && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
                          <Check className="h-4 w-4 text-green-400" />
                        </div>
                      )}
                      {notif.type === 'info' && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
                          <Info className="h-4 w-4 text-blue-400" />
                        </div>
                      )}
                      {notif.type === 'warning' && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10">
                          <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-xs font-semibold ${!notif.read ? 'text-white' : 'text-gray-300'}`}>
                          {notif.title}
                        </p>
                        <span className="text-[10px] text-gray-500">{notif.time}</span>
                      </div>
                      <p className="mt-1 text-[11px] leading-relaxed text-gray-400 group-hover:text-gray-300">
                        {notif.message}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
                    <Bell className="h-6 w-6 text-gray-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-500">No new notifications</p>
                </div>
              )}
            </div>

            <div className="border-t border-white/5 p-3">
              <button className="w-full rounded-lg bg-white/5 py-2 text-xs font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white">
                View All Activity
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
