import { TLicenseType } from "features/authentication/types/auth-user";

export type TReimbursementRequisition = {
  id: number;
  date: string;
  employeeId: number;
  title: string;
  description: string;
  amount: string;
  attachmentUrls: string[];
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
};

interface Employee {
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
