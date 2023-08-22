import { Modal } from "antd";
import React from "react";
import { IModalProps } from "types";

export const OfferTemplateVariables = ({ handleClose, open }: IModalProps) => {
  return (
    <Modal
      title="View Variables"
      onCancel={() => handleClose()}
      open={open}
      footer={null}
    >
      <div className="w-11/12 mt-0 mb-7 flex flex-col mx-auto">
        <p className="text-sm mb-10 mx-auto w-full">
          Each words in the curly bracket are map to the words opposite it.
        </p>
        <div className="flex flex-col gap-6 mx-auto w-full">
          <div className="flex h-fit mx-auto w-full">
            <p className="px-4 py-3 border border-gray-100 bg-gray-100 rounded-lg w-5/12">
              {"{appplicant_name}"}
            </p>
            <span className="w-[10.5%] h-3.5 my-auto bg-gray-100"></span>
            <p className="px-4 py-3 border border-gray-100 bg-gray-100 rounded-lg w-5/12">
              Applicant Full Name
            </p>
          </div>
          <div className="flex h-fit mx-auto w-full">
            <p className="px-4 py-3 border border-gray-100 bg-gray-100 rounded-lg w-5/12">
              {"{job_role}"}
            </p>
            <span className="w-[10.5%] h-3.5 my-auto bg-gray-100"></span>
            <p className="px-4 py-3 border border-gray-100 bg-gray-100 rounded-lg w-5/12">
              Job opening
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
