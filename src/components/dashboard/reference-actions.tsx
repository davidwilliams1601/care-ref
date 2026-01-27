"use client";

import * as React from "react";
import Link from "next/link";
import { Edit, MoreHorizontal, Share2, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { ShareReferenceDialog } from "./share-reference-dialog";
import type { Reference } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface ReferenceActionsProps {
  reference: Reference;
  onReferenceDelete: (id: string) => void;
}

export function ReferenceActions({ reference, onReferenceDelete }: ReferenceActionsProps) {
  const [isShareOpen, setIsShareOpen] = React.useState(false);
  const { toast } = useToast();

  const handleDelete = () => {
    onReferenceDelete(reference.id);
    toast({
      title: "Reference Deleted",
      description: `The reference for ${reference.jobTitle} at ${reference.employerName} has been deleted.`,
    });
  };

  return (
    <>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/references/${reference.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                <span>View / Edit</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setIsShareOpen(true)}>
              <Share2 className="mr-2 h-4 w-4" />
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this reference
              from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ShareReferenceDialog
        isOpen={isShareOpen}
        onOpenChange={setIsShareOpen}
        reference={reference}
      />
    </>
  );
}
