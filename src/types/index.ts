

export interface ReferenceRequest {
  id: string;
  workerId: string;
  employerName: string;
  employerEmail: string;
  jobTitle: string;
  status: 'Sent' | 'Pending' | 'Completed';
  dateRequested: Date;
  dateCompleted: Date | null;
  // Details provided by the person giving the reference
  refereeName?: string;
  refereeJobTitle?: string;
  referenceText?: string; 
  summary?: string;
  startDate?: Date;
  endDate?: Date | null;
}


export interface Reference {
  id: string;
  workerId: string;
  employerName: string;
  jobTitle: string;
  startDate: Date;
  endDate: Date | null;
  referenceText: string;
  summary: string;
  documentUrl?: string;
  versionHistory: {
    version: number;
    date: Date;
    changes: string;
  }[];
}
