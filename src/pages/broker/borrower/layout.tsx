import { Outlet, NavLink } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Users, FileCheck, Calculator } from 'lucide-react';

export default function BorrowerLayout() {
  const navItems = [
    {
      title: 'Borrower Profiles',
      href: '/broker/borrower/profiles',
      icon: Users,
      description: 'Manage borrower information and documents'
    },
    {
      title: 'Qualification Assessment',
      href: '/broker/borrower/assessment',
      icon: FileCheck,
      description: 'Initial qualification and AI scoring'
    },
    {
      title: 'Loan Structuring',
      href: '/broker/borrower/loan-structuring',
      icon: Calculator,
      description: 'Create and manage loan options'
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Borrower Management</h1>
        <p className="text-muted-foreground">
          Manage borrower profiles, assess qualifications, and structure loans
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              `block transition-all ${
                isActive ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-primary/50'
              }`
            }
          >
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  );
} 