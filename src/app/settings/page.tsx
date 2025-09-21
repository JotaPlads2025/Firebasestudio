import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-semibold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Notification Settings</CardTitle>
          <CardDescription>
            Manage how you receive notifications from Plads Pro.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="new-bookings-email" className="text-base">
                New Bookings
              </Label>
              <p className="text-sm text-muted-foreground">
                Send an email when a student books a new class.
              </p>
            </div>
            <Switch id="new-bookings-email" defaultChecked />
          </div>
          <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="class-reminders-push" className="text-base">
                Class Reminders
              </Label>
              <p className="text-sm text-muted-foreground">
                Send a push notification 24 hours before a class starts.
              </p>
            </div>
            <Switch id="class-reminders-push" defaultChecked />
          </div>
          <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="cancellations-email" className="text-base">
                Cancellations
              </Label>
              <p className="text-sm text-muted-foreground">
                Notify me by email when a student cancels a booking.
              </p>
            </div>
            <Switch id="cancellations-email" />
          </div>
          <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="weekly-summary" className="text-base">
                Weekly Performance Summary
              </Label>
              <p className="text-sm text-muted-foreground">
                Send a weekly email with your key performance metrics.
              </p>
            </div>
            <Switch id="weekly-summary" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Account</CardTitle>
          <CardDescription>Manage your account settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">Delete Account</Button>
          <p className="text-sm text-muted-foreground mt-2">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
