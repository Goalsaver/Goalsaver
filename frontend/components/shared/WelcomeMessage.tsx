'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface WelcomeMessageProps {
  firstName: string;
  isNewUser?: boolean;
  onClose?: () => void;
}

export function WelcomeMessage({ firstName, isNewUser = false, onClose }: WelcomeMessageProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-dismiss after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        setTimeout(onClose, 300); // Wait for animation to complete
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      setTimeout(onClose, 300);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
        >
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-2xl p-6 flex items-center justify-between border-2 border-blue-400">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">👋</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {isNewUser ? 'Welcome' : 'Welcome back'}, {firstName}!
                </h3>
                <p className="text-sm text-blue-100">
                  {isNewUser ? "Let's start saving together!" : 'Great to see you again!'}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-blue-100 transition-colors p-1 rounded-full hover:bg-white/20"
              aria-label="Close welcome message"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
