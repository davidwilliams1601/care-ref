"use client";

import * as React from 'react';
import { format } from "date-fns";
import type { Reference } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReferenceActions } from "./reference-actions";
import { Badge } from '../ui/badge';

interface ReferenceListProps {
  references: Reference[];
  onReferenceDelete: (id: string) => void;
}

export function ReferenceList({ references, onReferenceDelete }: ReferenceListProps) {
  if (references.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No References Found</h3>
        <p className="text-sm text-muted-foreground">Completed references will appear here.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">Employer</TableHead>
            <TableHead className="w-[30%]">Job Title</TableHead>
            <TableHead className="w-[30%]">Date</TableHead>
            <TableHead className="text-right w-[10%]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {references.map((reference) => (
            <TableRow key={reference.id}>
              <TableCell className="font-medium">{reference.employerName}</TableCell>
              <TableCell>{reference.jobTitle}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{format(reference.startDate, "MMM yyyy")} - {reference.endDate ? format(reference.endDate, "MMM yyyy") : <Badge variant="secondary">Present</Badge>}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <ReferenceActions reference={reference} onReferenceDelete={onReferenceDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
