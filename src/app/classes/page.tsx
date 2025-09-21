import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Class } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import {
  Dumbbell,
  HeartPulse,
  MoreHorizontal,
  Palette,
  PlusCircle,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const classes: Class[] = [
  {
    id: 'cls-001',
    name: 'Beginner Yoga Flow',
    category: 'Health',
    schedule: 'Mon, Wed, Fri at 9:00 AM',
    price: 15,
    status: 'Active',
    bookings: 120,
    revenue: 1800,
  },
  {
    id: 'cls-002',
    name: 'Advanced Pottery Wheel',
    category: 'Art',
    schedule: 'Tue, Thu at 6:00 PM',
    price: 40,
    status: 'Active',
    bookings: 80,
    revenue: 3200,
  },
  {
    id: 'cls-003',
    name: 'HIIT Cardio Blast',
    category: 'Sports',
    schedule: 'Sat at 10:00 AM',
    price: 20,
    status: 'Active',
    bookings: 150,
    revenue: 3000,
  },
  {
    id: 'cls-004',
    name: 'Introduction to Watercolor',
    category: 'Art',
    schedule: 'Sun at 2:00 PM',
    price: 35,
    status: 'Inactive',
    bookings: 0,
    revenue: 0,
  },
  {
    id: 'cls-005',
    name: 'Mindfulness and Meditation',
    category: 'Health',
    schedule: 'Mon at 7:00 PM',
    price: 10,
    status: 'Active',
    bookings: 95,
    revenue: 950,
  },
];

const categoryIcons: Record<Class['category'], React.ReactNode> = {
  Art: <Palette className="h-4 w-4" />,
  Sports: <Dumbbell className="h-4 w-4" />,
  Health: <HeartPulse className="h-4 w-4" />,
};

function ClassesTable({ classes }: { classes: Class[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Class Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="hidden md:table-cell">Schedule</TableHead>
          <TableHead className="hidden md:table-cell">Price</TableHead>
          <TableHead className="hidden sm:table-cell">Status</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {classes.map((c) => (
          <TableRow key={c.id}>
            <TableCell className="font-medium">{c.name}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {categoryIcons[c.category]}
                <span>{c.category}</span>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">{c.schedule}</TableCell>
            <TableCell className="hidden md:table-cell">
              ${c.price.toFixed(2)}
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <Badge variant={c.status === 'Active' ? 'default' : 'secondary'}>
                {c.status}
              </Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function ClassesPage() {
  const activeClasses = classes.filter((c) => c.status === 'Active');
  const inactiveClasses = classes.filter((c) => c.status === 'Inactive');

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-semibold">My Classes</h1>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-4 w-4" />
          Create Class
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue="active">
            <div className="border-b p-4">
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="active" className="m-0">
              <ClassesTable classes={activeClasses} />
            </TabsContent>
            <TabsContent value="inactive" className="m-0">
              <ClassesTable classes={inactiveClasses} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
