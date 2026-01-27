
"use client";

import * as React from "react";
import { CheckCircle, Clock, FileQuestion } from "lucide-react";
import { format } from "date-fns";
import type { ReferenceRequest } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ReferenceRequestListProps {
    requests: ReferenceRequest[];
}

export function ReferenceRequestList({ requests }: ReferenceRequestListProps) {
  
  const getStatusIcon = (status: ReferenceRequest['status']) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'Sent':
        return <FileQuestion className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusVariant = (status: ReferenceRequest['status']) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Sent':
        return 'outline';
      default:
        return 'default';
    }
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No Active Requests</h3>
        <p className="text-sm text-muted-foreground">Click "Request a Reference" to get started.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40%]">Employer</TableHead>
          <TableHead>Job Title</TableHead>
          <TableHead>Date Requested</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell className="font-medium">{request.employerName}</TableCell>
            <TableCell>{request.jobTitle}</TableCell>
            <TableCell>{format(request.dateRequested, "dd MMM yyyy")}</TableCell>
            <TableCell className="text-right">
                <Badge variant={getStatusVariant(request.status)} className="flex items-center gap-2 max-w-fit ml-auto">
                {getStatusIcon(request.status)}
                {request.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
