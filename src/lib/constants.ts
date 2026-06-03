// ============================================================================
// Constants and Enumerations
// ============================================================================

export const PRODUCT_TYPES = {
  TPP: 'Training Program Plan',
  CTTL: 'Content and Teaching Technique List',
  TCCD: 'Tactical Course Content Development',
  TG: 'Training Guide',
  LP: 'Lesson Plan',
  PPT: 'PowerPoint Presentation',
  TP: 'Training Plan',
  KTAG_A: 'Knowledge Tag A',
  KTAG_B: 'Knowledge Tag B',
  PTAG: 'Performance Tag',
} as const;

export const HIERARCHICAL_PRODUCTS = ['TG', 'LP', 'PPT'];

export const REVIEW_LEVELS = {
  CD_REVIEWER: 'CD Reviewer',
  SITE_LEAD: 'Site Lead Review',
  DCM: 'DCM Review',
  SCM: 'SCM Review',
} as const;

export const REVIEW_LEVEL_ORDER = [
  'CD_REVIEWER',
  'SITE_LEAD',
  'DCM',
  'SCM',
] as const;

export const PRODUCT_STATUS = {
  DRAFT: 'Draft',
  IN_AUTHORING: 'In Authoring',
  UNDER_REVIEW: 'Under Review',
  APPROVED: 'Approved',
  PUBLISHED: 'Published',
} as const;

export const REVIEW_STATUS = {
  PENDING: 'Pending',
  IN_REVIEW: 'In Review',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  AWAITING_REVISION: 'Awaiting Revision',
} as const;

export const ACTION_TYPES = {
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  REQUEST_FOR_UPDATE: 'Request for Update',
  ACKNOWLEDGE: 'Acknowledge',
} as const;

export const CHANGE_LOG_TYPES = {
  CREATE: 'Created',
  UPDATE: 'Updated',
  DELETE: 'Deleted',
  APPROVE: 'Approved',
  REJECT: 'Rejected',
} as const;

export const IMPORT_EXPORT_STATUS = {
  SUCCESS: 'Success',
  FAILED: 'Failed',
  PARTIAL: 'Partial',
} as const;

export const DUPLICATE_ACTIONS = {
  SKIPPED: 'Skipped',
  MERGED: 'Merged',
  UPDATED: 'Updated',
} as const;

// Color coding for UI
export const STATUS_COLORS = {
  DRAFT: 'bg-gray-100 text-gray-800',
  IN_AUTHORING: 'bg-blue-100 text-blue-800',
  UNDER_REVIEW: 'bg-yellow-100 text-yellow-800',
  APPROVED: 'bg-green-100 text-green-800',
  PUBLISHED: 'bg-purple-100 text-purple-800',
  PENDING: 'bg-gray-100 text-gray-800',
  IN_REVIEW: 'bg-blue-100 text-blue-800',
  REJECTED: 'bg-red-100 text-red-800',
  AWAITING_REVISION: 'bg-orange-100 text-orange-800',
} as const;

export const PRIORITY_COLORS = {
  CRITICAL: 'text-red-600',
  HIGH: 'text-orange-600',
  MEDIUM: 'text-yellow-600',
  LOW: 'text-green-600',
} as const;

// Default pagination
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// Excel import settings
export const EXCEL_IMPORT_SETTINGS = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxRows: 10000,
  acceptedFormats: ['.csv', '.xlsx', '.xls'],
} as const;
