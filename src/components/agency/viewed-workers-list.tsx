'use client';

import * as React from 'react';
import { getAgencyViewedWorkers, type ViewedWorker } from '@/app/actions/agency-viewed-workers';
import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';

export function ViewedWorkersList() {
  const { userProfile } = useAuth();
  const router = useRouter();
  const [workers, setWorkers] = React.useState<ViewedWorker[]>([]);
  const [filteredWorkers, setFilteredWorkers] = React.useState<ViewedWorker[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    const fetchWorkers = async () => {
      if (!userProfile?.uid) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const result = await getAgencyViewedWorkers(userProfile.uid);

      if (result.success) {
        setWorkers(result.workers);
        setFilteredWorkers(result.workers);
      } else {
        setError(result.error || 'Failed to load viewed workers');
      }

      setLoading(false);
    };

    fetchWorkers();
  }, [userProfile?.uid]);

  // Filter workers based on search query
  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredWorkers(workers);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredWorkers(
        workers.filter(
          (worker) =>
            worker.workerId.toLowerCase().includes(query) ||
            worker.workerName.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, workers]);

  const handleViewWorker = (workerId: string) => {
    router.push(`/agency/results/${workerId}`);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Previously Viewed Workers</CardTitle>
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (workers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Previously Viewed Workers</CardTitle>
          <CardDescription>
            Workers you verify will appear here for free re-access.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No Workers Viewed Yet</h3>
            <p className="text-sm text-muted-foreground">
              Once you verify a worker, they'll appear here for free future access.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Previously Viewed Workers</CardTitle>
        <CardDescription>
          You have verified {workers.length} worker{workers.length !== 1 ? 's' : ''}. View
          their references again at no cost.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workers.length > 5 && (
            <Input
              placeholder="Search by worker ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Worker ID</TableHead>
                  <TableHead>References</TableHead>
                  <TableHead>Last Viewed</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No workers match your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredWorkers.map((worker) => (
                    <TableRow key={worker.workerId}>
                      <TableCell className="font-mono text-sm">
                        {worker.workerId.substring(0, 16)}...
                      </TableCell>
                      <TableCell>
                        {worker.referenceCount} reference{worker.referenceCount !== 1 ? 's' : ''}
                      </TableCell>
                      <TableCell>
                        {format(new Date(worker.dateLastViewed), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewWorker(worker.workerId)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {filteredWorkers.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Viewing previously verified workers does not cost credits.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
