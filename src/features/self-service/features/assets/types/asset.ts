import { TLicenseType } from "features/authentication/types/auth-user";
import { TAssetStatus } from "./assetStatus";

export interface TAsset {
  id: number;
  name: string;
  typeId: number;
  status: TAssetStatus;
  imageUrl: string;
  uid: string;
  serialNumber: string;
  brand: string;
  model: string;
  cost: string;
  vendor: string;
  purchaseDate: string;
  color: string;
  description: string;
  assigneeId?: any;
  dateAssigned?: any;
  documentUrls?: string[];
  companyId: number;
  createdAt: string;
  updatedAt: string;
  type: Type;
  assignee?: Assignee;
  assigneeHistory: TAssetAssigneeHistory[];
}

interface Assignee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  licenseType: TLicenseType;
  empUid: string;
  roleId: number;
  status: string;
  companyId: number;
  designationId: number;
  userId: number;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}

export type TAssetAssigneeHistory = {
  id: number;
  assetId: number;
  assigneeId: number;
  dateAssigned: string;
  dateReturned?: any;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  assignee: Assignee;
};

interface Type {
  id: number;
  name: string;
  label: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
