import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';

interface QueueManagementProps {
  onTakeQueue: () => void;
}

const QueueManagement = ({ onTakeQueue }: QueueManagementProps) => {
  const [currentQueue, setCurrentQueue] = useState(1);
  const [totalQueue, setTotalQueue] = useState(15);

  const services = [
    { id: 1, name: 'Legalisir Dokumen', estimated: '10 menit' },
    { id: 2, name: 'Surat Aktif Kuliah', estimated: '5 menit' },
    { id: 3, name: 'Surat Cuti Akademik', estimated: '15 menit' },
    { id: 4, name: 'Transkrip Nilai', estimated: '20 menit' },
  ];

  const queueStatus = [
    { number: 1, name: 'Ahmad Rizki', service: 'Legalisir Dokumen', status: 'completed' },
    { number: 2, name: 'Sari Indah', service: 'Surat Aktif Kuliah', status: 'current' },
    { number: 3, name: 'Budi Santoso', service: 'Surat Cuti Akademik', status: 'waiting' },
    { number: 4, name: 'Lisa Permata', service: 'Legalisir Dokumen', status: 'waiting' },
    { number: 5, name: 'Doni Pratama', service: 'Transkrip Nilai', status: 'waiting' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success text-success-foreground">Selesai</Badge>;
      case 'current':
        return <Badge className="bg-warning text-warning-foreground">Sedang Dilayani</Badge>;
      case 'waiting':
        return <Badge variant="outline">Menunggu</Badge>;
      default:
        return <Badge variant="outline">Menunggu</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Sistem Antrean Dekanat
          </h1>
          <p className="text-xl text-muted-foreground">
            Universitas Widya Dharma Pontianak
          </p>
        </div>

        {/* Current Queue Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Users className="h-5 w-5" />
                Nomor Antrean Saat Ini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-6xl font-bold text-primary mb-2">{currentQueue}</div>
              <p className="text-muted-foreground">Sedang Dilayani</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Clock className="h-5 w-5" />
                Total Antrean Hari Ini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-6xl font-bold text-accent-foreground mb-2">{totalQueue}</div>
              <p className="text-muted-foreground">Mahasiswa Terlayani</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Status Sistem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="bg-success text-success-foreground text-lg px-4 py-2">
                AKTIF
              </Badge>
              <p className="text-muted-foreground mt-2">Sistem Berjalan Normal</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Queue Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status Antrean</CardTitle>
              <CardDescription>
                Daftar mahasiswa yang sedang mengantri
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {queueStatus.map((item) => (
                  <div
                    key={item.number}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-primary w-12 text-center">
                        {item.number}
                      </div>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.service}</p>
                      </div>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Services Available */}
          <Card>
            <CardHeader>
              <CardTitle>Layanan Tersedia</CardTitle>
              <CardDescription>
                Jenis layanan yang dapat diakses di dekanat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{service.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Estimasi: {service.estimated}
                      </p>
                    </div>
                    <Badge variant="outline">Tersedia</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-6" onClick={onTakeQueue}>
            Ambil Nomor Antrean
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6">
            Login Admin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QueueManagement;