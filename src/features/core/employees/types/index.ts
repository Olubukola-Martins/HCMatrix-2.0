import { TDesignation } from "features/core/designations/types";
import { TRole } from "features/core/roles-and-permissions/types";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";

export type TBulkEmployeeImport = {
  employeeInformation: {
    email: string;
    empUid: string;
    hasSelfService: boolean;
  };
  personalInformation?: {
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    eligibility: string;
    maritalStatus: string;
    nationality: string;
    passportExpirationDate: string;
    alternativeEmail: string;
    alternativePhoneNumber: string;
    nin: string;
    taxAuthority: string;
    taxId: string;
  };
  walletInformation?: {
    accountProvider: string;
    accountNumber: string;
  };
  bankInformation?: {
    bankName: string;
    accountNumber: string;
    bvn: string;
  };
  pensionInformation?: {
    fundAdministrator: string;
    accountNumber: string;
    pensionType: string;
  };
  emergencyContact?: {
    fullName: string;
    address: string;
    relationship: string;
    phoneNumber: string;
  };
};

export interface IBulkEmployeeUploadProps extends ICurrentCompany {
  data: TBulkEmployeeImport[];
}

export interface ISaveEmergencyContactProps extends ICurrentCompany {
  fullName: string;
  address: string;
  relationship: string;
  phoneNumber: string;
  employeeId: number;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type MakeDependantInput = PartialBy<TEmployeeDependant, "id">;

export interface IAddDependantToEmployeeProps
  extends ICurrentCompany,
    MakeDependantInput {
  employeeId: number;
}

export interface IUpdateDependantOfEmployeeProps
  extends ICurrentCompany,
    TEmployeeDependant {
  employeeId: number;
}

export interface IDeleteDependantOfEmployeeProps extends ICurrentCompany {
  employeeId: number;
  dependantId: number;
}

export interface IDelEmpEducationDetailProps extends ICurrentCompany {
  employeeId: number;
  detailId: number;
}

export interface IDelEmpEmploymentHistoryProps extends ICurrentCompany {
  employeeId: number;
  historyId: number;
}

export interface IDelEmpSkillProps extends ICurrentCompany {
  employeeId: number;
  skillId: number;
}

export interface ISaveEmpEmployementHistoryProps
  extends ICurrentCompany,
    TEmployementHistory {
  employeeId: number;
  historyId?: number;
}

export interface ISaveEmpEducationDetailProps
  extends ICurrentCompany,
    TEducationDetail {
  employeeId: number;
  detailId?: number;
}

export interface ISaveEmpSkillProps extends ICurrentCompany, TSkill {
  employeeId: number;
  skillId?: number;
}

export interface IEmpInviteProps extends ICurrentCompany {
  emails: string;
}

export interface ICreateEmpJobInfoProps extends ICurrentCompany, TJobInfo {
  employeeId: number;
}

export interface ICreateEmpPersonalInfoProps
  extends ICurrentCompany,
    TPersonalInfo {
  employeeId: number;
}

export interface ICreateEmpPensionProps extends ICurrentCompany, TPension {
  employeeId: number;
}

export interface ICreateEmpBankProps extends ICurrentCompany, TBank {
  employeeId: number;
}
export interface ICreateEmpWalletProps extends ICurrentCompany, TWallet {
  employeeId: number;
}

export interface ICreateEmpPersonalInfoProps
  extends ICurrentCompany,
    TPersonalInfo {
  employeeId: number;
}

export interface IUpdateEmpProps extends ICurrentCompany {
  employeeId: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  hasSelfService?: boolean;
  empUid?: string;
  roleId?: number;
  designationId?: number;
  avatarUrl?: string;
}

export interface ICreateEmpProps extends ICurrentCompany {
  firstName: string;
  lastName: string;
  email: string;
  hasSelfService: boolean;
  empUid?: string;
  roleId: number;
  designationId: number;
  jobInformation: {
    startDate: string;
    jobTitle: string;
    monthlyGross: number;
    employmentType: string;
    workModel: string;
    numberOfDaysPerWeek: number;

    lineManagerId?: number;
  };
}

interface IResendInviteProps extends ICurrentCompany {
  id: number;
}
export interface IFRQResendInviteProps {
  companyId: number;
  onSuccess?: Function;
  token: string;
  id: number;
}
export interface IFRQEmpDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;

  companyId: number;
  status?: TEmployeeStatus[];
  onSuccess?: Function;
  token: string;
}

export type TEmergencyContact = {
  fullName: string;
  address: string;
  relationship: string;
  phoneNumber: string;
};

export type TEmployeeDependant = {
  id: number;
  fullName: string;
  dob: string;
  phoneNumber: string;
  relationship: string;
};

export type TCompanyParameter = {
  administrator?: {
    adminEmail: string;
  };
  emailSettings?: {
    defaultFromAddress: string;
  };
  locationSettings?: {
    country: string;
    timezone: string;
  };
  dateAndTimeSettings?: {
    dateFormat: string;
    timeFormat: string;
  };
  profilePhotoSettings?: {
    modifyUsersProfile?: {
      administrator: boolean;
      employee: boolean;
    };
  };
  notificationSettings?: {
    email: boolean;
    inApp: boolean;
    sms: boolean;
  };
  employeeSettings?: {
    hideBirthday: boolean;
    hidePhoneNumber: boolean;
    hideWorkAnniversary: boolean;
  };
};
export type TCountry = {
  id: number;
  name: string;
  sortName: string;
  code: string;
};
export type TAddress = {
  streetAddress: string;
  countryId: number;
  stateId: number;
  lgaId: number;
  timezone: string;
};

export type TPersonalInfo = {
  dob: string;
  gender: string;
  phoneNumber: string;
  eligibility: string;
  maritalStatus: string;
  nationality: string;
  address: TAddress;
  passportExpirationDate?: string;
  validDocumentUrl: string;
};

export type TJobInfo = {
  startDate: string;
  monthlyGross: number;
  employmentType: string;
  workModel: string;
  numberOfDaysPerWeek: number;
  hireDate: string;
  probationEndDate: string;
  confirmationDate: string;
  lineManagerId?: number;
};

export type TWallet = {
  accountNumber: string;
  accountProvider: string;
};
export type TBank = {
  bvn: string;
  bankName: string;
  accountNumber: string;
};
export type TPension = {
  fundAdministrator: string;
  accountNumber: string;
  pensionType: string;
};
export type TSkill = {
  id?: number;
  skill: string;
  competency: string;
};
export type TEducationDetail = {
  id?: number;

  school: string;
  degree: string;
  specialization: string;
  startDate: string;
  endDate: string;
};
export type TEmployementHistory = {
  id?: number;

  organization: string;
  position: string;
  startDate: string;
  endDate: string;
};
export type TUserGroup = {
  id: number;
  name: string;
  description: string;
  isLead: boolean;
};
export type TDirectReport = {
  id: number;
  currentManager: boolean;
  from: string;
  to: string;
  employee: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
};
export type TManagerHistory = {
  id: number;
  currentManager: boolean;
  from: string;
  to: string;
  lineManager: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
};

export type TEmployee = {
  companyId: number;
  avatarUrl?: string;

  createdAt: string;
  deletedAt?: string;
  designation?: TDesignation;
  designationId?: string;
  email: string;
  empUid: string;
  firstName: string;
  hasSelfService: boolean;
  id: number;
  jobInformation?: TJobInfo;
  lastName: string;
  personalInformation?: TPersonalInfo;
  role: TRole;
  roleId: number;
  status: TEmployeeStatus;
  updatedAt: string;
  userId: number;
  userGroups?: TUserGroup[];
  directReports?: TDirectReport[];
  managerHistory?: TManagerHistory[];
  // --------------
  finance?: {
    wallet: TWallet;
    bank: TBank;
    pension: TPension;
  };
  skills?: TSkill[];
  employmentHistory?: TEmployementHistory[];
  educationDetails?: TEducationDetail[];
  dependents?: TEmployeeDependant[];
  emergencyContact?: TEmergencyContact;
};
export type TInvitedEmployee = {
  id: number;
  lastSent: string;
  email: string;
};

export type TEmployeeStatus =
  | "confirmed"
  | "terminated"
  | "suspended"
  | "probation";