import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, Mail, Calendar, User, MessageSquare, LogOut, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import DOMPurify from 'dompurify';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiry_type: string;
  status: string;
  created_at: string;
}

interface SecurityEvent {
  id: string;
  event_type: string;
  event_details: any;
  user_id?: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [activeTab, setActiveTab] = useState<'submissions' | 'security'>('submissions');

  useEffect(() => {
    checkAuth();
    loadSubmissions();
    loadSecurityEvents();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      navigate('/admin/auth');
      return;
    }

    // Verify admin privileges
    const { data: isAdmin } = await supabase.rpc('is_admin');
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive"
      });
      navigate('/admin/auth');
      return;
    }

    setUser(session.user);
    setLoading(false);

    // Log admin access for security monitoring
    console.log(`Admin access: ${session.user.email} at ${new Date().toISOString()}`);
  };

  const loadSubmissions = async () => {
    setLoadingSubmissions(true);
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setSubmissions(data || []);
    } catch (error: any) {
      console.error('Error loading submissions:', error);
      toast({
        title: "Error",
        description: "Failed to load contact submissions",
        variant: "destructive"
      });
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const loadSecurityEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('security_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        throw error;
      }

      setSecurityEvents(data || []);
    } catch (error: any) {
      console.error('Error loading security events:', error);
      // Don't show toast error for security events to avoid spamming admin
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    } else {
      navigate('/admin/auth');
    }
  };

  const updateSubmissionStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id);

      if (error) {
        throw error;
      }

      setSubmissions(prev => 
        prev.map(sub => sub.id === id ? { ...sub, status } : sub)
      );

      toast({
        title: "Status Updated",
        description: `Submission marked as ${status}`,
      });
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'new': return 'destructive';
      case 'in_progress': return 'secondary';
      case 'resolved': return 'default';
      default: return 'outline';
    }
  };

  const sanitizeMessage = (message: string) => {
    return DOMPurify.sanitize(message, { 
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: []
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Signed in as {user?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadSubmissions}
                disabled={loadingSubmissions}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loadingSubmissions ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{submissions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {submissions.filter(s => s.status === 'new').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {submissions.filter(s => s.status === 'in_progress').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {submissions.filter(s => s.status === 'resolved').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            <Button
              variant={activeTab === 'submissions' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('submissions')}
              className="px-4"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Submissions
            </Button>
            <Button
              variant={activeTab === 'security' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('security')}
              className="px-4"
            >
              <Shield className="w-4 h-4 mr-2" />
              Security Events
            </Button>
          </div>
        </div>

        {/* Contact Submissions Tab */}
        {activeTab === 'submissions' && (
          <Card>
            <CardHeader>
              <CardTitle>Contact Submissions</CardTitle>
              <CardDescription>
                Manage and respond to customer inquiries
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingSubmissions ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              ) : submissions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No submissions yet
                </div>
              ) : (
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {submissions.map((submission) => (
                      <Card key={submission.id} className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium">{submission.name}</h3>
                                <Badge variant={getStatusBadgeVariant(submission.status)}>
                                  {submission.status.replace('_', ' ')}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{submission.email}</p>
                              <p className="text-sm text-muted-foreground">
                                Type: {submission.inquiry_type}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {new Date(submission.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-sm mb-1">Subject:</h4>
                            <p className="text-sm">{submission.subject}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-sm mb-1">Message:</h4>
                            <p className="text-sm bg-muted p-3 rounded whitespace-pre-wrap">
                              {sanitizeMessage(submission.message)}
                            </p>
                          </div>
                          
                          {submission.status !== 'resolved' && (
                            <div className="flex gap-2 pt-2">
                              {submission.status === 'new' && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => updateSubmissionStatus(submission.id, 'in_progress')}
                                >
                                  Mark In Progress
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                onClick={() => updateSubmissionStatus(submission.id, 'resolved')}
                              >
                                Mark Resolved
                              </Button>
                            </div>
                          )}
                          
                          {submission.status === 'resolved' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateSubmissionStatus(submission.id, 'new')}
                            >
                              Reopen
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        )}

        {/* Security Events Tab */}
        {activeTab === 'security' && (
          <Card>
            <CardHeader>
              <CardTitle>Security Events</CardTitle>
              <CardDescription>
                Monitor security-related activities and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              {securityEvents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No security events recorded yet
                </div>
              ) : (
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-3">
                    {securityEvents.map((event) => (
                      <Card key={event.id} className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant={event.event_type === 'CONTACT_SUBMISSION' ? 'default' : 'secondary'}>
                                {event.event_type.replace('_', ' ')}
                              </Badge>
                              {event.ip_address && (
                                <span className="text-xs text-muted-foreground">
                                  IP: {event.ip_address}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {new Date(event.created_at).toLocaleString()}
                            </p>
                          </div>
                          
                          {event.event_details && Object.keys(event.event_details).length > 0 && (
                            <div>
                              <h4 className="font-medium text-sm mb-1">Details:</h4>
                              <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                                {JSON.stringify(event.event_details, null, 2)}
                              </pre>
                            </div>
                          )}
                          
                          {event.user_agent && (
                            <div>
                              <h4 className="font-medium text-sm mb-1">User Agent:</h4>
                              <p className="text-xs text-muted-foreground truncate">
                                {event.user_agent}
                              </p>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        )}

        {/* Submissions List */}
        <Card style={{display: 'none'}}>
          <CardHeader>
            <CardTitle>Contact Submissions</CardTitle>
            <CardDescription>
              Manage and respond to customer inquiries
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingSubmissions ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No contact submissions found
              </div>
            ) : (
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {submissions.map((submission) => (
                    <Card key={submission.id} className="border-l-4 border-l-primary/20">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span className="font-medium">{submission.name}</span>
                              <Badge variant="outline">{submission.inquiry_type}</Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="w-3 h-3" />
                              {submission.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {new Date(submission.created_at).toLocaleString()}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={getStatusBadgeVariant(submission.status)}>
                              {submission.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium mb-1">Subject</h4>
                            <p className="text-sm">{submission.subject}</p>
                          </div>
                          <Separator />
                          <div>
                            <h4 className="font-medium mb-1">Message</h4>
                            <p className="text-sm whitespace-pre-wrap">
                              {sanitizeMessage(submission.message)}
                            </p>
                          </div>
                          <Separator />
                          <div className="flex gap-2">
                            {submission.status === 'new' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateSubmissionStatus(submission.id, 'in_progress')}
                              >
                                Mark In Progress
                              </Button>
                            )}
                            {submission.status === 'in_progress' && (
                              <Button 
                                size="sm" 
                                onClick={() => updateSubmissionStatus(submission.id, 'resolved')}
                              >
                                Mark Resolved
                              </Button>
                            )}
                            {submission.status === 'resolved' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateSubmissionStatus(submission.id, 'new')}
                              >
                                Reopen
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;