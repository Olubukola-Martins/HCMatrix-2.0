import React from "react";
import { useApiAuth } from "hooks/useApiAuth";
import { TPermissionLabel } from "features/core/roles-and-permissions/types";
import { useGetAuthUser } from "features/authentication/hooks/useGetAuthUser";

export const canUserAccessComponent = ({
  userPermissions,
  requiredPermissions,
}: {
  userPermissions: TPermissionLabel[];
  requiredPermissions: TPermissionLabel[];
}) => {
  let canAccess = false;

  canAccess = userPermissions?.some((item) =>
    requiredPermissions?.includes(item)
  );

  return canAccess;
};

export const useGetUserPermissions = () => {
  const { companyId } = useApiAuth(); //this hook data is stale, asides from token, n companyId, cos it was last updated/created on login
  const { data } = useGetAuthUser(); //This hook is used so that data is not stale, but most in sync with server
  const currentCompany = data?.payload.find(
    (item) => item.company.id === companyId
  );
  const hasSelfService = !!currentCompany?.hasSelfService;

  const userPermissionsViaRole =
    currentCompany?.role?.permissions?.map((item) => item.permission.label) ??
    [];
  const userPermissionsViaDelegations =
    currentCompany?.delegation?.permissions?.map(
      (item) => item.permission.label
    ) ?? [];

  return {
    userPermissions: [
      ...userPermissionsViaRole,
      ...userPermissionsViaDelegations,
    ],
    hasSelfService,
  };
};
export const useCanUserAccessComponent = (props: {
  requiredPermissions: TPermissionLabel[];
}) => {
  const { requiredPermissions } = props;
  const { currentCompanyEmployeeDetails } = useApiAuth();
  const userPermissions =
    currentCompanyEmployeeDetails?.role?.permissions?.map(
      (item) => item.permission.label
    ) ?? [];

  return {
    canAccess: canUserAccessComponent({
      userPermissions,
      requiredPermissions,
    }),
    userPermissions,
  };
};

export const PermissionRestrictor: React.FC<{
  children: React.ReactNode;
  requiredPermissions: TPermissionLabel[];
}> = ({ requiredPermissions, children }) => {
  const { currentCompanyEmployeeDetails } = useApiAuth();

  // TODO: Getting Permissions should be done in such a way that when a role's permission is edited, it should be reflected here, it automatically applies the change so there is no need for the user to login before the changes takes place consider using a web hook to get the user's permissions at regular intervals, or get the permissions from the server via endpoint as opposed to depending on the role state on login
  const userPermissions =
    currentCompanyEmployeeDetails?.role?.permissions?.map(
      (item) => item.permission.label
    ) ?? [];

  return (
    <>
      {canUserAccessComponent({
        userPermissions,
        requiredPermissions,
      }) ? (
        <>{children}</>
      ) : null}
    </>
  );
};
