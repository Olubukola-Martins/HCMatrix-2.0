import { Modal, Form } from "antd";
import Themes from "components/Themes";
import { AppButton } from "components/button/AppButton";
import { QUERY_KEY_FOR_COMPANY_PARAMETER_SETTING } from "features/core/company/hooks/useGetCompanyParamSetting";
import { useTransferOwnership } from "features/core/company/hooks/useTransferOwnership";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";

interface IProps {
  open: boolean;
  handleClose: () => void;
}
// TO DO: Refactor to code to be more descriptive as to what is going on and why
const TransferOwnership = ({ open, handleClose }: IProps) => {
  const [formState, setFormState] = useState<"fill-form" | "form-filled">(
    "fill-form"
  );
  const [user, setUser] = useState<{ name: string; id: number }>();
  const onFinish = () => {
    // move to next state

    setFormState("form-filled");
  };

  return (
    <>
      <Modal
        footer={null}
        open={open}
        onCancel={() => {
          handleClose();
          setFormState("fill-form");
          setUser(undefined);
        }}
        title={
          <div className="flex items-center justify-between w-full">
            <h5 className="text-base font-semibold">Transfer Ownership</h5>
          </div>
        }
      >
        <Themes>
          <div>
            {formState === "fill-form" && (
              <Form layout="vertical" requiredMark={false} onFinish={onFinish}>
                <div>
                  {/* TO DO: Create a seperate n independant comp for the select in FormEmployeeInput  */}
                  <FormEmployeeInput
                    Form={Form}
                    control={{ name: "employeeId", label: "Select user" }}
                    handleSelect={(_, person) =>
                      person &&
                      setUser({
                        name: person ? getEmployeeFullName(person) : "",
                        id: person?.id,
                      })
                    }
                  />
                  <AppButton label="Transfer Ownership" type="submit" />
                </div>
              </Form>
            )}
            {formState === "form-filled" && !!user && (
              <Confimation
                data={user}
                onCancel={() => setFormState("fill-form")}
                handleClose={handleClose}
              />
            )}
          </div>
        </Themes>
      </Modal>
    </>
  );
};
const Confimation: React.FC<{
  data: { name: string; id: number };
  onCancel: () => void;
  handleClose: () => void;
}> = ({ data, onCancel, handleClose }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useTransferOwnership();

  const handleSubmit = () => {
    mutate(
      {
        employeeId: data.id,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
          handleClose();
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_COMPANY_PARAMETER_SETTING],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <div>
      <h4 className="font-extrabold mb-3 text-center text-lg">
        Do you want to Assign <br />
        total ownership to {data.name}
      </h4>
      <div className="flex  justify-center items-center gap-x-10 mt-10">
        <AppButton
          handleClick={() => handleSubmit()}
          label="Yes, Continue"
          isLoading={isLoading}
        />
        <AppButton
          handleClick={() => onCancel()}
          label="No, Cancel"
          variant="transparent"
        />
      </div>
    </div>
  );
};
export default TransferOwnership;
