import { TAddress } from "types/address";

export type TBranch = {
  id: number;
  name: string;
  description: string;
  address: TAddress;
  employeeCount: number;
};