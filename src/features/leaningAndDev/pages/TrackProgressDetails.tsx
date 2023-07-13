import { Tabs } from "antd";
import { LeaningNavbar } from "../components/LeaningNavbar";
import { PageIntro } from "components/layout/PageIntro";
import { LeaningProgressHeader } from "../components/trackProgress/LeaningProgressHeader";
import { TrainingProgress } from "../components/trackProgress/TrainingProgress";
import { Certificate } from "../components/trackProgress/Certificate";

export const TrackProgressDetails = () => {
  return (
    <>
      <LeaningNavbar active="tracking-progress" />
      <div className="Container">
        <PageIntro title="Track Progress / Godswill Omenuko" />

        <Tabs
          defaultActiveKey="1"
          className="mt-3 font-medium"
          items={[
            {
              key: "1",
              label: "Overview",
              children: (
                <>
                  <LeaningProgressHeader />
                </>
              ),
            },
            {
              key: "2",
              label: "Trainings",
              children: (
                <>
                  <LeaningProgressHeader />
                  <TrainingProgress />
                </>
              ),
            },
            {
              key: "3",
              label: "Certificates",
              children: (
                <>
                  <LeaningProgressHeader />
                  <Certificate />
                </>
              ),
            },
            {
              key: "4",
              label: "Badges",
              children: (
                <>
                  <h4>No Point</h4>
                </>
              ),
            },
            {
              key: "5",
              label: "Timeline",
              children: (
                <>
                  <h4>No Point</h4>
                </>
              ),
            },
          ]}
        />
      </div>
    </>
  );
};
