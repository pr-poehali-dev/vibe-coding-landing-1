import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Application {
  id: number;
  fullName: string;
  telegram: string;
  email: string;
  message: string;
  timestamp: string;
}

export default function Admin() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    const data = JSON.parse(localStorage.getItem('applications') || '[]');
    setApplications(data);
  };

  const exportToCSV = () => {
    if (applications.length === 0) {
      toast.error('Нет заявок для экспорта');
      return;
    }

    const headers = ['Дата', 'ФИО', 'Telegram', 'Email', 'Комментарий'];
    const rows = applications.map(app => [
      new Date(app.timestamp).toLocaleString('ru-RU'),
      app.fullName,
      app.telegram,
      app.email,
      app.message || '-'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `заявки_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast.success('CSV файл загружен');
  };

  const deleteApplication = (id: number) => {
    const updated = applications.filter(app => app.id !== id);
    localStorage.setItem('applications', JSON.stringify(updated));
    setApplications(updated);
    toast.success('Заявка удалена');
  };

  const clearAll = () => {
    if (confirm('Удалить все заявки? Это действие нельзя отменить.')) {
      localStorage.setItem('applications', '[]');
      setApplications([]);
      toast.success('Все заявки удалены');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl md:text-6xl mb-2">Админка</h1>
            <p className="text-xl text-gray-600">Управление заявками на курс</p>
          </div>
          
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="border-2 border-black hover:bg-black hover:text-white"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            На главную
          </Button>
        </div>

        <Card className="border-2 border-black p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-4xl font-bold">{applications.length}</div>
                <div className="text-sm text-gray-600 font-semibold">Всего заявок</div>
              </div>
              
              <div className="h-12 w-px bg-gray-300" />
              
              <div>
                <div className="text-4xl font-bold">
                  {applications.filter(app => {
                    const date = new Date(app.timestamp);
                    const today = new Date();
                    return date.toDateString() === today.toDateString();
                  }).length}
                </div>
                <div className="text-sm text-gray-600 font-semibold">Сегодня</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={exportToCSV}
                disabled={applications.length === 0}
                className="bg-black text-white hover:bg-gray-900"
              >
                <Icon name="Download" size={20} className="mr-2" />
                Экспорт в CSV
              </Button>
              
              <Button
                onClick={clearAll}
                disabled={applications.length === 0}
                variant="destructive"
              >
                <Icon name="Trash2" size={20} className="mr-2" />
                Очистить всё
              </Button>
            </div>
          </div>
        </Card>

        {applications.length === 0 ? (
          <Card className="border-2 border-gray-200 p-16 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold mb-2">Пока нет заявок</h3>
            <p className="text-gray-600">Заявки появятся здесь после заполнения формы на главной странице</p>
          </Card>
        ) : (
          <Card className="border-2 border-black overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-black hover:bg-black">
                    <TableHead className="text-white font-bold">Дата и время</TableHead>
                    <TableHead className="text-white font-bold">ФИО</TableHead>
                    <TableHead className="text-white font-bold">Telegram</TableHead>
                    <TableHead className="text-white font-bold">Email</TableHead>
                    <TableHead className="text-white font-bold">Комментарий</TableHead>
                    <TableHead className="text-white font-bold w-24"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id} className="border-b-2">
                      <TableCell className="font-semibold">
                        {new Date(app.timestamp).toLocaleString('ru-RU', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                      <TableCell className="font-semibold">{app.fullName}</TableCell>
                      <TableCell>
                        <a 
                          href={`https://t.me/${app.telegram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline font-semibold"
                        >
                          {app.telegram}
                        </a>
                      </TableCell>
                      <TableCell>
                        <a 
                          href={`mailto:${app.email}`}
                          className="text-accent hover:underline font-semibold"
                        >
                          {app.email}
                        </a>
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-gray-600">
                        {app.message || '-'}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => deleteApplication(app.id)}
                          variant="ghost"
                          size="sm"
                          className="hover:bg-red-50 hover:text-red-600"
                        >
                          <Icon name="Trash2" size={18} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
