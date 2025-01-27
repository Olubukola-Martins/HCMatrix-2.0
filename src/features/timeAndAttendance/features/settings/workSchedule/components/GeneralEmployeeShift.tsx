import { Form, Input, TimePicker } from "antd";
import { AppButton } from "components/button/AppButton";
import { useContext, useEffect } from "react";
import { capitalizeWord } from "../../Utils";
import moment from "moment";
import { useQueryClient } from "react-query";
import { useCreateShiftSchedule } from "../hooks/useCreateShiftSchedule";
import {
  QUERY_KEY_FOR_WORK_SCHEDULE_SHIFT,
  useGetShiftSchedule,
} from "../hooks/useGetShiftSchedule";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { openNotification } from "utils/notifications";

export const GeneralEmployeeShift = () => {
  const [form] = Form.useForm();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const queryClient = useQueryClient();
  const { mutate, isLoading: isLoadingUpdate } = useCreateShiftSchedule();
  const { data, isLoading: isLoadingGet, isSuccess } = useGetShiftSchedule();

  const theInitialFormValues = [
    {
      type: "Morning",
      schedule: [
        { day: "Monday" },
        { day: "Tuesday" },
        { day: "Wednesday" },
        { day: "Thursday" },
        { day: "Friday" },
        { day: "Saturday" },
        { day: "Sunday" },
      ],
    },
    {
      type: "Afternoon",
      schedule: [
        { day: "Monday" },
        { day: "Tuesday" },
        { day: "Wednesday" },
        { day: "Thursday" },
        { day: "Friday" },
        { day: "Saturday" },
        { day: "Sunday" },
      ],
    },

    {
      type: "Night",
      schedule: [
        { day: "Monday" },
        { day: "Tuesday" },
        { day: "Wednesday" },
        { day: "Thursday" },
        { day: "Friday" },
        { day: "Saturday" },
        { day: "Sunday" },
      ],
    },
  ];

  useEffect(() => {
    let initialFormValues;
    if (isSuccess && data && data.length !== 0) {
      initialFormValues = data?.map((item: any) => ({
        type: capitalizeWord(item.type),
        schedule: item.schedule.map((val: any) => ({
          day: capitalizeWord(val.day),
          time: [
            moment(val?.startTime, "HH:mm:ss"),
            moment(val?.endTime, "HH:mm:ss"),
          ],
        })),
      }));
    } else {
      initialFormValues = theInitialFormValues;
    }

    form.setFieldsValue({
      workDaysAndTime: initialFormValues,
    });
  }, [form, data, isSuccess]);

  const onFinish = (values: any) => {
    const data = values?.workDaysAndTime.map((item: any) => {
      const schedule = item?.schedule.map((val: any) => {
        if (!val.time || val.time.length < 2) {
          return {
            day: val.day.toLowerCase(),
            startTime: "00:00:00",
            endTime: "00:00:00",
          };
        }
        const [startTime, endTime] = val.time;
        return {
          day: val.day.toLowerCase(),
          startTime: startTime && startTime.format("HH:mm:ss"),
          endTime: endTime && endTime.format("HH:mm:ss"),
        };
      });

      return {
        schedule: schedule,
        type: item.type.toLowerCase(),
      };
    });

    mutate(
      {
        data,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
            duration: 7.0,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          queryClient.invalidateQueries([QUERY_KEY_FOR_WORK_SCHEDULE_SHIFT]);
        },
      }
    );
  };
  return (
    <div className="mt-3">
      <Form onFinish={onFinish} form={form} disabled={isLoadingGet}>
        <Form.List name="workDaysAndTime">
          {(fields) => (
            <div className="grid grid-cols-3 gap-5">
              {fields.map((field, index) => (
                <div key={field.key} className="">
                  <div>
                    <Form.Item {...field} name={[field.name, "type"]}>
                      <Input placeholder="type" disabled className="w-32" />
                    </Form.Item>

                    <Form.List name={[field.name, "schedule"]}>
                      {(inputs) => (
                        <>
                          {inputs.map((item, subIndex) => (
                            <div
                              key={item.key}
                              className="flex items-center gap-4 mt-5"
                            >
                              <Form.Item
                                {...item}
                                name={[item.name, "day"]}
                                initialValue={
                                  theInitialFormValues[index].schedule[subIndex]
                                    .day
                                }
                                noStyle
                              >
                                <Input
                                  disabled
                                  placeholder="day"
                                  className="w-[6.5rem]"
                                />
                              </Form.Item>
                              <div className="flex-1">
                                <Form.Item
                                  {...item}
                                  name={[item.name, "time"]}
                                  noStyle
                                >
                                  <TimePicker.RangePicker format="HH:mm" />
                                </Form.Item>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </Form.List>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Form.List>

        <div className="flex justify-end gap-3 mt-5">
          {/* <AppButton label="Upload Template" /> */}
          <AppButton
            type="submit"
            label="Save Changes"
            isLoading={isLoadingUpdate}
          />
        </div>
      </Form>
    </div>
  );
};
