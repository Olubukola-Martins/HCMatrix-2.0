import { Empty } from "antd";
import PageSubHeader from "components/layout/PageSubHeader";
import { TPayrollListData } from "features/payroll/types/payroll";
import { TableWithFocusType } from "components/table";
import React, { useMemo, useState } from "react";
import { SelectPayrolls } from "./SelectPayrolls";
import { ColumnsType } from "antd/lib/table";
import { BarChart } from "components/charts/BarChart";
import { generateHexColor } from "utils/colorHelpers/generateHexColor";

type TAction = "make-selection";
const LABELS = [
  "Employee Count",
  "Net Pay",
  "Gross Pay",
  "Total Allowances",
  "Total Deductions",
  "Pension",
  "Total Tax",
] as const;
export const ComparismContainer = () => {
  const [action, setAction] = useState<TAction>();
  const clearAction = () => {
    setAction(undefined);
  };

  const [selectedPayrolls, setSelectedPayrolls] = useState<TPayrollListData[]>(
    []
  );
  const handleSelectPayrolls = (data: TPayrollListData[]) => {
    // setSelectedPayrolls((prev) => [...data, ...prev]);
    setSelectedPayrolls(data);
  };

  return (
    <>
      <SelectPayrolls
        handleClose={clearAction}
        open={action === "make-selection"}
        handleSelect={handleSelectPayrolls}
      />
      <div className="flex flex-col gap-4">
        <PageSubHeader
          description={"You can now compare payrolls generated by the system"}
          hideBackground
          actions={[
            {
              btnVariant: "transparent",
              name: "Select Payrolls",
              handleClick: () => setAction("make-selection"),
            },
          ]}
        />
        <div>
          {selectedPayrolls?.length === 0 && (
            <div>
              <Empty description="No payrolls have been selected!" />
            </div>
          )}
          {selectedPayrolls?.length > 0 && (
            <div>
              <PayrollComparer payrolls={selectedPayrolls} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

type TView = "table" | "graph";
const PayrollComparer: React.FC<{ payrolls: TPayrollListData[] }> = ({
  payrolls,
}) => {
  const [view, setView] = useState<TView>("table");
  const columns: ColumnsType<Record<string, string | number>> = useMemo(() => {
    let data: ColumnsType<Record<string, string | number>> = [
      {
        title: "",
        dataIndex: "name",
        key: "name",
        render: (val, item) => <span className="capitalize">{item.name}</span>,
      },
    ];
    if (payrolls) {
      data = [
        ...data,
        ...payrolls?.map((item, i) => ({
          title: item.name,
          dataIndex: `payroll${i + 1}`,
          key: `payroll${i + 1}`,
        })),
        {
          title: "Variant",
          dataIndex: "variant",
          key: "variant",
          render: (val, item) => <span className="capitalize">{"N/A"}</span>,
        },
      ];
    }
    return data;
  }, [payrolls]);
  const rows = {
    "Employee Count": [
      payrolls?.reduce(
        (values: Record<string, string | number>, item, i) => {
          values[`payroll${i + 1}`] = item.employeePayrolls.length;
          return values;
        },
        { name: "Employee Count" }
      ),
    ],
    "Net Pay": [
      payrolls?.reduce(
        (values: Record<string, string | number>, item, i) => {
          values[`payroll${i + 1}`] = item.totalNetPay;
          return values;
        },
        { name: "Net Pay" }
      ),
    ],
    "Gross Pay": [
      payrolls?.reduce(
        (values: Record<string, string | number>, item, i) => {
          values[`payroll${i + 1}`] = item.totalGrossPay;
          return values;
        },
        { name: "Gross Pay" }
      ),
    ],
    "Total Deductions": [
      payrolls?.reduce(
        (values: Record<string, string | number>, item, i) => {
          values[`payroll${i + 1}`] = item.totalDeductions;
          return values;
        },
        { name: "Total Deductions" }
      ),
    ],
    "Total Allowances": [
      payrolls?.reduce(
        (values: Record<string, string | number>, item, i) => {
          values[`payroll${i + 1}`] = item.totalAllowances;
          return values;
        },
        { name: "Total Allowances" }
      ),
    ],
    "Total Tax": [
      payrolls?.reduce(
        (values: Record<string, string | number>, item, i) => {
          values[`payroll${i + 1}`] = item.totalTax;
          return values;
        },
        { name: "Total Tax" }
      ),
    ],
    Pension: [
      payrolls?.reduce(
        (values: Record<string, string | number>, item, i) => {
          values[`payroll${i + 1}`] = 0;
          return values;
        },
        { name: "Pension" }
      ),
    ],
  };

  const data = LABELS.reduce(
    (values: Record<string, string | number>[], label) => {
      const data = [...values, ...rows[label]];
      return data;
    },
    []
  );
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center gap-2 lg:px-20">
        <button
          onClick={() => setView("table")}
          className={
            view === "table"
              ? `hover:opacity-70 transition ease-in-out duration-300 bg-caramel text-white text-sm py-1 w-full border-4 border-caramel rounded-md font-medium`
              : `bg-card text-sm text-accent py-1 w-full border-4 border-card rounded-md font-medium`
          }
        >
          Table
        </button>
        <button
          onClick={() => setView("graph")}
          className={
            view === "table"
              ? `bg-card text-sm text-accent py-1 w-full border-4 border-card rounded-md font-medium`
              : `hover:opacity-70 transition ease-in-out duration-300 bg-caramel text-white text-sm py-1 w-full border-4 border-caramel rounded-md font-medium`
          }
        >
          Graph
        </button>
      </div>

      {view === "table" ? (
        <TableComparison columns={columns} data={data} payrolls={payrolls} />
      ) : (
        <GraphComparison columns={columns} data={data} payrolls={payrolls} />
      )}
    </div>
  );
};

type TCompareProps = {
  columns: ColumnsType<Record<string, string | number>>;
  data: Record<string, string | number>[];
  payrolls: TPayrollListData[];
};
const TableComparison: React.FC<TCompareProps> = ({ data, columns }) => {
  return (
    <div>
      <TableWithFocusType
        columns={columns}
        size="small"
        dataSource={data}
        pagination={false}
      />
    </div>
  );
};
const GraphComparison: React.FC<TCompareProps> = ({
  data,
  columns,
  payrolls,
}) => {
  return (
    <div>
      <BarChart
        labels={LABELS as unknown as string[]}
        useDataSet
        dataSets={[
          ...payrolls.map((payroll) => ({
            data: [
              payroll.employeePayrolls.length,
              payroll.totalNetPay,
              payroll.totalNetPay,
              payroll.totalGrossPay,
              payroll.totalAllowances,
              payroll.totalDeductions,
              0, //TODO: Update this once pension is included
              payroll.totalTax,
            ],
            borderColor: `${generateHexColor(
              `${payroll.id}${payroll.label}`
            )}80`,
            label: payroll.name,
            stack: payroll.label,
            backgroundColor: generateHexColor(`${payroll.id}${payroll.label}`),
          })),
        ]}
      />
    </div>
  );
};
