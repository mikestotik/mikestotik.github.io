export enum AllowedFileExtensions {
  PDF = 'pdf',
  JPG = 'jpg',
  JPEG = 'jpeg',
  PNG = 'png'
}

export enum DocumentFileType {
  Passport = 'PASSPORT',
  Other = 'OTHER'
}


export enum DocumentFileCreatorType {
  Client = 'CLIENT'
}


export interface DocumentFileTypeItem {
  typeId: DocumentFileType;
  typeName: string;
  required: boolean;
}


export interface DocumentFileCreatorTypeItem {
  creatorTypeId: DocumentFileCreatorType;
  creatorTypeName: string;
}


export interface DocumentFile {
  fileId: string;
  name: string;
  text?: string;
  additionalInfo: string;
  createdAt: string;
  deletable: boolean;
  unread: boolean;
  type: DocumentFileTypeItem;
  creatorType: DocumentFileCreatorTypeItem;
}


export interface DocumentApiResponse {
  actionId: string;
  responseDT: string;
  errorInfo: {
    error: string;
    errorText: string;
  };
}


export interface NeededDocumentsResponse extends DocumentApiResponse {
  fileTypes: DocumentFileTypeItem[];
}


export interface AllDocumentsResponse extends DocumentApiResponse {
  files: DocumentFile[];
}


export interface AddedDocumentResponse extends DocumentApiResponse {
  fileId: string;
}


export interface GetDocumentResponse extends DocumentApiResponse {
  file: DocumentFile;
}


export interface DocumentUploadPayload {
  type: DocumentFileType;
  name: string;
  text: string;
  additionalInfo: string;
}
