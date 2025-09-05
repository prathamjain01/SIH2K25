import React, { useState } from 'react';
import { Moon, Sun, Lock, Bell, Shield, Globe, Smartphone, Mail, Eye, EyeOff, Download, Trash2 } from 'lucide-react';
import Card from '../components/Common/Card';
import Button from '../components/Common/Button';
import { useAuth } from '../contexts/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    fees: true,
    exams: true,
    library: false,
    hostel: true
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true
  });

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handlePrivacyChange = (key: string) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance */}
        <Card title="Appearance" subtitle="Customize your interface">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
              <div className="flex space-x-3">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex items-center p-3 rounded-lg border-2 transition-colors ${
                    theme === 'light' 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Sun className="w-5 h-5 mr-2" />
                  Light Mode
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex items-center p-3 rounded-lg border-2 transition-colors ${
                    theme === 'dark' 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Moon className="w-5 h-5 mr-2" />
                  Dark Mode
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Language</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="bn">Bengali</option>
                <option value="ta">Tamil</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Timezone</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="ist">India Standard Time (IST)</option>
                <option value="utc">UTC</option>
                <option value="est">Eastern Standard Time</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card title="Security" subtitle="Manage your account security">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Change Password</h4>
                <p className="text-sm text-gray-500">Update your login password</p>
              </div>
              <Button size="sm" variant="outline">
                <Lock className="w-4 h-4 mr-2" />
                Change
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500">Add an extra layer of security</p>
              </div>
              <Button size="sm" variant="outline">
                <Shield className="w-4 h-4 mr-2" />
                Enable
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Login Sessions</h4>
                <p className="text-sm text-gray-500">Manage active sessions</p>
              </div>
              <Button size="sm" variant="outline">
                <Smartphone className="w-4 h-4 mr-2" />
                View
              </Button>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card title="Notifications" subtitle="Control what notifications you receive">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Delivery Methods</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">Email Notifications</span>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('email')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.email ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.email ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Smartphone className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">SMS Notifications</span>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('sms')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.sms ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.sms ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm">Push Notifications</span>
                  </div>
                  <button
                    onClick={() => handleNotificationChange('push')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.push ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.push ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Notification Types</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Fee Reminders</span>
                  <button
                    onClick={() => handleNotificationChange('fees')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.fees ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.fees ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Exam Updates</span>
                  <button
                    onClick={() => handleNotificationChange('exams')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.exams ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.exams ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Library Reminders</span>
                  <button
                    onClick={() => handleNotificationChange('library')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.library ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.library ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Hostel Updates</span>
                  <button
                    onClick={() => handleNotificationChange('hostel')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.hostel ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.hostel ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy */}
        <Card title="Privacy" subtitle="Control your privacy settings">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Profile Visibility</span>
                <p className="text-xs text-gray-500">Allow others to view your profile</p>
              </div>
              <button
                onClick={() => handlePrivacyChange('profileVisible')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacy.profileVisible ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacy.profileVisible ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Show Email</span>
                <p className="text-xs text-gray-500">Display email in profile</p>
              </div>
              <button
                onClick={() => handlePrivacyChange('showEmail')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacy.showEmail ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacy.showEmail ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Show Phone</span>
                <p className="text-xs text-gray-500">Display phone number in profile</p>
              </div>
              <button
                onClick={() => handlePrivacyChange('showPhone')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacy.showPhone ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacy.showPhone ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Allow Messages</span>
                <p className="text-xs text-gray-500">Receive messages from other users</p>
              </div>
              <button
                onClick={() => handlePrivacyChange('allowMessages')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacy.allowMessages ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacy.allowMessages ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </Card>

        {/* Data Management */}
        <Card title="Data Management" subtitle="Manage your data and account">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Export Data</h4>
                <p className="text-sm text-gray-500">Download a copy of your data</p>
              </div>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Clear Cache</h4>
                <p className="text-sm text-gray-500">Clear stored data to improve performance</p>
              </div>
              <Button size="sm" variant="outline">
                Clear
              </Button>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-red-600">Delete Account</h4>
                  <p className="text-sm text-gray-500">Permanently delete your account and data</p>
                </div>
                <Button size="sm" variant="danger">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* System Information */}
        <Card title="System Information" subtitle="Application details">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Version</span>
              <span className="text-sm font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last Updated</span>
              <span className="text-sm font-medium">January 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Browser</span>
              <span className="text-sm font-medium">Chrome 120.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Platform</span>
              <span className="text-sm font-medium">Web Application</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">Save All Settings</Button>
      </div>
    </div>
  );
}