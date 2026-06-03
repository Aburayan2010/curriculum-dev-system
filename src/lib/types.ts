// ============================================================================
// Type Definitions for Curriculum Development Management System
// ============================================================================

export type ProductType =
  | 'TPP'
  | 'CTTL'
  | 'TCCD'
  | 'TG'
  | 'LP'
  | 'PPT'
  | 'TP'
  | 'KTAG_A'
  | 'KTAG_B'
  | 'PTAG';

export type ReviewLevel = 'CD_REVIEWER' | 'SITE_LEAD' | 'DCM' | 'SCM';
export type ReviewStatus = 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED' | 'AWAITING_REVISION';
export type ProductStatus = 'DRAFT' | 'IN_AUTHORING' | 'UNDER_REVIEW' | 'APPROVED' | 'PUBLISHED';
export type ActionType = 'APPROVED' | 'REJECTED' | 'REQUEST_FOR_UPDATE' | 'ACKNOWLEDGE';

// Course
export interface Course {
  id: string;
  course_code: string;
  course_name: string;
  description?: string;
  course_manager?: string;
  start_date?: string;
  end_date?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Product
export interface Product {
  id: string;
  course_id: string;
  product_type: ProductType;
  product_name: string;
  description?: string;
  status: ProductStatus;
  assigned_to?: string;
  start_date?: string;
  due_date?: string;
  completion_percentage: number;
  created_at: string;
  updated_at: string;
}

// Product Unit (for TG, LP, PPT)
export interface ProductUnit {
  id: string;
  product_id: string;
  unit_number: number;
  unit_title: string;
  unit_description?: string;
  sequence_order?: number;
  created_at: string;
  updated_at: string;
}

// Product Section
export interface ProductSection {
  id: string;
  unit_id: string;
  section_number: string;
  section_title: string;
  section_description?: string;
  sequence_order?: number;
  created_at: string;
  updated_at: string;
}

// Product Review (one per level per product)
export interface ProductReview {
  id: string;
  product_id: string;
  review_level: ReviewLevel;
  reviewer_name?: string;
  reviewer_email?: string;
  status: ReviewStatus;
  location?: string;
  request_for_update?: string;
  comments?: string;
  action?: ActionType;
  initials?: string;
  acknowledge_adjudication: boolean;
  created_at: string;
  updated_at: string;
}

// Review Item (detailed feedback for units/sections)
export interface ReviewItem {
  id: string;
  review_id: string;
  unit_id?: string;
  section_id?: string;
  item_type?: 'UNIT' | 'SECTION' | 'PRODUCT';
  location: string;
  request_for_update?: string;
  comments?: string;
  action?: ActionType;
  initials?: string;
  created_at: string;
  updated_at: string;
}

// Change Log
export interface ChangeLog {
  id: string;
  product_id: string;
  review_item_id?: string;
  change_type: 'CREATE' | 'UPDATE' | 'DELETE' | 'APPROVE' | 'REJECT';
  changed_by?: string;
  old_value?: string;
  new_value?: string;
  notes?: string;
  created_at: string;
}

// Adjudication Board
export interface AdjudicationBoard {
  id: string;
  product_id: string;
  board_date?: string;
  board_status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Adjudication Board Member
export interface AdjudicationBoardMember {
  id: string;
  board_id: string;
  member_name: string;
  member_email?: string;
  role?: string;
  is_chair: boolean;
  created_at: string;
}

// Review Action Report
export interface ReviewActionReport {
  id: string;
  course_id: string;
  report_date: string;
  report_title?: string;
  report_data?: Record<string, any>;
  created_by?: string;
  created_at: string;
}

// Import/Export History
export interface ImportExportHistory {
  id: string;
  course_id?: string;
  operation_type: 'IMPORT' | 'EXPORT';
  file_name: string;
  file_size?: number;
  row_count?: number;
  duplicate_count?: number;
  status: 'SUCCESS' | 'FAILED' | 'PARTIAL';
  error_message?: string;
  performed_by?: string;
  created_at: string;
}

// Duplicate Record
export interface DuplicateRecord {
  id: string;
  import_id?: string;
  product_id?: string;
  duplicate_count?: number;
  detected_fields?: string[];
  action_taken?: 'SKIPPED' | 'MERGED' | 'UPDATED';
  created_at: string;
}

// Team Member
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role?: string;
  department?: string;
  initials?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Course Team Assignment
export interface CourseTeamAssignment {
  id: string;
  course_id: string;
  team_member_id: string;
  role?: string;
  review_level?: ReviewLevel;
  created_at: string;
}

// Views
export interface CourseOverview {
  id: string;
  course_code: string;
  course_name: string;
  course_manager?: string;
  total_products: number;
  approved_products: number;
  draft_products: number;
  under_review_products: number;
  overall_completion: number;
  created_at: string;
  updated_at: string;
}

export interface ProductReviewStatus {
  id: string;
  product_name: string;
  product_type: ProductType;
  status: ProductStatus;
  completion_percentage: number;
  total_reviews: number;
  approved_reviews: number;
  pending_reviews: number;
  in_review_reviews: number;
  assigned_to?: string;
  due_date?: string;
}

export interface TeamMemberWorkload {
  id: string;
  name: string;
  email: string;
  role?: string;
  review_level?: ReviewLevel;
  assigned_courses: number;
  assigned_reviews: number;
  completed_reviews: number;
}
