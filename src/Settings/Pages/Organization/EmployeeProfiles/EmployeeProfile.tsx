import { useContext, useState } from "react";
import { Dropdown, Switch, Tabs, Tooltip } from "antd";
import { PageIntro } from "../../../../Layout/Components/PageIntro";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import { EducationDetails } from "../../../Components/Organization/EmployeeProfiles/MyProfile/Background/EducationDetails";
import { EmploymentHistory } from "../../../Components/Organization/EmployeeProfiles/MyProfile/Background/EmploymentHistory";
import { Skills } from "../../../Components/Organization/EmployeeProfiles/MyProfile/Background/Skills";
import { Finance } from "../../../Components/Organization/EmployeeProfiles/MyProfile/Finance";
import { FingerPrint } from "../../../Components/Organization/EmployeeProfiles/MyProfile/FingerPrint";
import { JobInformation } from "../../../Components/Organization/EmployeeProfiles/MyProfile/JobInformation";
import { DirectReports } from "../../../Components/Organization/EmployeeProfiles/MyProfile/ManagerDirectReport/DirectReports";
import { Managers } from "../../../Components/Organization/EmployeeProfiles/MyProfile/ManagerDirectReport/Managers";
import { Dependents } from "../../../Components/Organization/EmployeeProfiles/MyProfile/Profile/Dependents";
import { EmergencyContact } from "../../../Components/Organization/EmployeeProfiles/MyProfile/Profile/EmergencyContact";
import { Profile } from "../../../Components/Organization/EmployeeProfiles/MyProfile/Profile/Profile";
import { UserGroups } from "../../../Components/Organization/EmployeeProfiles/MyProfile/UserGroups";
import { EditMyProfile } from "../../../Components/Organization/EmployeeProfiles/MyProfile/EditMyProfile";
import { Resignation } from "../../../Components/Organization/EmployeeProfiles/MyProfile/Resignation";
import { RoleHistory } from "../../../Components/Organization/EmployeeProfiles/MyProfile/History/RoleHistory";
import { PromotionHistory } from "../../../Components/Organization/EmployeeProfiles/MyProfile/History/PromotionHistory";
import { TrainingHistory } from "../../../Components/Organization/EmployeeProfiles/MyProfile/History/TrainingHistory";
import { DisciplinaryHistory } from "../../../Components/Organization/EmployeeProfiles/MyProfile/History/DisciplinaryHistory";
import { MedicalHistory } from "../../../Components/Organization/EmployeeProfiles/MyProfile/MedicalHistory/MedicalHistory";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "AppTypes/Auth";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import { useFetchSingleEmployee } from "APIRQHooks/Utility/employeeHooks";
import { useParams } from "react-router-dom";
import { appRoutes } from "AppRoutes";
import { defaultImage } from "Constants";
import { EmployeeProfileContainer } from "./EmployeeProfileContainer";

export const EmployeeProfile = () => {
  const params = useParams();
  const employeeId = params.id as string;
  return <EmployeeProfileContainer employeeId={+employeeId} />;
};
