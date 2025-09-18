import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Clock, CheckCircle, AlertCircle, MapPin, Bell, Calendar } from 'lucide-react';

const StudentDashboard = () => {
  const [selectedDean, setSelectedDean] = useState('');
  const [selectedService, setSelectedService] = useState('');

  // Data dummy - akan diganti dengan data dari Supabase
  const currentQueue = {
    number: 5,
    status: 'waiting',
    estimatedWait: '15 menit',
    position: 3
  };

  const deanList = [
    { id: 1, name: 'Prof. Dr. Sutrisno, M.Si.', position: 'Dekan', room: 'Ruang Dekan', available: true },
    { id: 2, name: 'Dr. Sri Wahyuni, M.Pd.', position: 'Wakil Dekan I', room: 'Ruang WD I', available: false },
    { id: 3, name: 'Dr. Ahmad Rahman, M.T.', position: 'Wakil Dekan II', room: 'Ruang WD II', available: true },
    { id: 4, name: 'Dra. Maria Sari, M.M.', position: 'Wakil Dekan III', room: 'Ruang WD III', available: false }
  ];

  const serviceTypes = [
    { id: 1, name: 'Legalisir Dokumen', estimatedTime: '15 menit', description: 'Legalisir ijazah, transkrip, sertifikat' },
    { id: 2, name: 'Surat Aktif Kuliah', estimatedTime: '10 menit', description: 'Surat keterangan masih aktif kuliah' },
    { id: 3, name: 'Surat Cuti Akademik', estimatedTime: '20 menit', description: 'Pengajuan cuti sementara dari kuliah' },
    { id: 4, name: 'Konsultasi Akademik', estimatedTime: '30 menit', description: 'Konsultasi masalah akademik' }
  ];

  const queueHistory = [
    { id: 1, date: '2024-01-15', service: 'Legalisir Dokumen', status: 'completed', number: 3 },
    { id: 2, date: '2024-01-10', service: 'Surat Aktif Kuliah', status: 'completed', number: 7 }
  ];

  const handleJoinQueue = () => {
    // Logic untuk bergabung antrean - akan diimplementasi dengan Supabase
    console.log('Bergabung antrean:', { selectedDean, selectedService });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Mahasiswa</h1>
            <p className="text-muted-foreground">Sistem Antrean Dekanat UNWIDHA</p>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Current Queue Status */}
        {currentQueue.status !== 'none' && (
          <Card className="border-primary bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Status Antrean Anda
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-primary">#{currentQueue.number}</div>
                    <div>
                      <Badge className={currentQueue.status === 'waiting' ? 'bg-warning text-warning-foreground' : 'bg-success text-success-foreground'}>
                        {currentQueue.status === 'waiting' ? 'Menunggu' : 'Sedang Dilayani'}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        Posisi ke-{currentQueue.position} • Estimasi: {currentQueue.estimatedWait}
                      </p>
                    </div>
                  </div>
                </div>
                <Button variant="outline">
                  <Bell className="h-4 w-4 mr-2" />
                  Aktifkan Notifikasi
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Queue Registration */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Antrean Baru</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Pilih Dosen Tujuan</label>
                <Select value={selectedDean} onValueChange={setSelectedDean}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Pilih dosen dekanat" />
                  </SelectTrigger>
                  <SelectContent>
                    {deanList.map((dean) => (
                      <SelectItem key={dean.id} value={dean.id.toString()} disabled={!dean.available}>
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <p className="font-medium">{dean.name}</p>
                            <p className="text-xs text-muted-foreground">{dean.position} • {dean.room}</p>
                          </div>
                          <Badge variant={dean.available ? 'default' : 'secondary'}>
                            {dean.available ? 'Tersedia' : 'Sibuk'}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Jenis Layanan</label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Pilih jenis layanan" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((service) => (
                      <SelectItem key={service.id} value={service.id.toString()}>
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-xs text-muted-foreground">{service.description} • Est: {service.estimatedTime}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleJoinQueue} 
                className="w-full" 
                disabled={!selectedDean || !selectedService || currentQueue.status !== 'none'}
              >
                Ambil Nomor Antrean
              </Button>
            </CardContent>
          </Card>

          {/* Available Deans */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Status Dosen Dekanat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deanList.map((dean) => (
                  <div key={dean.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <User className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-semibold text-sm">{dean.name}</p>
                        <p className="text-xs text-muted-foreground">{dean.position}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{dean.room}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={dean.available ? 'default' : 'secondary'}>
                      {dean.available ? 'Tersedia' : 'Sibuk'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Queue History */}
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Antrean</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {queueHistory.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-success" />
                    <div>
                      <p className="font-medium">#{item.number} - {item.service}</p>
                      <p className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString('id-ID')}</p>
                    </div>
                  </div>
                  <Badge className="bg-success text-success-foreground">Selesai</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;