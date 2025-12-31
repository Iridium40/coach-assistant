"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useUserData } from "@/contexts/user-data-context"
import { Bell } from "lucide-react"

export function NotificationSettings() {
  const { notificationSettings, updateNotificationSettings } = useUserData()

  const handleNotificationSettingChange = async (
    key: "push_enabled" | "announcements_enabled" | "progress_updates_enabled" | "email_notifications",
    value: boolean
  ) => {
    if (!notificationSettings) return
    await updateNotificationSettings({ [key]: value })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="h-7 w-7 text-[hsl(var(--optavia-green))]" />
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-optavia-dark">Notification Settings</h1>
      </div>

      {notificationSettings ? (
        <Card className="bg-white border border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-optavia-dark">Manage Notifications</CardTitle>
            <CardDescription className="text-optavia-gray">
              Choose how you want to receive updates and alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <Label className="text-optavia-dark font-medium">Push Notifications</Label>
                <p className="text-sm text-optavia-gray">Receive push notifications on your device</p>
              </div>
              <Switch
                checked={notificationSettings.push_enabled}
                onCheckedChange={(checked) =>
                  handleNotificationSettingChange("push_enabled", checked)
                }
              />
            </div>

            <div className="border-t border-gray-100" />

            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <Label className="text-optavia-dark font-medium">Announcements</Label>
                <p className="text-sm text-optavia-gray">Get notified about new announcements from your team</p>
              </div>
              <Switch
                checked={notificationSettings.announcements_enabled}
                onCheckedChange={(checked) =>
                  handleNotificationSettingChange("announcements_enabled", checked)
                }
              />
            </div>

            <div className="border-t border-gray-100" />

            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <Label className="text-optavia-dark font-medium">Progress Updates</Label>
                <p className="text-sm text-optavia-gray">Get notified when you earn badges or reach milestones</p>
              </div>
              <Switch
                checked={notificationSettings.progress_updates_enabled}
                onCheckedChange={(checked) =>
                  handleNotificationSettingChange("progress_updates_enabled", checked)
                }
              />
            </div>

            <div className="border-t border-gray-100" />

            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <Label className="text-optavia-dark font-medium">Email Notifications</Label>
                <p className="text-sm text-optavia-gray">Receive important updates via email</p>
              </div>
              <Switch
                checked={notificationSettings.email_notifications}
                onCheckedChange={(checked) =>
                  handleNotificationSettingChange("email_notifications", checked)
                }
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white border border-gray-200 shadow-lg">
          <CardContent className="py-8">
            <p className="text-center text-optavia-gray">Loading notification settings...</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

