import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';

export default function Index() {
  const [formData, setFormData] = useState({
    fullName: '',
    telegram: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    applications.push({
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now()
    });
    localStorage.setItem('applications', JSON.stringify(applications));
    
    toast.success('Заявка отправлена!');
    setFormData({ fullName: '', telegram: '', email: '', message: '' });
  };

  const modules = [
    {
      title: 'Модуль 1: Основы вайбкодинга',
      topics: ['Что такое вайб в коде', 'Эстетика синтаксиса', 'Философия минимализма']
    },
    {
      title: 'Модуль 2: Визуальное мышление',
      topics: ['Дизайн-паттерны', 'Композиция интерфейсов', 'Цвет и типографика']
    },
    {
      title: 'Модуль 3: Практика',
      topics: ['Создание компонентов', 'Реальные проекты', 'Портфолио']
    }
  ];

  const faq = [
    {
      question: 'Нужен ли опыт программирования?',
      answer: 'Нет. Курс построен так, что начать может любой. Главное — желание создавать красивое.'
    },
    {
      question: 'Сколько длится курс?',
      answer: '6 недель интенсивной практики. По 3 занятия в неделю, каждое по 2 часа.'
    },
    {
      question: 'Что я получу на выходе?',
      answer: 'Портфолио из 5 проектов, навык создания интерфейсов и сертификат.'
    },
    {
      question: 'Есть ли поддержка после курса?',
      answer: 'Да. Доступ к закрытому комьюнити и консультациям на 3 месяца.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="space-y-6">
          <div className="inline-block bg-black text-white px-6 py-2 text-sm font-semibold tracking-wider">
            НОВЫЙ КУРС
          </div>
          
          <h1 className="text-6xl md:text-8xl leading-none">
            Вайбкодинг
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-600 max-w-3xl">
            Научись писать код, который не стыдно показать. 
            Курс для тех, кто хочет делать не просто работающие, 
            а визуально совершенные интерфейсы.
          </p>
        </div>
      </section>

      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl md:text-5xl mb-12">Почему этот курс</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white text-black p-8 border-0">
              <div className="w-16 h-16 bg-black rounded-full mb-4" />
              <h3 className="text-2xl mb-3 font-bold">Эстетика кода</h3>
              <p className="text-gray-600">
                Код должен быть красивым. Не только работать, но и выглядеть правильно.
              </p>
            </Card>
            
            <Card className="bg-white text-black p-8 border-0">
              <div className="w-16 h-16 bg-black mb-4" />
              <h3 className="text-2xl mb-3 font-bold">Скорость мысли</h3>
              <p className="text-gray-600">
                Научишься думать интерфейсами. Видеть решение до написания кода.
              </p>
            </Card>
            
            <Card className="bg-white text-black p-8 border-0">
              <div className="w-16 h-16 bg-black mb-4" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
              <h3 className="text-2xl mb-3 font-bold">Только практика</h3>
              <p className="text-gray-600">
                Никакой теории ради теории. Каждое занятие — реальный проект.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 max-w-5xl">
        <h2 className="text-4xl md:text-5xl mb-12">Программа</h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {modules.map((module, idx) => (
            <AccordionItem 
              key={idx} 
              value={`item-${idx}`}
              className="border-2 border-black px-6"
            >
              <AccordionTrigger className="text-xl font-bold hover:no-underline py-6">
                {module.title}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <ul className="space-y-2">
                  {module.topics.map((topic, topicIdx) => (
                    <li key={topicIdx} className="flex items-center gap-3 text-gray-600">
                      <div className="w-2 h-2 bg-accent" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="bg-accent text-white py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-black px-8 py-6 mb-12">
            <div className="text-5xl font-bold mb-4">45 000 ₽</div>
            <div className="text-lg opacity-90">Полный курс • 6 недель • Поддержка 3 месяца</div>
          </div>

          <h2 className="text-4xl md:text-5xl mb-8">Записаться на курс</h2>
          <p className="text-xl mb-12 opacity-90">
            Оплати курс и мы свяжемся с тобой для начала обучения.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">ФИО</label>
              <Input
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="bg-white text-black border-0 h-12"
                placeholder="Иван Иванов"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Telegram</label>
              <Input
                required
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                className="bg-white text-black border-0 h-12"
                placeholder="@username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <Input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white text-black border-0 h-12"
                placeholder="ivan@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Комментарий (необязательно)</label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-white text-black border-0 min-h-24"
                placeholder="Расскажи о себе и своих целях..."
              />
            </div>
            
            <div className="space-y-4">
              <Button 
                type="submit" 
                className="w-full h-14 text-lg bg-black text-white hover:bg-gray-900"
              >
                Оплатить 45 000 ₽
              </Button>
              
              <div className="border-t-2 border-white/20 pt-6">
                <p className="text-sm opacity-75 mb-3">Или переведи на карту:</p>
                <div className="bg-black/30 p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Номер карты:</span>
                    <span className="font-mono text-lg">2200 7007 1234 5678</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Получатель:</span>
                    <span>Иван Иванов</span>
                  </div>
                </div>
                <p className="text-xs opacity-60 mt-3">После оплаты отправь чек в Telegram</p>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 max-w-5xl">
        <h2 className="text-4xl md:text-5xl mb-12">Вопросы</h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faq.map((item, idx) => (
            <AccordionItem 
              key={idx} 
              value={`faq-${idx}`}
              className="border-2 border-black px-6"
            >
              <AccordionTrigger className="text-xl font-bold hover:no-underline py-6">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-lg text-gray-600 pb-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">© 2024 Вайбкодинг. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}