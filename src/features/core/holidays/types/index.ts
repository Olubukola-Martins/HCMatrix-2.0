export type THoliday = {
  id: number;
  title: string;
  date: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
};

export type THolidayAction = "edit" | "delete";
