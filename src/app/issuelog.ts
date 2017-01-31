export interface IIssue {
     issue: string;
     description: string;
     dateOfIssue: string;
     solution: string;
     dateResolved: string;         
     SubmittedBy: string;
     SubmittedByPhotoUrl: string;
     SubmittedByEmail: string;
     timestamp: string;
     attachments: any[];
     fileList:string;
}