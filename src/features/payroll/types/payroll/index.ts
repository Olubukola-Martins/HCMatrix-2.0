import {
  TPayrollAnalyticsItem,
  TPayrollGraphAnalyticsItem,
  TPayrollGraphAnalyticsItemType,
  TPayrollGraphTabItem,
} from "./analytics";
import { TEmployeesInPayrollData } from "./employee/employeesInPayroll";
import { TSingleEmployeePayroll } from "./employee/singleEmployeePayroll";
import { TSinglePayroll } from "./singlePayroll";

type TPayrollFrequency = "daily" | "monthly";
type TEssentialPayrollType = "direct-salary" | "office" | "wages";

export {
  type TEssentialPayrollType,
  type TPayrollFrequency,
  type TSinglePayroll,
  type TSingleEmployeePayroll,
  type TEmployeesInPayrollData,
  type TPayrollListData,
  type TPayrollGraphAnalyticsItemType,
  type TPayrollGraphAnalyticsItem,
  type TPayrollAnalyticsItem,
  type TPayrollGraphTabItem,
};

interface TPayrollListData {
  totalAllowances: number;
  totalDeductions: number;
  totalNetPay: number;
  totalGrossPay: number;
  totalTax: number;
  id: number;
  schemeId: number;
  name: string;
  label: string;
  date: string;
  description: string;
  frequency: string;
  status: string;
  costCentreId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  disbursementDate?: string;
  scheme: Scheme;
  employeePayrolls: EmployeePayroll[];
}

interface EmployeePayroll {
  id: number;
  payrollId: number;
  employeeId: number;
  empUid: string;
  eligibility: string;
  fullName: string;
  netPay: string;
  grossPay: string;
  totalAllowances: string;
  totalDeductions: string;
  tax: string;
  currency: string;
  rate: string;
  hourlyRate?: any;
  hoursCompleted: number;
  isActive: boolean;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface Scheme {
  id: number;
  name: string;
  type: string;
  frequency: string;
  allowDisbursement: boolean;
  disbursement: number;
  costCentreId: number;
  allowApproval: boolean;
  workflowId: number;
  issuePayslip: boolean;
  projectId?: number;
  runAutomatically: boolean;
  automaticRunDay: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
