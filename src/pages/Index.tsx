import { useState } from 'react';
import QueueManagement from './QueueManagement';
import QueueForm from '@/components/QueueForm';

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'form'>('dashboard');

  const handleTakeQueue = () => {
    setCurrentView('form');
  };

  const handleBack = () => {
    setCurrentView('dashboard');
  };

  if (currentView === 'form') {
    return <QueueForm onBack={handleBack} />;
  }

  return <QueueManagement onTakeQueue={handleTakeQueue} />;
};

export default Index;
