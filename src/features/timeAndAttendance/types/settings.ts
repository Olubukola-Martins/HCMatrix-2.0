import { ICurrentCompany } from "types";

export interface IClockInPolicy extends ICurrentCompany {
  adminId: number;
  isSoftClockIn: boolean;
  isBiometricClockIn: boolean;
  biometricDevices: BiometricDevice[];
}

export interface BiometricDevice {
  name: string;
  companyId: number;
  serialNumber: string;
  id: number;
}

// Add location
export interface IBiometricDeviceLocation extends ICurrentCompany {
  biometricDeviceLocations: biometricDeviceLocationDetails[];
}

interface biometricDeviceLocationDetails {
  companyId: number;
  branchId: number;
  biometricDeviceId: string;
}

// Time tracking rules
export interface ITimeTrackingRule extends ICurrentCompany {
  adminId: number;
  policy: string;
}

// time off policy rule
export interface ITimeOffPolicyRule extends ICurrentCompany {
  timeOffPolicies: TimeOffPolicy[];
}

interface TimeOffPolicy {
  name: string;
  durationInDays: number;
  comment: string;
  companyId: number;
  adminId: number;
}

export interface IAllTimeOff extends ICurrentCompany {
  reason: string;
  date: string;
  timeOffPolicyId: number
  userId: number;
}

export interface IOtherSettings extends ICurrentCompany {
  adminId: number;
  longitude: string;
  latitude: string;
  isSoftClockInEnabled: boolean;
  geoFenceRadiusInKm: number;
  manualAttendanceWorkFlowId: number;
  overtimeAttendanceWorkFlowId: number;
}

export interface workScheduleProps extends ICurrentCompany {
  adminId: number;
  workArrangement: string;
  workDaysAndTime: WorkDaysAndTime[];
}

interface WorkDaysAndTime {
  day: string;
  startTime: string;
  endTime: string;
  shift?: string;
  hours?: string;
}
