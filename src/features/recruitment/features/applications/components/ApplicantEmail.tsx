import { Empty } from "antd";
import emptyImage from "../../../assets/not-found.png";
import { AppButton } from "components/button/AppButton";
import { useState } from "react";
import { SendEmailDrawer } from "./SendEmailDrawer";
import { data } from "./ApplicantRecords";

interface emailArray {
  email: string;
}

const emailArray: emailArray[] = [];
export const ApplicantEmail = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div>
      {emailArray.length === 0 ? (
        <Empty
          className="flex flex-col place-items-center gap-4"
          image={emptyImage}
          imageStyle={{
            height: 250,
          }}
          description={
            <div>
              <h2>It's a little quite in here, don't you think?</h2>
              <p className="text-xs my-1">
                Start an email conversation with Samuel.
              </p>
            </div>
          }
        >
          <AppButton
            type="button"
            label="New Email"
            variant="style-with-class"
            additionalClassNames={[
              "border",
              "bg-none",
              "border-caramel",
              "text-caramel",
              "px-10",
              "py-2",
              "rounded",
            ]}
            handleClick={() => setOpenDrawer(true)}
          />
        </Empty>
      ) : (
        <div className="my-2 p-2">
          {data.map((item) => (
            <div key={item.key} className="flex gap-4">
              <img src={item.img} className="w-14 h-14 rounded-full" />
              <div className="">
                <div className="mb-3">
                  <h2>{item.title}</h2>
                  <p className="text-sm text-[rgba(58, 58, 58, 0.80)]">
                    {item.date}
                  </p>
                </div>
                <div>
                  <h4 className="mb-2">{item.emailSubject}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <SendEmailDrawer
        open={openDrawer}
        handleClose={() => setOpenDrawer(false)}
      />
    </div>
  );
};