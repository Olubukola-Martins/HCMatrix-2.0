export const radioFormOptions: {
  label: string;
  description: string;
  value: string;
  faceRTitle: string;
  locationTitle: string;
  faceRDes: string;
  id:number;
}[] = [
  {
    id: 1,
    label: "Flexible",
    description: "Good for times with higher onsite autonomy",
    value: "Flexible",
    faceRTitle: "Face Recognition Disabled",
    locationTitle: "GPS Location required",
    faceRDes: "Self capturing not allowed",
  },
  {
    id: 2,
    label: "Moderate",
    description: "Good for teams with fixed hours and location",
    value: "Moderate",
    faceRTitle: "Face Recognition Enabled",
    locationTitle: "GPS Location not required",
    faceRDes: "If unrecognized flag time entry",

  },
  {
    id: 3,
    label: "Mandatory",
    description: "Good for teams monitoring flexible offsite members",
    value: "Mandatory",
    faceRTitle: "Face Recognition Enforced",
    locationTitle: "GPS Location required",
    faceRDes: "If unrecognized block time entry",
  },
];

export const hourList = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  16, 17, 18, 19, 20, 21, 22, 23, 24,
]