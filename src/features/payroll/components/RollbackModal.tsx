import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IModalProps } from "types";
import { Modal } from "antd";
import Themes from "components/Themes";

const RollbackModal: React.FC<IModalProps> = ({ open, handleClose }) => {
  const onSubmit = (values: any) => {};

  return (
    <Modal open={open} onCancel={() => handleClose()}>
      <Themes>
        <div className="CModal" style={{ maxWidth: 400 }}>
          <div className="flex items-center justify-between mb-7">
            <h5 className="font-semibold text-base">Payroll Roll back</h5>
            <i
              onClick={() => handleClose}
              className="ri-close-line font-semibold text-xl cursor-pointer hover:text-neutral"
            ></i>
          </div>

          <Formik
            initialValues={{
              email: "",
              reason: "",
            }}
            onSubmit={onSubmit}
          >
            <Form>
              <Field
                name="email"
                type="email"
                className="hidden w-full py-2 rounded-md px-2 placeholder:text-xs"
                placeholder="Send to"
              />
              <div className="mt-2">
                <label className="text-sm font-medium">
                  Reasons for Roll back
                </label>
                <Field
                  name="reason"
                  as="textarea"
                  className="w-full h-16 py-2 rounded-md resize-x-none mt-1 px-2 placeholder:text-xs placeholder:font-medium focus:outline-none text-sm"
                  placeholder="E.g Bonuses are as high as 5 million. Can you state why? "
                />
                <ErrorMessage
                  name="reason"
                  component="span"
                  className="showErrorMsg"
                />
              </div>

              <div className="flex items-center justify-between mt-5">
                <button
                  type="button"
                  className="transparentButton"
                  onClick={() => handleClose()}
                >
                  Cancel
                </button>
                <button type="submit" className="button">
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </Themes>
    </Modal>
  );
};

export default RollbackModal;
