"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Building2,
  FileText,
  DollarSign,
  TrendingUp,
  Search,
  Plus,
  Minus,
  Eye,
  RefreshCw,
  AlertCircle,
  Shield,
} from "lucide-react";
import {
  isAdmin,
  isSuperAdmin,
  getAdminDashboardStats,
  getAdminUsers,
  searchUser,
  adjustUserCredits,
  getRecentReferences,
  getPaymentHistory,
  getAgencyInsights,
  grantAdminAccess,
  revokeAdminAccess,
} from "@/app/actions/admin-actions";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isAdminUser, setIsAdminUser] = React.useState(false);
  const [isSuperAdminUser, setIsSuperAdminUser] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [stats, setStats] = React.useState<any>(null);
  const [users, setUsers] = React.useState<any[]>([]);
  const [references, setReferences] = React.useState<any[]>([]);
  const [payments, setPayments] = React.useState<any[]>([]);
  const [insights, setInsights] = React.useState<any[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResult, setSearchResult] = React.useState<any>(null);
  const [selectedUser, setSelectedUser] = React.useState<any>(null);
  const [creditAdjustment, setCreditAdjustment] = React.useState("");
  const [adjustmentReason, setAdjustmentReason] = React.useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const [togglingAdmin, setTogglingAdmin] = React.useState<string | null>(null);

  // Check admin access
  React.useEffect(() => {
    async function checkAdmin() {
      if (authLoading) return;

      if (!user) {
        router.push('/login');
        return;
      }

      const adminCheck = await isAdmin(user.email);
      if (!adminCheck) {
        router.push('/');
        return;
      }

      setIsAdminUser(true);

      // Check if super admin
      const superAdminCheck = await isSuperAdmin(user.email);
      setIsSuperAdminUser(superAdminCheck);

      loadDashboardData();
    }

    checkAdmin();
  }, [user, authLoading, router]);

  async function loadDashboardData() {
    setLoading(true);
    try {
      const [statsResult, usersResult, referencesResult, paymentsResult, insightsResult] =
        await Promise.all([
          getAdminDashboardStats(),
          getAdminUsers(50),
          getRecentReferences(20),
          getPaymentHistory(50),
          getAgencyInsights(20),
        ]);

      if (statsResult.success) setStats(statsResult.stats);
      if (usersResult.success) setUsers(usersResult.users);
      if (referencesResult.success) setReferences(referencesResult.references);
      if (paymentsResult.success) setPayments(paymentsResult.payments);
      if (insightsResult.success) setInsights(insightsResult.insights);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    }
    setLoading(false);
  }

  async function handleSearch() {
    if (!searchTerm.trim()) return;
    const result = await searchUser(searchTerm);
    if (result.success) {
      setSearchResult(result.user);
    } else {
      setSearchResult(null);
      alert(result.error);
    }
  }

  async function handleAdjustCredits() {
    if (!selectedUser || !creditAdjustment || !adjustmentReason) {
      alert('Please fill in all fields');
      return;
    }

    const adjustment = parseInt(creditAdjustment);
    if (isNaN(adjustment)) {
      alert('Invalid credit amount');
      return;
    }

    const result = await adjustUserCredits(
      selectedUser.id,
      adjustment,
      adjustmentReason,
      user?.email || 'admin'
    );

    if (result.success) {
      alert(result.message);
      setSelectedUser(null);
      setCreditAdjustment("");
      setAdjustmentReason("");
      loadDashboardData();
    } else {
      alert(result.error);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  }

  async function handleToggleAdminAccess(userId: string, currentIsAdmin: boolean) {
    if (!isSuperAdminUser) {
      alert('Only super admins can manage admin access');
      return;
    }

    const confirmMessage = currentIsAdmin
      ? 'Are you sure you want to revoke admin access from this user?'
      : 'Are you sure you want to grant admin access to this user?';

    if (!confirm(confirmMessage)) {
      return;
    }

    setTogglingAdmin(userId);

    const result = currentIsAdmin
      ? await revokeAdminAccess(userId, user?.email || '')
      : await grantAdminAccess(userId, user?.email || '');

    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      });
      await loadDashboardData();
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    }

    setTogglingAdmin(null);
  }

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdminUser) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">RefVault Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Platform management and analytics
              </p>
            </div>
            <Button onClick={handleRefresh} variant="outline" size="sm" disabled={refreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto p-4 md:p-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="references">References</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="agencies">Agencies</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats?.totalWorkers || 0} workers, {stats?.totalAgencies || 0} agencies
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total References</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalReferences || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats?.completedReferences || 0} completed, {stats?.pendingReferences || 0} pending
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Credits</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalCredits || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats?.totalCreditsUsed || 0} used
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">£{stats?.totalRevenue || '0.00'}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats?.recentSignups || 0} signups today
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Completion Rate</CardTitle>
                <CardDescription>
                  Percentage of references that have been completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {stats?.completionRate || 0}% Complete
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {stats?.completedReferences || 0} / {stats?.totalReferences || 0}
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${stats?.completionRate || 0}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Search */}
            <Card>
              <CardHeader>
                <CardTitle>Quick User Search</CardTitle>
                <CardDescription>
                  Search by email or Worker Reference ID
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="email@example.com or RV-123456"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button onClick={handleSearch}>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>

                {searchResult && (
                  <Card>
                    <CardContent className="pt-6 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{searchResult.displayName}</p>
                          <p className="text-sm text-muted-foreground">{searchResult.email}</p>
                        </div>
                        <Badge>{searchResult.userType}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {searchResult.userType === 'agency' && (
                          <div>
                            <span className="text-muted-foreground">Credits:</span>{' '}
                            <span className="font-medium">{searchResult.credits}</span>
                          </div>
                        )}
                        {searchResult.workerReferenceId && (
                          <div>
                            <span className="text-muted-foreground">Worker ID:</span>{' '}
                            <span className="font-medium">{searchResult.workerReferenceId}</span>
                          </div>
                        )}
                      </div>
                      {searchResult.userType === 'agency' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full mt-2"
                          onClick={() => setSelectedUser(searchResult)}
                        >
                          Adjust Credits
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>
                  Recent users (most recent first)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Worker ID</TableHead>
                      <TableHead>Admin</TableHead>
                      <TableHead>Joined</TableHead>
                      {isSuperAdminUser && <TableHead>Actions</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.displayName}</TableCell>
                        <TableCell className="text-sm">{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.userType === 'agency' ? 'default' : 'secondary'}>
                            {user.userType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.userType === 'agency' ? user.credits : '-'}
                        </TableCell>
                        <TableCell className="text-sm">
                          {user.workerReferenceId || '-'}
                        </TableCell>
                        <TableCell>
                          {user.isAdmin ? (
                            <Badge variant="default">
                              <Shield className="h-3 w-3 mr-1" />
                              Admin
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : '-'}
                        </TableCell>
                        {isSuperAdminUser && (
                          <TableCell>
                            <Button
                              size="sm"
                              variant={user.isAdmin ? 'destructive' : 'default'}
                              onClick={() => handleToggleAdminAccess(user.id, user.isAdmin)}
                              disabled={togglingAdmin === user.id}
                            >
                              {togglingAdmin === user.id ? (
                                <RefreshCw className="h-3 w-3 animate-spin" />
                              ) : user.isAdmin ? (
                                'Revoke Admin'
                              ) : (
                                'Grant Admin'
                              )}
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* References Tab */}
          <TabsContent value="references" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent References</CardTitle>
                <CardDescription>
                  Latest reference requests across all workers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Worker</TableHead>
                      <TableHead>Employer</TableHead>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Requested</TableHead>
                      <TableHead>Completed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {references.map((ref) => (
                      <TableRow key={ref.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{ref.workerName}</p>
                            <p className="text-xs text-muted-foreground">{ref.workerEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{ref.employerName}</TableCell>
                        <TableCell className="text-sm">{ref.jobTitle}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              ref.status === 'Completed'
                                ? 'default'
                                : ref.status === 'Sent'
                                ? 'secondary'
                                : 'outline'
                            }
                          >
                            {ref.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {ref.dateRequested
                            ? new Date(ref.dateRequested).toLocaleDateString()
                            : '-'}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {ref.dateCompleted
                            ? new Date(ref.dateCompleted).toLocaleDateString()
                            : '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>
                  All credit purchases through Stripe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agency</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.userName}</TableCell>
                        <TableCell className="text-sm">{payment.userEmail}</TableCell>
                        <TableCell className="font-medium">
                          £{payment.amount}
                        </TableCell>
                        <TableCell>{payment.credits}</TableCell>
                        <TableCell>
                          <Badge variant="default">{payment.status}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {payment.createdAt
                            ? new Date(payment.createdAt).toLocaleDateString()
                            : '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agencies Tab */}
          <TabsContent value="agencies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Agency Insights</CardTitle>
                <CardDescription>
                  Verification activity and credit usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agency</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Used</TableHead>
                      <TableHead>Workers Verified</TableHead>
                      <TableHead>Last Purchase</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {insights.map((agency) => (
                      <TableRow key={agency.id}>
                        <TableCell className="font-medium">{agency.name}</TableCell>
                        <TableCell className="text-sm">{agency.email}</TableCell>
                        <TableCell>{agency.credits}</TableCell>
                        <TableCell>{agency.creditsUsed}</TableCell>
                        <TableCell className="font-medium">
                          {agency.workersVerified}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {agency.lastPurchase
                            ? new Date(agency.lastPurchase).toLocaleDateString()
                            : 'Never'}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedUser(agency)}
                          >
                            Adjust Credits
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Credit Adjustment Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Credits</DialogTitle>
            <DialogDescription>
              Manually adjust credits for {selectedUser?.name || selectedUser?.displayName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Current Credits</Label>
              <p className="text-2xl font-bold">{selectedUser?.credits || 0}</p>
            </div>
            <div>
              <Label htmlFor="adjustment">Credit Adjustment</Label>
              <Input
                id="adjustment"
                type="number"
                placeholder="e.g. 5 or -3"
                value={creditAdjustment}
                onChange={(e) => setCreditAdjustment(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use positive numbers to add credits, negative to deduct
              </p>
            </div>
            <div>
              <Label htmlFor="reason">Reason (required)</Label>
              <Textarea
                id="reason"
                placeholder="Why are you adjusting credits?"
                value={adjustmentReason}
                onChange={(e) => setAdjustmentReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedUser(null)}>
              Cancel
            </Button>
            <Button onClick={handleAdjustCredits}>
              Apply Adjustment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
