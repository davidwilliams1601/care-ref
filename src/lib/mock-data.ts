
import type { ReferenceRequest, Reference } from "@/types";

export const mockRequests: ReferenceRequest[] = [
  {
    id: "req-1",
    workerId: "worker-123",
    employerName: "Care UK",
    employerEmail: "hr@careuk.com",
    jobTitle: "Senior Care Assistant",
    status: "Completed",
    dateRequested: new Date("2023-01-10"),
    dateCompleted: new Date("2024-05-20"),
    refereeName: "Mary White",
    refereeJobTitle: "Care Home Manager",
    referenceText: "This is the full reference text submitted by the manager. It would be quite long and detailed, covering all aspects of the care worker's performance, skills, and attitude during their employment.",
    summary: "A diligent and compassionate Senior Care Assistant with a strong track record in providing high-quality personal care, administering medication, and mentoring junior staff. Particularly skilled in dementia care and building rapport with residents and their families."
  },
  {
    id: "req-2",
    workerId: "worker-123",
    employerName: "Bupa",
    employerEmail: "references@bupa.com",
    jobTitle: "Domiciliary Care Worker",
    status: "Pending",
    dateRequested: new Date("2024-06-01"),
    dateCompleted: null,
  },
  {
    id: "req-3",
    workerId: "worker-123",
    employerName: "HC-One",
    employerEmail: "recruitment@hc-one.co.uk",
    jobTitle: "Care Home Assistant",
    status: "Sent",
    dateRequested: new Date("2024-06-10"),
    dateCompleted: null,
  },
];


export const mockReferences: Reference[] = [
  {
    id: "ref-1",
    workerId: "worker-123",
    employerName: "Care UK",
    jobTitle: "Senior Care Assistant",
    startDate: new Date("2021-03-15"),
    endDate: new Date("2023-01-05"),
    referenceText: "Full reference text for the Senior Care Assistant role at Care UK. This would be a detailed document.",
    summary: "A diligent and compassionate Senior Care Assistant with a strong track record in providing high-quality personal care, administering medication, and mentoring junior staff. Particularly skilled in dementia care and building rapport with residents and their families.",
    versionHistory: [
      { version: 1, date: new Date("2024-05-20"), changes: "Initial reference added."}
    ]
  }
];
