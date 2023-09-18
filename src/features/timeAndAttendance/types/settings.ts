import { ICurrentCompany } from "types";

export interface IClockInPolicy extends ICurrentCompany {
  adminId: number;
  isSoftClockIn: boolean;
  isBiometricClockIn: boolean;
  biometricDevices: BiometricDevice[];
}

interface BiometricDevice {
  name: string;
  companyId: number;
  serialNumber: number;
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

export interface IOtherSettings extends ICurrentCompany {
  adminId: number;
  longitude: string;
  latitude: string;
  isSoftClockinEnabled: boolean;
  geoFenceRadiusInKm: string;
}

export interface workScheduleProps extends ICurrentCompany {
  adminId: number,
  workArrangement: string;
  workDaysAndTime: WorkDaysAndTime[];
}

interface WorkDaysAndTime {
  day: string;
  startTime: string;
  endTime: string;
  shift?: string;
}