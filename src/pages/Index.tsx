import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QueueManagement from './QueueManagement';
import QueueForm from '@/components/QueueForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, Monitor, Settings } from 'lucide-react';

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'form' | 'selection'>('selection');
  const navigate = useNavigate();

  const handleTakeQueue = () => {
    setCurrentView('form');
  };

  const handleBack = () => {
    setCurrentView('selection');
  };

  const navigateTo = (path: string) => {
    navigate(path);
  };

  if (currentView === 'form') {
    return <QueueForm onBack={handleBack} />;
  }

  if (currentView === 'dashboard') {
    return <QueueManagement onTakeQueue={handleTakeQueue} />;
  }

  // Selection page
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Sistem Antrean Dekanat
          </h1>
          <h2 className="text-2xl text-primary font-semibold">
            Universitas Widya Dharma Pontianak
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pilih dashboard sesuai dengan peran Anda untuk mengakses sistem antrean dekanat
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigateTo('/admin')}>
            <CardHeader className="text-center">
              <Settings className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle>Dashboard Admin</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Kelola pengguna, layanan, dan laporan sistem antrean
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigateTo('/dean')}>
            <CardHeader className="text-center">
              <UserCheck className="h-12 w-12 text-success mx-auto mb-2" />
              <CardTitle>Dashboard Dosen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Kelola antrean, panggil mahasiswa, dan kontrol layanan
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigateTo('/student')}>
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-warning mx-auto mb-2" />
              <CardTitle>Dashboard Mahasiswa</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Ambil nomor antrean dan pantau status layanan
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigateTo('/display')}>
            <CardHeader className="text-center">
              <Monitor className="h-12 w-12 text-accent-foreground mx-auto mb-2" />
              <CardTitle>Layar Display</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Tampilan informasi antrean untuk ruang tunggu
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => setCurrentView('dashboard')}>
              Demo Queue Management
            </Button>
            <Button onClick={() => navigateTo('/login')}>
              Login Sistem
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Untuk menggunakan fitur lengkap, silakan hubungkan dengan Supabase terlebih dahulu
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
