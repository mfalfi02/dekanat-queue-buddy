import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, CreditCard, Clock } from 'lucide-react';

interface QueueFormProps {
  onBack: () => void;
}

const QueueForm = ({ onBack }: QueueFormProps) => {
  const [nim, setNim] = useState('');
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [queueNumber, setQueueNumber] = useState<number | null>(null);

  const services = [
    { id: 'legalisir', name: 'Legalisir Dokumen', estimated: '10 menit' },
    { id: 'surat_aktif', name: 'Surat Aktif Kuliah', estimated: '5 menit' },
    { id: 'surat_cuti', name: 'Surat Cuti Akademik', estimated: '15 menit' },
    { id: 'transkrip', name: 'Transkrip Nilai', estimated: '20 menit' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nim && name && service) {
      // Simulate queue number generation
      const newQueueNumber = Math.floor(Math.random() * 50) + 1;
      setQueueNumber(newQueueNumber);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted && queueNumber) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-success">Berhasil!</CardTitle>
            <CardDescription>
              Nomor antrean Anda telah berhasil dibuat
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-primary/10 p-8 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Nomor Antrean Anda</p>
              <div className="text-6xl font-bold text-primary">{queueNumber}</div>
            </div>
            
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nama:</span>
                <span className="font-medium">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">NIM:</span>
                <span className="font-medium">{nim}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Layanan:</span>
                <span className="font-medium">
                  {services.find(s => s.id === service)?.name}
                </span>
              </div>
            </div>

            <div className="bg-accent/20 p-4 rounded-lg">
              <p className="text-sm text-accent-foreground">
                <Clock className="h-4 w-4 inline mr-1" />
                Estimasi Waktu: {services.find(s => s.id === service)?.estimated}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Harap tunggu hingga nomor Anda dipanggil
              </p>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  setQueueNumber(null);
                  setNim('');
                  setName('');
                  setService('');
                }} 
                className="w-full"
              >
                Ambil Nomor Lagi
              </Button>
              <Button variant="outline" onClick={onBack} className="w-full">
                Kembali ke Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Ambil Nomor Antrean
            </h1>
            <p className="text-muted-foreground">
              Isi form di bawah untuk mendapatkan nomor antrean
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Data Mahasiswa
            </CardTitle>
            <CardDescription>
              Pastikan data yang Anda masukkan sudah benar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nim">
                  <CreditCard className="h-4 w-4 inline mr-1" />
                  Nomor Induk Mahasiswa (NIM)
                </Label>
                <Input
                  id="nim"
                  placeholder="Masukkan NIM Anda"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">
                  <User className="h-4 w-4 inline mr-1" />
                  Nama Lengkap
                </Label>
                <Input
                  id="name"
                  placeholder="Masukkan nama lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Pilih Layanan</Label>
                <Select value={service} onValueChange={setService} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis layanan" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((serviceItem) => (
                      <SelectItem key={serviceItem.id} value={serviceItem.id}>
                        <div className="flex flex-col">
                          <span>{serviceItem.name}</span>
                          <span className="text-xs text-muted-foreground">
                            Estimasi: {serviceItem.estimated}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-accent/20 p-4 rounded-lg">
                <p className="text-sm text-accent-foreground mb-2">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Informasi Penting:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Pastikan Anda hadir sesuai nomor antrean</li>
                  <li>• Siapkan dokumen yang diperlukan</li>
                  <li>• Waktu layanan: Senin-Jumat, 08.00-15.00</li>
                </ul>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Ambil Nomor Antrean
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QueueForm;