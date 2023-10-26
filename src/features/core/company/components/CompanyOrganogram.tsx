import { Avatar, Card, Skeleton } from "antd";
import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import styled from "styled-components";
import { useGetCompanyOwnerOrganogram } from "../hooks/organogram/useGetCompanyOwnerOrganogram";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
const admin = {
  name: "Chuma Ukeagu",
  position: "CEO",
  department: "Adminstration & Management",
  directReports: [
    {
      name: "Basil Ikpe",
      position: "Product Manager",
      department: "Application Development",
      directReports: [
        {
          name: "Ruth Godwin",
          position: "Product Designer",
          department: "Application Development",
          directReports: [],
        },
        {
          name: "Toyin Komolafe",
          position: "Node Developer",
          department: "Application Development",
          directReports: [],
        },
        {
          name: "Godswill Omenuke",
          position: "Frontend Developer",
          department: "Application Development",
          directReports: [],
        },
      ],
    },
    {
      name: "Uche Ikeobi",
      position: "Product Manager",
      department: "Product Management",
      directReports: [
        {
          name: "Nmesoma Charles",
          position: "Product Manager",
          department: "Product Management",
          directReports: [],
        },
        {
          name: "Mary Ochanya",
          position: "Product Manager",
          department: "Product Management",
          directReports: [],
        },
        {
          name: "Cuppy Otedola",
          position: "Product Appraiser",
          department: "Product Management",
          directReports: [],
        },
      ],
    },
    {
      name: "Linus Klocksco",
      position: "Cloud Solutions Architect",
      department: "Devops Operations",
      directReports: [
        {
          name: "Readone Maxxi",
          position: "Assistant Cloud Operator",
          department: "Devops Operations",

          directReports: [],
        },

        {
          name: "Dave Chapelle",
          position: "Comedian",
          department: "Devops Operations",

          directReports: [
            { name: "Francis Machi", position: "Jester", directReports: [] },
          ],
        },
        {
          name: "Patrick Collins",
          position: "Blockchain Developer",
          department: "Devops Operations",

          directReports: [
            {
              name: "Adrian Ricardo",
              position: "Mode Developer",
              department: "Devops Operations",

              directReports: [],
            },
            {
              name: "James Maxwell",
              position: "Data Analyst",
              department: "Artificial Intelligence & Data",

              directReports: [
                {
                  name: "Kevnin Theorem",
                  position: "Circuit Designer",
                  department: "Artificial Intelligence & Data",
                  directReports: [],
                },
                {
                  name: "Nortons Theorem",
                  position: "Circuit Designer",
                  department: "Artificial Intelligence & Data",
                  directReports: [],
                },
              ],
            },
          ],
        },
      ],
    },
    // { name: "Plata", position: "Head of AI & Research", directReports: [] },
  ],
};

type Participant = {
  name: string;
  position: string;
  department?: string;
  directReports: Participant[];
};

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  width: max-content;
  // background: var(--caramel);
`;
const CompanyOrganogram = () => {
  const { data: owner, isLoading } = useGetCompanyOwnerOrganogram();

  return (
    <div className="w-full py-4 flex flex-col gap-4">
      <PageSubHeader
        description={`View your organization's organogram at a glance`}
      />

      <Skeleton loading={isLoading} active paragraph={{ rows: 14 }}>
        <div className="overflow-x-auto">
          <Tree
            lineWidth={"1px"}
            lineColor={`#aaa`}
            lineBorderRadius={"10px"}
            label={
              <OrgCard
                name={getEmployeeFullName(owner)}
                position={owner?.designation.name ?? "CEO"}
                department={owner?.designation.department.name}
              />
            }
          >
            {/* TODO: Refactor to be a component that is passed direct report */}
            {owner?.directReport.map((item) =>
              displayOrganogram(
                {
                  directReports: [],
                  name: getEmployeeFullName(item.employee),
                  position: item.employee.designation.name,
                  department: item.employee.designation.department.name,
                },
                1,
                4 //max
              )
            )}
          </Tree>
        </div>
      </Skeleton>
    </div>
  );
};

const OrgCard: React.FC<{
  position: string;
  name: string;
  isPrimary?: boolean;
  department?: string;
}> = ({ position, name, isPrimary, department }) => {
  return (
    <StyledNode>
      <Card size="small" hoverable className="shadow-sm" bordered>
        <Card.Meta
          avatar={<Avatar src="https://picsum.photos/190" />}
          description={
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-extrabold text-gray-900 truncate dark:text-white">
                {name}
              </p>
              <p className="text-sm text-gray-500 font-light truncate dark:text-gray-400">
                {position}
              </p>
              <p className="text-sm text-gray-800 font-normal truncate dark:text-gray-400">
                {department}
              </p>
            </div>
          }
        />
      </Card>
    </StyledNode>
  );
};

const displayOrganogram = (root: Participant, level = 1, max: number) => {
  // conditions to be met
  // if the levelCount is greater tha
  level++;
  if (max === level) return;
  return (
    <TreeNode
      label={OrgCard({
        position: root.position,
        name: root.name,
        department: root?.department,
      })}
    >
      {root.directReports.length >= 0 ? (
        root.directReports.map((item) => displayOrganogram(item, level, max))
      ) : (
        <TreeNode
          label={OrgCard({
            position: root.position,
            name: root.name,
            isPrimary: max % 2 === 0,
            department: root.department,
          })}
        />
      )}
    </TreeNode>
  );
};

export default CompanyOrganogram;
