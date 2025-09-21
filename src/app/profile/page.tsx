import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import ProfileForm from '@/components/profile-form';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ProfilePage() {
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-semibold">My Profile</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                 {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" />}
                <AvatarFallback className="text-3xl">JD</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline text-2xl">Jane Doe</CardTitle>
              <CardDescription>Yoga & Wellness Instructor</CardDescription>
              <div className="flex flex-wrap gap-2 pt-4">
                <Badge>Yoga</Badge>
                <Badge>Meditation</Badge>
                <Badge>Wellness</Badge>
                <Badge>RYT 500</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 flex flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Current Profile</CardTitle>
              <CardDescription>
                This is what students see on your public profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                As a RYT 500 certified yoga and wellness coach with over 10 years of experience,
                I am dedicated to helping individuals find balance, strength, and peace through the practice of yoga and meditation.
              </p>
              <p>
                My journey began in the serene landscapes of the Himalayas, and I bring that authentic, grounding energy to every class I teach.
                I specialize in Vinyasa, Hatha, and Restorative yoga, creating an inclusive and supportive environment for all levels.
                Join me to reconnect with your body, calm your mind, and uplift your spirit.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">AI Profile Assistant</CardTitle>
              <CardDescription>
                Let our AI help you craft a standout profile. Describe your expertise, and we&apos;ll generate a professional draft.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
