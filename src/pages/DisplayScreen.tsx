import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Calendar, MapPin, Phone, Mail, CheckCircle, AlertCircle, Users } from 'lucide-react';

const DisplayScreen = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentQueue, setCurrentQueue] = useState(5);

  // Data 7 Dosen Dekanat
  const dekanData = [
    {
      id: 1,
      name: 'Prof. Dr. Sutrisno, M.Si.',
      position: 'Dekan',
      room: 'Ruang Dekan',
      status: 'available',
      currentService: null,
      phone: '0561-123456',
      email: 'dekan@widyadharma.ac.id'
    },
    {
      id: 2,
      name: 'Dr. Sri Wahyuni, M.Pd.',
      position: 'Wakil Dekan I',
      room: 'Ruang WD I',
      status: 'busy',
      currentService: 'Konsultasi Akademik',
      phone: 'Ext. 101',
      email: 'wd1@widyadharma.ac.id'
    },
    {
      id: 3,
      name: 'Dr. Ahmad Rahman, M.T.',
      position: 'Wakil Dekan II',
      room: 'Ruang WD II',
      status: 'available',
      currentService: null,
      phone: 'Ext. 102',
      email: 'wd2@widyadharma.ac.id'
    },
    {
      id: 4,
      name: 'Dra. Maria Sari, M.M.',
      position: 'Wakil Dekan III',
      room: 'Ruang WD III',
      status: 'meeting',
      currentService: 'Rapat Internal',
      phone: 'Ext. 103',
      email: 'wd3@widyadharma.ac.id'
    },
    {
      id: 5,
      name: 'Dr. Budi Santoso, S.E., M.Ak.',
      position: 'Kepala Tata Usaha',
      room: 'Ruang Ka. TU',
      status: 'available',
      currentService: null,
      phone: 'Ext. 104',
      email: 'katu@widyadharma.ac.id'
    },
    {
      id: 6,
      name: 'Drs. Hendri Pratama, M.Pd.',
      position: 'Sekretaris Dekanat',
      room: 'Ruang Sekretaris',
      status: 'busy',
      currentService: 'Pelayanan Surat',
      phone: 'Ext. 105',
      email: 'sekretaris@widyadharma.ac.id'
    },
    {
      id: 7,
      name: 'Ir. Lisa Permatasari, M.T.',
      position: 'Koordinator Layanan',
      room: 'Ruang Pelayanan',
      status: 'available',
      currentService: null,
      phone: 'Ext. 106',
      email: 'pelayanan@widyadharma.ac.id'
    }
  ];

  const queueList = [
    { number: 1, name: 'Ahmad Rizki', service: 'Legalisir Dokumen', status: 'completed' },
    { number: 2, name: 'Sari Indah', service: 'Surat Aktif Kuliah', status: 'completed' },
    { number: 3, name: 'Budi Santoso', service: 'Surat Cuti Akademik', status: 'completed' },
    { number: 4, name: 'Lisa Permata', service: 'Legalisir Dokumen', status: 'completed' },
    { number: 5, name: 'Doni Pratama', service: 'Transkrip Nilai', status: 'current' },
    { number: 6, name: 'Rina Sari', service: 'Surat Aktif Kuliah', status: 'waiting' },
    { number: 7, name: 'Tony Wijaya', service: 'Legalisir Dokumen', status: 'waiting' },
    { number: 8, name: 'Maya Indah', service: 'Surat Cuti Akademik', status: 'waiting' },
  ];

  // Update time setiap detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-success text-success-foreground">Tersedia</Badge>;
      case 'busy':
        return <Badge className="bg-warning text-warning-foreground">Sibuk</Badge>;
      case 'meeting':
        return <Badge className="bg-destructive text-destructive-foreground">Rapat</Badge>;
      default:
        return <Badge variant="outline">Tidak Aktif</Badge>;
    }
  };

  const getQueueStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success text-success-foreground text-xs">Selesai</Badge>;
      case 'current':
        return <Badge className="bg-primary text-primary-foreground text-xs animate-pulse">Sedang Dilayani</Badge>;
      case 'waiting':
        return <Badge variant="outline" className="text-xs">Menunggu</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Menunggu</Badge>;
    }
  };

  const availableStaff = dekanData.filter(d => d.status === 'available').length;
  const busyStaff = dekanData.filter(d => d.status === 'busy').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            LAYANAN DEKANAT
          </h1>
          <h2 className="text-2xl text-primary font-semibold">
            Universitas Widya Dharma Pontianak
          </h2>
          <div className="flex items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{currentTime.toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="text-xl font-mono">
                {currentTime.toLocaleTimeString('id-ID', { 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit' 
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-3xl font-bold text-primary mb-2">{currentQueue}</div>
              <p className="text-sm text-muted-foreground">Antrean Saat Ini</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-3xl font-bold text-success mb-2">{availableStaff}</div>
              <p className="text-sm text-muted-foreground">Petugas Tersedia</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-3xl font-bold text-warning mb-2">{busyStaff}</div>
              <p className="text-sm text-muted-foreground">Sedang Melayani</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-3xl font-bold text-accent-foreground mb-2">{queueList.filter(q => q.status === 'waiting').length}</div>
              <p className="text-sm text-muted-foreground">Menunggu</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status Dosen Dekanat */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Status Dosen & Petugas Dekanat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dekanData.map((dosen) => (
                  <div
                    key={dosen.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <User className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-semibold text-sm">{dosen.name}</p>
                          <p className="text-xs text-muted-foreground">{dosen.position}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {dosen.room}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {dosen.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                      {dosen.currentService && (
                        <p className="text-xs text-primary mt-1 ml-11">
                          📋 {dosen.currentService}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      {getStatusBadge(dosen.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Status Antrean */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Status Antrean Hari Ini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {queueList.map((item) => (
                  <div
                    key={item.number}
                    className={`flex items-center justify-between p-2 rounded border ${
                      item.status === 'current' ? 'bg-primary/10 border-primary' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`text-lg font-bold w-8 text-center ${
                        item.status === 'current' ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        {item.number}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.service}</p>
                      </div>
                    </div>
                    {getQueueStatusBadge(item.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Information */}
        <div className="bg-card p-4 rounded-lg border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm text-muted-foreground">
            <div>
              <p className="font-semibold">Jam Layanan</p>
              <p>Senin - Jumat: 08.00 - 15.00 WIB</p>
              <p>Sabtu: 08.00 - 12.00 WIB</p>
            </div>
            <div>
              <p className="font-semibold">Kontak</p>
              <p>📞 (0561) 123456</p>
              <p>📧 dekanat@widyadharma.ac.id</p>
            </div>
            <div>
              <p className="font-semibold">Lokasi</p>
              <p>Gedung Dekanat Lt. 2</p>
              <p>Jl. Dr. Wahidin Sudirohusodo, Pontianak</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayScreen;