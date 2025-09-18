import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { PlayCircle, PauseCircle, Users, Clock, CheckCircle, AlertTriangle, ChevronUp, ChevronDown, X } from 'lucide-react';

const DeanDashboard = () => {
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [currentlyServing, setCurrentlyServing] = useState<number | null>(null);

  // Data dummy - akan diganti dengan data dari Supabase
  const queueStats = {
    waiting: 5,
    completed: 12,
    currentNumber: 8,
    estimatedWaitTime: '25 menit'
  };

  const queueList = [
    { 
      id: 1, 
      number: 9, 
      name: 'Ahmad Rizki Pratama', 
      service: 'Legalisir Dokumen', 
      waitTime: '15 menit', 
      priority: 'normal',
      studentId: '123456789',
      contact: '081234567890'
    },
    { 
      id: 2, 
      number: 10, 
      name: 'Sari Indah Permata', 
      service: 'Surat Aktif Kuliah', 
      waitTime: '20 menit', 
      priority: 'urgent',
      studentId: '987654321',
      contact: '081987654321'
    },
    { 
      id: 3, 
      number: 11, 
      name: 'Budi Santoso', 
      service: 'Konsultasi Akademik', 
      waitTime: '25 menit', 
      priority: 'normal',
      studentId: '456789123',
      contact: '081456789123'
    }
  ];

  const serviceTypes = [
    { id: 1, name: 'Legalisir Dokumen', estimatedTime: '15 menit' },
    { id: 2, name: 'Surat Aktif Kuliah', estimatedTime: '10 menit' },
    { id: 3, name: 'Surat Cuti Akademik', estimatedTime: '20 menit' },
    { id: 4, name: 'Konsultasi Akademik', estimatedTime: '30 menit' }
  ];

  const completedToday = [
    { id: 1, number: 5, name: 'Lisa Permata', service: 'Legalisir Dokumen', completedAt: '09:30' },
    { id: 2, number: 6, name: 'Doni Pratama', service: 'Surat Aktif Kuliah', completedAt: '10:15' },
    { id: 3, number: 7, name: 'Rina Sari', service: 'Surat Cuti Akademik', completedAt: '10:45' }
  ];

  const handleOpenQueue = () => {
    if (!selectedService) {
      alert('Pilih jenis layanan terlebih dahulu');
      return;
    }
    setIsQueueOpen(true);
  };

  const handleCloseQueue = () => {
    setIsQueueOpen(false);
    setCurrentlyServing(null);
  };

  const handleCallNext = (queueId: number) => {
    setCurrentlyServing(queueId);
    // Logic untuk memanggil antrean berikutnya
  };

  const handleCompleteService = () => {
    setCurrentlyServing(null);
    // Logic untuk menyelesaikan layanan
  };

  const handlePrioritize = (queueId: number, direction: 'up' | 'down') => {
    // Logic untuk mengatur prioritas antrean
    console.log('Prioritize:', queueId, direction);
  };

  const handleCancelQueue = (queueId: number) => {
    // Logic untuk membatalkan antrean
    console.log('Cancel queue:', queueId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Dosen Dekanat</h1>
            <p className="text-muted-foreground">Kelola antrean dan layanan mahasiswa</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Status Ruangan:</span>
              <Badge className={isQueueOpen ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'}>
                {isQueueOpen ? 'Buka' : 'Tutup'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Queue Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isQueueOpen ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
              Kontrol Antrean
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="text-sm font-medium">Jenis Layanan</label>
                <Select value={selectedService} onValueChange={setSelectedService} disabled={isQueueOpen}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Pilih jenis layanan" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((service) => (
                      <SelectItem key={service.id} value={service.id.toString()}>
                        {service.name} ({service.estimatedTime})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isQueueOpen}
                  onCheckedChange={isQueueOpen ? handleCloseQueue : handleOpenQueue}
                />
                <label className="text-sm font-medium">
                  {isQueueOpen ? 'Tutup Antrean' : 'Buka Antrean'}
                </label>
              </div>
              <div>
                {isQueueOpen ? (
                  <Button variant="destructive" onClick={handleCloseQueue} className="w-full">
                    <PauseCircle className="h-4 w-4 mr-2" />
                    Tutup Antrean
                  </Button>
                ) : (
                  <Button onClick={handleOpenQueue} className="w-full" disabled={!selectedService}>
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Buka Antrean
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{queueStats.waiting}</p>
                  <p className="text-sm text-muted-foreground">Menunggu</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-success" />
                <div>
                  <p className="text-2xl font-bold">{queueStats.completed}</p>
                  <p className="text-sm text-muted-foreground">Selesai Hari Ini</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold">#{queueStats.currentNumber}</p>
                  <p className="text-sm text-muted-foreground">Nomor Saat Ini</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-8 w-8 text-accent-foreground" />
                <div>
                  <p className="text-lg font-bold">{queueStats.estimatedWaitTime}</p>
                  <p className="text-sm text-muted-foreground">Estimasi Tunggu</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Queue */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Antrean Aktif</CardTitle>
              {currentlyServing && (
                <Button onClick={handleCompleteService} className="bg-success text-success-foreground">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Selesai Layani
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {queueList.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`p-3 border rounded-lg ${
                      currentlyServing === item.id ? 'bg-primary/10 border-primary' : ''
                    } ${item.priority === 'urgent' ? 'border-l-4 border-l-warning' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className={`text-2xl font-bold ${
                            currentlyServing === item.id ? 'text-primary' : 'text-muted-foreground'
                          }`}>
                            #{item.number}
                          </div>
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.service} • ID: {item.studentId}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Menunggu: {item.waitTime} • Tel: {item.contact}
                            </p>
                          </div>
                        </div>
                        {item.priority === 'urgent' && (
                          <Badge className="bg-warning text-warning-foreground mt-2">
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        {currentlyServing !== item.id && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleCallNext(item.id)}
                              className="mb-1"
                            >
                              Panggil
                            </Button>
                            <div className="flex gap-1">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handlePrioritize(item.id, 'up')}
                                disabled={index === 0}
                              >
                                <ChevronUp className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handlePrioritize(item.id, 'down')}
                                disabled={index === queueList.length - 1}
                              >
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleCancelQueue(item.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Completed Today */}
          <Card>
            <CardHeader>
              <CardTitle>Selesai Hari Ini</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {completedToday.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-success" />
                      <div>
                        <p className="font-semibold">#{item.number} - {item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.service}</p>
                      </div>
                    </div>
                    <Badge className="bg-success text-success-foreground">
                      {item.completedAt}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeanDashboard;