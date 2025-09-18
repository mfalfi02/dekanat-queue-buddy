import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Settings, FileText, Activity, Plus, Edit, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  // Data dummy - akan diganti dengan data dari Supabase
  const stats = {
    totalUsers: 156,
    activeQueues: 8,
    completedToday: 23,
    serviceCategories: 5
  };

  const recentUsers = [
    { id: 1, name: 'Ahmad Rizki', role: 'Mahasiswa', email: 'ahmad@student.untan.ac.id', status: 'active' },
    { id: 2, name: 'Dr. Sari Indah', role: 'Dosen Dekanat', email: 'sari@untan.ac.id', status: 'active' },
    { id: 3, name: 'Prof. Budi', role: 'Dosen', email: 'budi@untan.ac.id', status: 'inactive' }
  ];

  const serviceCategories = [
    { id: 1, name: 'Legalisir Dokumen', description: 'Legalisir ijazah dan transkrip', estimatedTime: '15 menit' },
    { id: 2, name: 'Surat Aktif Kuliah', description: 'Surat keterangan aktif kuliah', estimatedTime: '10 menit' },
    { id: 3, name: 'Surat Cuti Akademik', description: 'Pengajuan cuti akademik', estimatedTime: '20 menit' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Admin</h1>
            <p className="text-muted-foreground">Kelola sistem antrean dekanat</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Pengguna
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  <p className="text-sm text-muted-foreground">Total Pengguna</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Activity className="h-8 w-8 text-success" />
                <div>
                  <p className="text-2xl font-bold">{stats.activeQueues}</p>
                  <p className="text-sm text-muted-foreground">Antrean Aktif</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold">{stats.completedToday}</p>
                  <p className="text-sm text-muted-foreground">Selesai Hari Ini</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Settings className="h-8 w-8 text-accent-foreground" />
                <div>
                  <p className="text-2xl font-bold">{stats.serviceCategories}</p>
                  <p className="text-sm text-muted-foreground">Kategori Layanan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Management */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Manajemen Pengguna</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Tambah
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                        {user.role} • {user.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Service Categories */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Kategori Layanan</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Tambah
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceCategories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-semibold">{category.name}</p>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                      <Badge variant="outline" className="mt-1">
                        Est: {category.estimatedTime}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Section */}
        <Card>
          <CardHeader>
            <CardTitle>Laporan & Analitik</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col">
                <FileText className="h-6 w-6 mb-2" />
                Laporan Harian
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <Activity className="h-6 w-6 mb-2" />
                Statistik Layanan
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <Users className="h-6 w-6 mb-2" />
                Aktivitas Pengguna
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;